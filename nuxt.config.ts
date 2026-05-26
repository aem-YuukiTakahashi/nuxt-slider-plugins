// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 自動インポート
  imports: {
    dirs: ['composables', 'composables/**'],
  },

  // CSS
  css: ['~/assets/scss/_base.scss'],

  app: {
    baseURL: '/nuxt-slider-plugins/',
    head: {
      meta: [
        { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet' },
        { name: 'googlebot', content: 'noindex, nofollow' },
      ],
    },
  },

  /** 検索エンジン向け HTTP ヘッダー（全ルート） */
  routeRules: {
    '/**': {
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
      },
    },
  },
})
