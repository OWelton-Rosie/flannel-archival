import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    // Cloudflare adapter (used only when building for production)
    adapter: adapter(),

    // You can leave the default paths for local dev
    // out: '.svelte-kit/output' // optional
  }
};

export default config;