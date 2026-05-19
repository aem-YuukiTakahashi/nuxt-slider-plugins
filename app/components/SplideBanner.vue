<!--
  splideスライダーのdemo用コンポーネント
-->
<script setup lang="ts">
import type { Splide } from '@splidejs/splide';

/** `<Splide>` コンポーネントが `splide` でコアインスタンスを公開する（公式ドキュメント準拠） */
const splideEl = ref<{ splide?: Splide } | null>(null);

const splideOptions = {
  type: 'loop',
  focus: 'center', // 左端（先頭スライド）基準。中央基準にする場合は 'center'
  perPage: 2.5,
  gap: '20px',
  pagination: false,
  updateOnMove: true,
};

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

onMounted(async () => {
  await nextTick();

  const core = splideEl.value?.splide;
  requestAnimationFrame(() => {
    core?.refresh();
  });
});
</script>

<template>
  <div class="splide-demo-slider">
    <client-only>
      <Splide
        ref="splideEl"
        class="splide-demo-slider__swiper"
        :options="splideOptions"
        aria-label="スライダーのdemo用コンポーネント"
      >
        <SplideSlide
          v-for="(item, index) in slide"
          :key="`splide-demo-slider-${index}`"
          class="splide-demo-slider__item"
        >
          <NuxtLink
            class="splide-demo-slider__link"
            url="/"
          >
            <img
              :src="item.src"
              :is-lazy-load="false"
            />
          </NuxtLink>
        </SplideSlide>
      </Splide>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.splide-demo-slider {
  &__item {
    position: relative;
    display: block;
  }
  &__link {
    display: block;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
