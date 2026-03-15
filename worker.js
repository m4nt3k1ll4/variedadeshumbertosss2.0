export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 301 redirect www → root (evita contenido duplicado en SEO)
    if (url.hostname === "www.humbertosss.com") {
      url.hostname = "humbertosss.com"
      return Response.redirect(url.toString(), 301)
    }

    const response = await env.ASSETS.fetch(request)

    // Headers SEO y seguridad
    const newHeaders = new Headers(response.headers)

    // Content-type correcto para HTML
    const contentType = response.headers.get("content-type") || ""
    if (contentType.includes("text/html") || url.pathname === "/" || url.pathname.endsWith(".html")) {
      newHeaders.set("content-type", "text/html; charset=UTF-8")
    }

    // Headers de seguridad + SEO
    newHeaders.set("X-Content-Type-Options", "nosniff")
    newHeaders.set("X-Frame-Options", "SAMEORIGIN")
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin")
    newHeaders.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1")
    newHeaders.set("Link", '<https://humbertosss.com/>; rel="canonical"')

    // Cache largo para assets estáticos (CSS, JS, imágenes)
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|webp|svg|ico|woff2?)$/)) {
      newHeaders.set("Cache-Control", "public, max-age=31536000, immutable")
    }

    return new Response(response.body, {
      headers: newHeaders,
      status: response.status
    })
  }
}
