<template>
  <footer
    ref="root"
    class="lp-footer"
  >
    <div class="lp-footer__inner">
      <div class="lp-footer__brand js-gsap-lp-footer-brand">
        <span
          class="lp-footer__logo-mark"
          aria-hidden="true"
        />
        <div>
          <p class="lp-footer__logo-text">
            Motion Studio
          </p>
          <p class="lp-footer__tagline">
            GSAP-powered landing experience
          </p>
        </div>
      </div>

      <p class="lp-footer__copy js-gsap-lp-footer-copy">
        &copy; {{ year }} Motion Studio. All rights reserved.
      </p>
    </div>

    <button
      type="button"
      class="lp-footer__top js-gsap-lp-scroll-top"
      :class="{ 'lp-footer__top--visible': showScrollTop }"
      aria-label="ページの先頭へ戻る"
      @click="emit('scroll-top')"
    >
      <span
        class="lp-footer__top-icon"
        aria-hidden="true"
      >↑</span>
    </button>
  </footer>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'scroll-top': []
}>()

const root = ref<HTMLElement | null>(null)
const showScrollTop = ref(false)

const year = new Date().getFullYear()

const { gsap, ScrollTrigger } = useGsap()

useGsapContext(root, () => {
  if (!gsap || !ScrollTrigger) return

  gsap.from('.js-gsap-lp-footer-brand', {
    y: 24,
    autoAlpha: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 92%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.from('.js-gsap-lp-footer-copy', {
    y: 16,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  })

  ScrollTrigger.create({
    start: 400,
    end: 99999,
    onUpdate: (self) => {
      showScrollTop.value = self.scroll() > 400
    },
  })
})
</script>

<style scoped lang="scss">
.lp-footer {
  position: relative;
  padding: 5rem 2rem 4rem;
  background: #0a0a0d;
  border-top: 1px solid rgb(255 255 255 / 8%);

  &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  &__logo-mark {
    flex-shrink: 0;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #c8f542, #5b8def);
  }

  &__logo-text {
    margin: 0 0 0.35rem;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #f4f4f5;
  }

  &__tagline {
    margin: 0;
    font-size: 1.3rem;
    color: #71717a;
  }

  &__copy {
    margin: 0;
    font-size: 1.3rem;
    color: #52525b;
  }

  &__top {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    z-index: 90;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 50%;
    background: rgb(20 20 26 / 92%);
    color: #c8f542;
    box-shadow: 0 8px 28px rgb(0 0 0 / 35%);
    backdrop-filter: blur(8px);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(12px);
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease,
      transform 0.3s ease,
      background-color 0.2s ease;

    &--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      animation: lp-scroll-top-pulse 1.8s ease-in-out infinite;
    }

    &:hover {
      background: #c8f542;
      color: #0c0c0f;
    }
  }

  &__top-icon {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }
}

@keyframes lp-scroll-top-pulse {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}
</style>
