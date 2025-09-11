// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: [
      '~/utils/**' // scan all utils within the folder nested or not
    ]
  },
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
  routeRules: {
    '/': {redirect: '/login'}
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001',
    }
  },

  // Ensure proper SSR handling
  ssr: true,
})