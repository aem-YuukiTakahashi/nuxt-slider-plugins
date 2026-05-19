<!--
  スライダー
  TOPページのbannerで使ってる
-->
<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const swiperInstance = ref<SwiperType | null>(null);
const swiperModules = [Autoplay, Navigation, Pagination];

function onSwiper(swiper: SwiperType) {
  swiperInstance.value = swiper;
}

const slide = [
  {
    id: 1,
    src: '/images/img1.png',
    link: '/',
  },
  {
    id: 2,
    src: '/images/img2.png',
    link: '/',
  },
  {
    id: 3,
    src: '/images/img3.png',
    link: '/',
  },
  {
    id: 4,
    src: '/images/img1.png',
    link: '/',
  },
  {
    id: 5,
    src: '/images/img2.png',
    link: '/',
  },
  {
    id: 6,
    src: '/images/img3.png',
    link: '/',
  },
];
</script>

<template>
  <div class="banner-list">
    <client-only>
      <Swiper
        :modules="swiperModules"
        slides-per-view="2.5"
        :space-between="20"
        :centered-slides="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true"
        :navigation="{ nextEl: '.banner-list__next', prevEl: '.banner-list__prev' }"
        :pagination="{ el: '.banner-list__pagination', clickable: true }"
        :breakpoints="{ 960: { spaceBetween: 30 } }"
        @swiper="onSwiper"
      >
        <SwiperSlide
          v-for="(banner, index) in slide"
          :key="`banner-${index}`"
          class="banner-list__item"
        >
          <NuxtLink
            class="banner-list__link"
            :url="banner.link"
          >
            <img
              :src="banner.src"
              :is-lazy-load="false"
            />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.banner-list {
  &__item {
    position: relative;
    display: block;
    margin: auto;
    @include mq-pc {
      width: 320px;
      height: 120px;
    }
    @include mq-mb {
      width: 256px;
      height: 96px;
    }
    img {
      @include center;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__link {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
