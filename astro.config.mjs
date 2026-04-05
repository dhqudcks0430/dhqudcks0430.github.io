import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const repoOwner = process.env.GITHUB_REPOSITORY?.split('/')[0] ?? '';
const isUserPagesSite = repoName.endsWith('.github.io');

const base = process.env.BASE_PATH ?? (repoName && !isUserPagesSite ? `/${repoName}` : '/');
const site =
  process.env.SITE_URL ??
  (repoOwner && repoName
    ? `https://${repoOwner}.github.io${isUserPagesSite ? '' : `/${repoName}`}`
    : 'https://example.github.io');

export default defineConfig({
  output: 'static',
  site,
  base,
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark'
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
  }
});
