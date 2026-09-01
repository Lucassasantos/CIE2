/**
 * Utility functions to handle and parse direct image URLs and HTML <img> tags
 */

export interface ParsedImageContent {
  src: string;
  alt: string;
  href?: string;
  isHtmlTag: boolean;
  isValid: boolean;
  raw: string;
}

export function parseImageInput(input: string): ParsedImageContent {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return {
      src: '',
      alt: '',
      isHtmlTag: false,
      isValid: false,
      raw: input,
    };
  }

  // Check if user entered an HTML snippet with <img ...> or <a><img ...>
  const isHtml = /<img[^>]+>/i.test(trimmed) || /<a[^>]+>.*<\/a>/i.test(trimmed);

  if (isHtml) {
    // Extract src from <img ... src="..." ... />
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    const altMatch = trimmed.match(/alt=["']([^"']+)["']/i);
    const hrefMatch = trimmed.match(/href=["']([^"']+)["']/i);

    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : 'Imagem do HTML';
    const href = hrefMatch ? hrefMatch[1] : undefined;

    return {
      src: src,
      alt: alt,
      href: href,
      isHtmlTag: true,
      isValid: Boolean(src && (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/'))),
      raw: trimmed,
    };
  }

  // Plain direct URL
  const isValidUrl = trimmed.startsWith('http://') || 
                     trimmed.startsWith('https://') || 
                     trimmed.startsWith('data:image') ||
                     trimmed.startsWith('/');

  return {
    src: trimmed,
    alt: 'Imagem carregada',
    isHtmlTag: false,
    isValid: isValidUrl,
    raw: trimmed,
  };
}

export function generateHtmlSnippet(src: string, alt: string = 'Banner', linkHref?: string): string {
  if (linkHref && linkHref.trim() !== '') {
    return `<a href="${linkHref.trim()}" target="_blank" rel="noopener noreferrer">\n  <img src="${src}" alt="${alt}" class="w-full rounded-xl object-cover" />\n</a>`;
  }
  return `<img src="${src}" alt="${alt}" class="w-full rounded-xl object-cover" />`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
