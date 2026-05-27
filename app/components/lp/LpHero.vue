<template>
  <section
    id="section-hero"
    ref="root"
    class="lp-hero"
    aria-label="ヒーロー"
  >
    <div
      class="lp-hero__bg js-gsap-lp-hero-bg"
      aria-hidden="true"
    >
      <span class="lp-hero__orb lp-hero__orb--1 js-gsap-lp-hero-orb" />
      <span class="lp-hero__orb lp-hero__orb--2 js-gsap-lp-hero-orb" />
      <span class="lp-hero__grid" />
    </div>

    <div class="lp-hero__content js-gsap-lp-hero-content">
      <p class="lp-hero__eyebrow js-gsap-lp-hero-eyebrow">
        GSAP × ScrollTrigger LP Demo
      </p>
      <h1 class="lp-hero__title js-gsap-lp-hero-title">
        Motion that follows your scroll.
      </h1>
      <p class="lp-hero__lead js-gsap-lp-hero-lead">
        バーガーメニューから各セクションへスムーススクロール。テキスト・カード・動画が順に立ち上がる、GSAP ふんだんのランディングページです。
      </p>
      <div class="lp-hero__actions js-gsap-lp-hero-actions">
        <button
          type="button"
          class="lp-hero__cta lp-hero__cta--primary"
          @click="emit('navigate', 'section-vision')"
        >
          Explore Vision
        </button>
        <button
          type="button"
          class="lp-hero__cta lp-hero__cta--ghost"
          @click="emit('navigate', 'section-works')"
        >
          View Works
        </button>
      </div>
    </div>

    <button
      type="button"
      class="lp-hero__scroll-hint js-gsap-lp-hero-scroll-hint"
      aria-label="次のセクションへ"
      @click="emit('navigate', 'section-vision')"
    >
      <span class="lp-hero__scroll-line" />
      Scroll
    </button>
  </section>
</template>

<script setup lang="ts">
import { SplitText } from 'gsap/SplitText'

const emit = defineEmits<{
  navigate: [targetId: string]
}>()

const root = ref<HTMLElement | null>(null)
const { gsap, ScrollTrigger } = useGsap()

useGsapContext(root, () => {
  if (!gsap) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(
      [
        '.js-gsap-lp-hero-eyebrow',
        '.js-gsap-lp-hero-title',
        '.js-gsap-lp-hero-lead',
        '.js-gsap-lp-hero-actions',
        '.js-gsap-lp-hero-scroll-hint',
      ],
      { clearProps: 'all', autoAlpha: 1, y: 0 },
    )
    return
  }

  const titleEl = root.value?.querySelector<HTMLElement>('.js-gsap-lp-hero-title')
  let split: SplitText | null = null

  if (titleEl) {
    split = SplitText.create(titleEl, { type: 'lines,words' })
    gsap.set(split.words, { yPercent: 120, autoAlpha: 0 })
  }

  const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  introTl
    .from('.js-gsap-lp-hero-eyebrow', { y: 24, autoAlpha: 0, duration: 0.7 }, 0.2)

  if (split) {
    introTl.to(split.words, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.85,
      stagger: 0.04,
    }, 0.35)
  }

  introTl
    .from('.js-gsap-lp-hero-lead', { y: 28, autoAlpha: 0, duration: 0.75 }, 0.55)
    .from('.js-gsap-lp-hero-actions', { y: 20, autoAlpha: 0, duration: 0.65 }, 0.75)
    .from('.js-gsap-lp-hero-scroll-hint', { autoAlpha: 0, y: 12, duration: 0.6 }, 1)

  gsap.to('.js-gsap-lp-hero-scroll-hint', {
    y: 8,
    duration: 1.4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1.2,
  })

  const orbs = root.value?.querySelectorAll<HTMLElement>('.js-gsap-lp-hero-orb')
  orbs?.forEach((orb, index) => {
    gsap.to(orb, {
      x: index === 0 ? 40 : -30,
      y: index === 0 ? -24 : 36,
      duration: 6 + index,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  })

  if (ScrollTrigger && root.value) {
    gsap.to('.js-gsap-lp-hero-bg', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    gsap.to('.js-gsap-lp-hero-content', {
      y: 80,
      autoAlpha: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    })
  }
})
</script>

<style scoped lang="scss">
.lp-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 8rem 2rem 6rem;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.55;

    &--1 {
      top: 10%;
      left: 8%;
      width: 320px;
      height: 320px;
      background: #5b8def;
    }

    &--2 {
      right: 5%;
      bottom: 15%;
      width: 280px;
      height: 280px;
      background: #c8f542;
    }
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgb(255 255 255 / 4%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(255 255 255 / 4%) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%);
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 820px;
    text-align: center;
  }

  &__eyebrow {
    margin: 0 0 1.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c8f542;
  }

  &__title {
    margin: 0 0 1.5rem;
    font-size: clamp(3.6rem, 8vw, 7.2rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  &__lead {
    margin: 0 auto 2.5rem;
    max-width: 56rem;
    font-size: 1.6rem;
    line-height: 1.7;
    color: #a1a1aa;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  &__cta {
    padding: 1rem 1.75rem;
    border-radius: 999px;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &--primary {
      border: none;
      background: linear-gradient(135deg, #c8f542, #9ed12f);
      color: #0c0c0f;
      box-shadow: 0 8px 28px rgb(200 245 66 / 25%);
    }

    &--ghost {
      border: 1px solid rgb(255 255 255 / 20%);
      background: transparent;
      color: #f4f4f5;
    }
  }

  &__scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 0;
    border: none;
    background: transparent;
    color: #71717a;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    transform: translateX(-50%);
    cursor: pointer;
  }

  &__scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, transparent, #c8f542);
  }
}
</style>
