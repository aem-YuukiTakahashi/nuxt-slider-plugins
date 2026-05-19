/**
 * Splide
 * @splidejs/vue-splide から VueSplide をグローバル登録
 */
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css'; // デフォルトのスタイル

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSplide);
});
