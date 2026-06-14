// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// IMPORTANT: `site` drives canonical URLs, the RSS feed and the sitemap.
// Do not change this unless the production domain changes.
export default defineConfig({
  site: 'https://lanc.ai',
  // Static output — required for Cloudflare Pages. Do not switch to 'server'.
  output: 'static',
  // mdx() enables <YouTube> (and other components) inline in article bodies.
  // It also applies the markdown.shikiConfig below to code in .mdx files.
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Dark theme for code blocks; matches the site's dark aesthetic.
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
