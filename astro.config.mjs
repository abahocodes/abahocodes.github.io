import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://abahocodes.github.io',
  integrations: [
    tailwind(),
    icon(),
  ],
});
