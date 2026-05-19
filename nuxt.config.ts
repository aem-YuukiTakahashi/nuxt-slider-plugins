// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // CSS
  css: ['~/assets/scss/_base.scss'],

  app: {
    baseURL: '/nuxt-slider-plugins/',
  },
})
