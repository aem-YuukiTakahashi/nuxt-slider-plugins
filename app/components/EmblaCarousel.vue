<!--
  embla-carousel-vueのdemo用コンポーネント
-->
<script setup lang="ts">
import useEmblaCarousel from 'embla-carousel-vue'

// Swiper / Splide と同様: 2.5枚表示・20px間隔・中央寄せ・ループ
const [emblaRef] = useEmblaCarousel({
  align: 'center',
  loop: true,
})

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
  <div class="embla">
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container">
        <div v-for="(item, index) in slide" :key="`embla-${index}`" class="embla__slide">
          <NuxtLink class="embla__link" :url="item.link">
            <img :src="item.src" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Swiper (slides-per-view: 2.5, space-between: 20) / Splide (perPage: 2.5, gap: 20px) に合わせる
$slides-per-view: 2.5;
$slide-gap: 20px;

.embla {
  &__viewport {
    position: relative;
    display: block;
    overflow: hidden;
  }
  &__container {
    display: flex;
  }
  &__slide {
    flex: 0 0 calc((100% - $slide-gap * ($slides-per-view - 1)) / $slides-per-view);
    min-width: 0;
    padding-right: $slide-gap;
    box-sizing: content-box;
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
