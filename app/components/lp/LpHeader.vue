<template>
  <header
    ref="root"
    class="lp-header"
    :class="{ 'lp-header--menu-open': isMenuOpen }"
  >
    <div class="lp-header__inner">
      <button
        type="button"
        class="lp-header__logo js-gsap-lp-logo"
        @click="goTo('section-hero')"
      >
        <span class="lp-header__logo-mark" aria-hidden="true" />
        <span class="lp-header__logo-text">Motion Studio</span>
      </button>

      <button
        type="button"
        class="lp-header__burger js-gsap-lp-burger"
        :aria-expanded="isMenuOpen"
        aria-controls="lp-nav-panel"
        aria-label="メニューを開く"
        @click="toggleMenu"
      >
        <span class="lp-header__burger-line" />
        <span class="lp-header__burger-line" />
        <span class="lp-header__burger-line" />
      </button>
    </div>

    <div
      id="lp-nav-panel"
      class="lp-header__overlay js-gsap-lp-nav-overlay"
      :aria-hidden="!isMenuOpen"
      @click.self="closeMenu"
    >
      <nav
        class="lp-header__nav js-gsap-lp-nav-panel"
        aria-label="ページ内ナビゲーション"
      >
        <ul class="lp-header__nav-list">
          <li
            v-for="(item, index) in navItems"
            :key="item.id"
            class="lp-header__nav-item js-gsap-lp-nav-item"
          >
            <button
              type="button"
              class="lp-header__nav-link"
              @click="onNavClick(item.id)"
            >
              <span class="lp-header__nav-index">0{{ index + 1 }}</span>
              {{ item.label }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Timeline } from 'gsap/gsap-core'
import { lpNavItems } from '~/constants/lpContent'

const emit = defineEmits<{
  navigate: [targetId: string]
}>()

const root = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)
const navItems = lpNavItems

const { gsap } = useGsap()

let menuTimeline: Timeline | null = null

/**
 * バーガーメニューの開閉タイムラインを構築する
 */
function buildMenuTimeline() {
  if (!root.value || !gsap) return null

  const overlay = root.value.querySelector<HTMLElement>('.js-gsap-lp-nav-overlay')
  const panel = root.value.querySelector<HTMLElement>('.js-gsap-lp-nav-panel')
  const items = [...root.value.querySelectorAll<HTMLElement>('.js-gsap-lp-nav-item')]

  if (!overlay || !panel) return null

  gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' })
  gsap.set(panel, { xPercent: 100 })
  gsap.set(items, { autoAlpha: 0, x: 32 })

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.inOut' },
    onReverseComplete: () => {
      isMenuOpen.value = false
      overlay.style.pointerEvents = 'none'
    },
  })

  tl.to(overlay, { autoAlpha: 1, duration: 0.35 })
    .to(panel, { xPercent: 0, duration: 0.55 }, 0)
    .to(items, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.07 }, 0.15)

  return tl
}

function openMenu() {
  if (!menuTimeline) return
  isMenuOpen.value = true
  const overlay = root.value?.querySelector<HTMLElement>('.js-gsap-lp-nav-overlay')
  if (overlay) overlay.style.pointerEvents = 'auto'
  menuTimeline.play(0)
}

function closeMenu() {
  menuTimeline?.reverse()
}

function toggleMenu() {
  if (isMenuOpen.value) closeMenu()
  else openMenu()
}

function goTo(targetId: string) {
  emit('navigate', targetId)
}

function onNavClick(targetId: string) {
  closeMenu()
  // パネルが閉じるアニメ後にスクロール
  window.setTimeout(() => goTo(targetId), 380)
}

useGsapContext(root, () => {
  if (!gsap) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const overlay = root.value?.querySelector<HTMLElement>('.js-gsap-lp-nav-overlay')
    const panel = root.value?.querySelector<HTMLElement>('.js-gsap-lp-nav-panel')
    const items = root.value?.querySelectorAll<HTMLElement>('.js-gsap-lp-nav-item')
    if (overlay) gsap.set(overlay, { clearProps: 'all', autoAlpha: 0 })
    if (panel) gsap.set(panel, { clearProps: 'all', xPercent: 0 })
    items?.forEach(el => gsap.set(el, { clearProps: 'all', autoAlpha: 1, x: 0 }))
    return
  }

  menuTimeline = buildMenuTimeline()

  gsap.from('.js-gsap-lp-logo', {
    y: -16,
    autoAlpha: 0,
    duration: 0.7,
    ease: 'power2.out',
    delay: 0.1,
  })
})

defineExpose({ closeMenu })
</script>

<style scoped lang="scss">
.lp-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 72px;
  border-bottom: 1px solid rgb(255 255 255 / 8%);
  background: rgb(12 12 15 / 72%);
  backdrop-filter: blur(12px);

  &--menu-open {
    .lp-header__burger-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .lp-header__burger-line:nth-child(2) {
      opacity: 0;
    }

    .lp-header__burger-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__logo {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  &__logo-mark {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #c8f542, #5b8def);
  }

  &__logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  &__burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 8px;
    background: rgb(255 255 255 / 4%);
    cursor: pointer;
  }

  &__burger-line {
    display: block;
    width: 20px;
    height: 2px;
    margin: 0 auto;
    border-radius: 1px;
    background: #fff;
    transition:
      transform 0.25s ease,
      opacity 0.2s ease;
  }

  &__overlay {
    position: fixed;
    inset: 72px 0 0;
    background: rgb(0 0 0 / 55%);
    visibility: hidden;
  }

  &__nav {
    position: absolute;
    top: 0;
    right: 0;
    width: min(100%, 360px);
    height: 100%;
    padding: 3rem 2rem;
    background: #14141a;
    box-shadow: -12px 0 40px rgb(0 0 0 / 35%);
  }

  &__nav-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__nav-item + &__nav-item {
    margin-top: 0.5rem;
  }

  &__nav-link {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    width: 100%;
    padding: 1.25rem 1rem;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: #f4f4f5;
    font-size: 2rem;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgb(255 255 255 / 6%);
    }
  }

  &__nav-index {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #c8f542;
  }
}
</style>
