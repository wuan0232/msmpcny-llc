const SITE_ORIGIN = 'https://msmpcny.aihnet.com'
const SITE_NAME = 'Musculoskeletal Medicine, P.C.'
const DEFAULT_DESCRIPTION =
  'Musculoskeletal Medicine, P.C. provides patient education about musculoskeletal medicine, pain management, and non-surgical treatment options.'

export interface SiteSeoOptions {
  title: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  image?: string
  robots?: string
  structuredData?: Record<string, unknown>
}

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function absoluteUrl(value: string) {
  return new URL(value, SITE_ORIGIN).toString()
}

export function setSiteSeo(options: SiteSeoOptions) {
  const description = options.description?.trim() || DEFAULT_DESCRIPTION
  const canonical = absoluteUrl(options.path || window.location.pathname)
  const fullTitle = options.title.includes(SITE_NAME) ? options.title : `${options.title} | ${SITE_NAME}`

  document.title = fullTitle
  upsertMeta('meta[name="description"]', 'name', 'description', description)
  upsertMeta('meta[name="robots"]', 'name', 'robots', options.robots || 'index,follow')
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', options.type || 'website')
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', options.image ? 'summary_large_image' : 'summary')

  if (options.image) {
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', absoluteUrl(options.image))
  } else {
    document.head.querySelector('meta[property="og:image"]')?.remove()
  }

  let canonicalElement = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonicalElement) {
    canonicalElement = document.createElement('link')
    canonicalElement.rel = 'canonical'
    document.head.appendChild(canonicalElement)
  }
  canonicalElement.href = canonical

  document.head.querySelector('script[data-site-structured-data]')?.remove()
  if (options.structuredData) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.siteStructuredData = 'true'
    script.textContent = JSON.stringify(options.structuredData)
    document.head.appendChild(script)
  }
}

export { DEFAULT_DESCRIPTION, SITE_NAME, SITE_ORIGIN }
