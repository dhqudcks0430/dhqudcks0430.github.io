import { SITE } from '@/lib/site';

export interface SeoInput {
  title: string;
  description: string;
  pathname: string;
  site?: URL | undefined;
}

export const buildPageTitle = (title: string) => `${title} | ${SITE.title}`;

export const buildCanonicalUrl = ({ pathname, site }: SeoInput) => {
  if (!site) {
    return undefined;
  }

  const normalized = pathname === '/' ? '' : pathname.replace(/^\//, '');
  return new URL(normalized, site.toString().endsWith('/') ? site : `${site.toString()}/`).toString();
};

export const buildOgImage = ({ site }: { site?: URL | undefined }) => {
  if (!site) {
    return undefined;
  }

  return new URL('favicon.svg', site.toString().endsWith('/') ? site : `${site.toString()}/`).toString();
};
