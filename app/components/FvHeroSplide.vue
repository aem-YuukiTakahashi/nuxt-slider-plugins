<!--
  FV用 Splide（フェード切り替え・3枚）
-->
<script setup lang="ts">
import type { Splide } from '@splidejs/splide'

/** `<Splide>` が公開するコアインスタンス */
const splideEl = ref<{ splide?: Splide } | null>(null)

const splideOptions = {
  type: 'fade',
  rewind: true,
  perPage: 1,
  pagination: true,
  arrows: false,
  autoplay: true,
  interval: 4000,
  pauseOnHover: false,
  pauseOnFocus: false,
}

/** FVは3枚で十分なため先頭3件のみ利用 */
const slides = computed(() => useBannerSlides().slice(0, 3))

onMounted(async () => {
  await nextTick()
  const core = splideEl.value?.splide
  requestAnimationFrame(() => {
    core?.refresh()
  })
})
</script>

<template>
  <div class="fv-hero-splide">
    <client-only>
      <Splide
        ref="splideEl"
        class="fv-hero-splide__slider"
        :options="splideOptions"
        aria-label="ファーストビュー画像スライダー"
      >
        <SplideSlide
          v-for="(item, index) in slides"
          :key="`fv-hero-${index}`"
          class="fv-hero-splide__slide"
        >
          <img
            class="fv-hero-splide__img"
            :src="item.src"
            :alt="`スライド ${index + 1}`"
            loading="eager"
          >
        </SplideSlide>
      </Splide>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.fv-hero-splide {
  width: 100%;
  height: 100%;

  // Splide 内部まで高さを伝播（fade でも領域いっぱいに表示）
  :deep(.splide),
  :deep(.splide__slider),
  :deep(.splide__track),
  :deep(.splide__list),
  :deep(.splide__slide) {
    width: 100%;
    height: 100%;
  }

  &__slider {
    width: 100%;
    height: 100%;
  }

  &__slide {
    position: relative;
    overflow: hidden;
  }

  &__img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    max-width: none; // _base.scss の max-width: 100% を打ち消す
    object-fit: cover;
    object-position: center;
  }

  :deep(.splide__pagination) {
    bottom: 16px;
  }

  :deep(.splide__pagination__page) {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 1;

    &.is-active {
      background: #fff;
      transform: scale(1.2);
    }
  }
}
</style>
