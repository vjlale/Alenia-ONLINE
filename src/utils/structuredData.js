/**
 * Utilidades para generar structured data (JSON-LD) para SEO
 */

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ALENIA",
  "url": "https://alenia.online",
  "logo": "https://alenia.online/images/5-3.png",
  "description": "Soluciones inteligentes con IA, automatizaciones y desarrollo web para empresas.",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Córdoba",
    "addressCountry": "AR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "alenia.online@gmail.com",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.instagram.com/alen.ia_/",
    "https://www.linkedin.com/company/alen-ia/",
    "https://github.com/vjlale"
  ]
});

export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.nombre,
  "description": service.descripcion,
  "provider": {
    "@type": "Organization",
    "name": "ALENIA"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Argentina"
  }
});

export const generateArticleSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.image?.startsWith('http') ? post.image : `https://alenia.online${post.image}`,
  "datePublished": post.date,
  "author": {
    "@type": "Organization",
    "name": "ALENIA"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ALENIA",
    "logo": {
      "@type": "ImageObject",
      "url": "https://alenia.online/images/5-3.png"
    }
  }
});

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
