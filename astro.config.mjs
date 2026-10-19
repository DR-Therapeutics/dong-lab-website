import { defineConfig } from 'astro/config';

// GitHub's workflow supplies these values automatically for either
// https://YOUR-USERNAME.github.io/dong-lab-website/ or your custom domain.
export default defineConfig({
  site: process.env.SITE_URL || 'https://dong-lab.ca',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});
