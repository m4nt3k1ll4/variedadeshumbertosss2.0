export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 301 redirect www → root (evita contenido duplicado en SEO)
    if (url.hostname === "www.humbertosss.com") {
      url.hostname = "humbertosss.com"
      return Response.redirect(url.toString(), 301)
    }

    // Sirve los archivos estáticos (index.html, CSS, JS, imágenes)
    return env.ASSETS.fetch(request)
  }
}
