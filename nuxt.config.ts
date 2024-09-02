import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt',
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

  compatibilityDate: '2024-08-30',
})