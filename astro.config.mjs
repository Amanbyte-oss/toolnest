import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// Primary site URL - single source of truth for production domain
export const SITE_URL = 'https://toolnest.pages.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  session: {
    driver: 'memory',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/countdown/view') && !page.endsWith('/name'),
      serialize(item) {
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
});
