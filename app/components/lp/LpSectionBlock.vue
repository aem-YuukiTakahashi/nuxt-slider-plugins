<template>
  <section
    :id="section.id"
    ref="root"
    class="lp-section"
    :class="`lp-section--${sectionIndex % 2 === 0 ? 'light' : 'dark'}`"
    :aria-labelledby="`${section.id}-title`"
  >
    <div class="lp-section__inner">
      <header class="lp-section__header">
        <p class="lp-section__index js-gsap-lp-section-index">
          0{{ sectionIndex + 1 }}
        </p>
        <h2
          :id="`${section.id}-title`"
          class="lp-section__title js-gsap-lp-section-title"
        >
          {{ section.title }}
        </h2>
        <p class="lp-section__lead js-gsap-lp-section-lead">
          {{ section.lead }}
        </p>
      </header>

      <div class="lp-section__block">
        <h3 class="lp-section__block-title js-gsap-lp-section-label">
          Topics
        </h3>
        <TextList
          :items="section.textItems"
          class="lp-section__text-list"
        />
      </div>

      <div class="lp-section__block">
        <h3 class="lp-section__block-title js-gsap-lp-section-label">
          Gallery
        </h3>
        <CardList
          :items="section.cardItems"
          class="lp-section__card-list"
        />
      </div>

      <div class="lp-section__block lp-section__block--video">
        <h3 class="lp-section__block-title js-gsap-lp-section-label">
          Video
        </h3>
        <div class="lp-section__video-wrap js-gsap-lp-video">
          <iframe
            class="lp-section__video"
            :src="`https://www.youtube.com/embed/${section.youtubeId}`"
            :title="`${section.title} 紹介動画`"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <p class="lp-section__video-caption js-gsap-lp-video-caption">
          {{ section.videoCaption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LpSection } from '~/constants/lpContent'

const props = defineProps<{
  section: LpSection
  sectionIndex: number
}>()

const root = ref<HTMLElement | null>(null)
const { gsap, ScrollTrigger } = useGsap()

useGsapContext(root, () => {
  if (!gsap || !ScrollTrigger || !root.value) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    gsap.set(root.value.querySelectorAll('[class*="js-gsap-lp"]'), {
      clearProps: 'all',
      autoAlpha: 1,
      y: 0,
      scale: 1,
    })
    return
  }

  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: root.value,
      start: 'top 78%',
      toggleActions: 'play none none reverse',
    },
  })

  headerTl
    .from('.js-gsap-lp-section-index', { y: 16, autoAlpha: 0, duration: 0.5 })
    .from('.js-gsap-lp-section-title', { y: 48, autoAlpha: 0, duration: 0.75 }, 0.08)
    .from('.js-gsap-lp-section-lead', { y: 24, autoAlpha: 0, duration: 0.65 }, 0.2)

  const textItems = root.value.querySelectorAll('.text-list__item')
  if (textItems.length) {
    ScrollTrigger.batch(textItems, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 36,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      },
    })
  }

  const cardItems = root.value.querySelectorAll('.card-list__item')
  if (cardItems.length) {
    ScrollTrigger.batch(cardItems, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 56,
          autoAlpha: 0,
          scale: 0.94,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      },
    })
  }

  const videoEl = root.value.querySelector('.js-gsap-lp-video')
  if (videoEl) {
    gsap.from(videoEl, {
    scale: 0.92,
    autoAlpha: 0,
    y: 40,
    duration: 0.9,
    ease: 'power2.out',
      scrollTrigger: {
        trigger: videoEl,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }

  const videoCaption = root.value.querySelector('.js-gsap-lp-video-caption')
  if (videoCaption) {
    gsap.from(videoCaption, {
      y: 16,
      autoAlpha: 0,
      duration: 0.55,
      scrollTrigger: {
        trigger: videoCaption,
        start: 'top 92%',
        toggleActions: 'play none none reverse',
      },
    })
  }
})
</script>

<style scoped lang="scss">
.lp-section {
  padding: 8rem 0;

  &--light {
    background: #f7f5f0;
    color: #18181b;

    :deep(.text-list__item) {
      background: #fff;
      border: 1px solid #e4e4e7;
    }

    :deep(.card-list__card) {
      background: #fff;
      border: 1px solid #e4e4e7;
    }
  }

  &--dark {
    background: #14141a;
    color: #f4f4f5;

    :deep(.text-list__item) {
      background: rgb(255 255 255 / 4%);
      border: 1px solid rgb(255 255 255 / 8%);
    }

    :deep(.card-list__card) {
      background: rgb(255 255 255 / 4%);
      border: 1px solid rgb(255 255 255 / 8%);
    }
  }

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__header {
    margin-bottom: 4rem;
  }

  &__index {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    color: #5b8def;
  }

  &--dark &__index {
    color: #c8f542;
  }

  &__title {
    margin: 0 0 1.25rem;
    font-size: clamp(3.2rem, 6vw, 5.6rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
  }

  &__lead {
    margin: 0;
    max-width: 64rem;
    font-size: 1.6rem;
    line-height: 1.75;
    opacity: 0.85;
  }

  &__block {
    margin-bottom: 4.5rem;

    &--video {
      margin-bottom: 0;
    }
  }

  &__block-title {
    margin: 0 0 1.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  &__video-wrap {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 20px 50px rgb(0 0 0 / 18%);
  }

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  &__video-caption {
    margin: 1rem 0 0;
    font-size: 1.2rem;
    line-height: 1.5;
    opacity: 0.65;
  }
}
</style>
