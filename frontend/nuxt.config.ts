// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  // Add this configuration to handle Node.js polyfills
  vite: {
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        'form-data': 'form-data/lib/browser',
      },
    },
  },

  // Ensure proper SSR handling
  ssr: true,
})