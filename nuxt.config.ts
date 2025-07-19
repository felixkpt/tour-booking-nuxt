import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  features: {
    clientLoader: false, // Disables the client-side loader
  },
  loading: false, // Disables the default loading bar

  app: {
    spaLoadingTemplate: false,
    head: {
      title: 'TravelMate',
      meta: [
        { name: 'description', content: 'Everything about - Nuxt-3' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  },

  alias: {
    '@': resolve(__dirname, '/')
  },

  css: [
    '~/assets/css/index.scss'
  ],

  runtimeConfig: {
  },

  modules: [
    "@nuxtjs/tailwindcss",

  ],

  primevue: {
    options: {
      unstyled: true
    },
  },

  compatibilityDate: '2024-09-02',

  runtimeConfig: {
    // Private keys are only available server-side
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      apiBase: '/api'
    }
  }

})