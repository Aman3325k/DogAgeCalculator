// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dogbreedage.com',
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap({
    lastmod: new Date()
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
