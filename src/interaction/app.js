/* ===========================
   AOS INIT
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: 'ease-out'
  });

  /* ===========================
     MOBILE NAV TOGGLE
     =========================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav__menu--open');
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('nav__menu--open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav__menu--open');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }

  /* ===========================
     HEADER SCROLL EFFECT
     =========================== */
  const header = document.getElementById('header');

  function handleScroll() {
    if (window.scrollY > 80) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ===========================
     FAQ ACCORDION — ONE OPEN AT A TIME
     =========================== */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

  /* ===========================
     SMOOTH SCROLL FOR NAV LINKS
     =========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});