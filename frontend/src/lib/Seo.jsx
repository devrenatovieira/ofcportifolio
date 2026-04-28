import { useEffect } from "react";

const SITE_URL = "https://ofcportifolio.com.br";

function setMetaTag(selector, attr, value) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    const [, attributeName, attributeValue] = selector.match(/meta\[(name|property)='(.+)'\]/) || [];
    if (attributeName && attributeValue) {
      element.setAttribute(attributeName, attributeValue);
    }
    document.head.appendChild(element);
  }

  element.setAttribute(attr, value);
}

function setCanonical(url) {
  let canonical = document.head.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

function absoluteUrl(value) {
  if (!value) return undefined;
  return value.startsWith("http") ? value : `${SITE_URL}${value}`;
}

export function Seo({ title, description, url, image, type = "website", article = null, breadcrumbs = [] }) {
  const canonicalUrl = absoluteUrl(url);
  const shareImage = absoluteUrl(image);

  useEffect(() => {
    document.title = title;
    setCanonical(canonicalUrl);
    setMetaTag("meta[name='description']", "content", description);
    setMetaTag("meta[name='robots']", "content", "index,follow");
    setMetaTag("meta[name='author']", "content", "Renato Vieira");
    setMetaTag("meta[property='og:type']", "content", type);
    setMetaTag("meta[property='og:title']", "content", title);
    setMetaTag("meta[property='og:description']", "content", description);
    if (shareImage) setMetaTag("meta[property='og:image']", "content", shareImage);
    setMetaTag("meta[property='og:url']", "content", canonicalUrl);
    setMetaTag("meta[property='og:locale']", "content", "pt_BR");
    setMetaTag("meta[name='twitter:card']", "content", shareImage ? "summary_large_image" : "summary");
    setMetaTag("meta[name='twitter:title']", "content", title);
    setMetaTag("meta[name='twitter:description']", "content", description);
    if (shareImage) setMetaTag("meta[name='twitter:image']", "content", shareImage);
  }, [title, description, canonicalUrl, shareImage, type]);

  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Renato Vieira",
        "url": SITE_URL,
        "sameAs": ["https://www.linkedin.com/in/devrenatovieira/"],
        "jobTitle": "Desenvolvedor Frontend especialista em performance",
        "knowsAbout": ["React", "Vite", "JavaScript", "Performance Web", "SEO técnico", "UX mobile-first"],
        "description": "Desenvolvedor Frontend especialista em React, Vite e criação de sites rápidos, modernos e otimizados para conversão."
      },
      {
        "@type": "WebSite",
        "url": SITE_URL,
        "name": "Renato Vieira - Desenvolvedor Frontend",
        "description": description,
        "publisher": {
          "@type": "Person",
          "name": "Renato Vieira"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [{ name: "Início", item: SITE_URL }, ...breadcrumbs].map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": absoluteUrl(item.item)
        }))
      }
    ]
  };

  if (article) {
    baseSchema["@graph"].push({
      "@type": "Article",
      "headline": article.headline,
      "description": article.description,
      "image": absoluteUrl(article.image || image),
      "author": {
        "@type": "Person",
        "name": "Renato Vieira"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Renato Vieira"
      },
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished
    });
  }

  return <script type="application/ld+json">{JSON.stringify(baseSchema)}</script>;
}
