/**
 * Swiper Vue 3 プラグイン
 * swiper/vue から Swiper と SwiperSlide をグローバル登録
 */
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default defineNuxtPlugin((nuxtApp) => {
  // Swiper コンポーネントをグローバル登録
  nuxtApp.vueApp.component('Swiper', Swiper);
  nuxtApp.vueApp.component('SwiperSlide', SwiperSlide);

  // Swiper モジュールを provide
  return {
    provide: {
      swiperModules: {
        Autoplay,
        Pagination,
        Navigation,
      },
    },
  };
});
