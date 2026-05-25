<!--
  FVスクロール拡大 + Splide + 下層セクション（参考: https://fumakikuchi.com/）
-->
<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  layout: 'fv',
})

const fvScrollRef = ref<HTMLElement | null>(null)
const fvPinRef = ref<HTMLElement | null>(null)
const fvInnerRef = ref<HTMLElement | null>(null)

/** ScrollTrigger 準備完了後に FV を表示する（scrollTo(0) はバック時の位置復元と競合するため使わない） */
const isFvReady = ref(false)

/** ScrollTrigger / Lenis 再計算用 */
const refreshScroll = () => {
  ScrollTrigger.refresh()
}

let gsapContext: gsap.Context | null = null
let fvTimeline: gsap.core.Timeline | null = null

/**
 * Nuxt の scrollBehavior / Lenis がスクロール位置を確定するまで待つ。
 * onMounted 直後は前ページの scroll が残っていることがある。
 */
function waitForRouteScrollSettled(): Promise<void> {
  const nuxtApp = useNuxtApp()

  return new Promise((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      // scrollBehavior 適用後に Lenis / ScrollTrigger が追いつくまで 2 フレーム待つ
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve())
      })
    }

    nuxtApp.hooks.hookOnce('page:finish', finish)
    // page:finish が hook 登録より先に終わった場合のセーフティ（通常は page:finish が先に走る）
    setTimeout(finish, 500)
  })
}

/** scrub の遅延を経ず、現在の scroll に合わせてタイムライン progress を即時同期する */
function syncFvTimelineProgress() {
  const st = fvTimeline?.scrollTrigger
  if (!st || !fvTimeline) return
  st.update()
  fvTimeline.progress(st.progress, false)
}

function initFvScrollAnimation() {
  if (!fvScrollRef.value || !fvPinRef.value || !fvInnerRef.value) return

  gsapContext = gsap.context(() => {
    fvTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: fvScrollRef.value,
        start: 'top top',
        end: '+=100%',
        pin: fvPinRef.value,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .fromTo(
        fvInnerRef.value,
        {
          width: '72%',
          height: '52vh',
          borderRadius: 50,
        },
        {
          width: '100%',
          height: '100vh',
          borderRadius: 0,
          ease: 'none',
          immediateRender: false,
        },
      )
  }, fvScrollRef.value)

  ScrollTrigger.refresh(true)
  syncFvTimelineProgress()
}

onMounted(async () => {
  isFvReady.value = false
  await nextTick()

  if (!fvScrollRef.value || !fvPinRef.value || !fvInnerRef.value) {
    isFvReady.value = true
    return
  }

  await waitForRouteScrollSettled()
  initFvScrollAnimation()
  window.addEventListener('resize', refreshScroll)

  requestAnimationFrame(() => {
    syncFvTimelineProgress()
    isFvReady.value = true
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', refreshScroll)
  gsapContext?.revert()
  gsapContext = null
  fvTimeline = null
  isFvReady.value = false
})
</script>

<template>
  <main class="fv-page">
    <!-- スクロール量を確保するラッパー（pin 中に FV を拡大） -->
    <div
      ref="fvScrollRef"
      class="fv-page__scroll js-gsap-fv-scroll"
    >
      <section
        ref="fvPinRef"
        class="fv-page__fv js-gsap-fv"
        aria-label="ファーストビュー"
      >
        <div
          ref="fvInnerRef"
          class="fv-page__inner js-gsap-fv-inner"
          :class="{ 'fv-page__inner--ready': isFvReady }"
        >
          <FvHeroSplide />
        </div>
      </section>
    </div>

    <section class="fv-page__section fv-page__section--notice">
      <h2 class="fv-page__heading">
        NOTICE
      </h2>
      <ul class="fv-page__list">
        <li>2026.05.21 サンプルお知らせを更新しました</li>
        <li>2026.05.20 サンプルお知らせを更新しました</li>
        <li>2026.05.14 会員限定コンテンツを公開しました</li>
      </ul>
    </section>

    <section class="fv-page__section fv-page__section--topics">
      <h2 class="fv-page__heading">
        TOPICS
      </h2>
      <div class="fv-page__cards">
        <article
          v-for="n in 4"
          :key="`topic-${n}`"
          class="fv-page__card"
        >
          <p>トピックス {{ n }}（ダミーコンテンツ）</p>
        </article>
      </div>
    </section>

    <section class="fv-page__section fv-page__section--info">
      <h2 class="fv-page__heading">
        INFORMATION
      </h2>
      <ul class="fv-page__list">
        <li>2026.05.12 ファンクラブ情報のお知らせ（サンプル）</li>
        <li>2026.04.27 サイトリニューアルのお知らせ（サンプル）</li>
        <li>2026.04.22 活動に関するお知らせ（サンプル）</li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.fv-page {
  &__scroll {
    position: relative;
    height: 200vh;
  }

  &__fv {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f5f5f5;
  }

  &__inner {
    position: relative;
    // ScrollTrigger fromTo の from と同値（マウント前のチラつき防止）
    width: 72%;
    height: 52vh;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    will-change: width, height, border-radius;
    // 初期化完了まで非表示（GSAP が誤った progress を描画するのを隠す）
    visibility: hidden;

    &--ready {
      visibility: visible;
    }

    // Splide ルートに親の高さを渡す
    :deep(.fv-hero-splide) {
      width: 100%;
      height: 100%;
    }
  }

  &__section {
    padding: 80px 24px;
    max-width: 960px;
    margin: 0 auto;

    &--notice {
      background-color: #fff;
    }

    &--topics {
      background-color: #fafafa;
    }

    &--info {
      background-color: #fff;
    }
  }

  &__heading {
    margin: 0 0 32px;
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-align: center;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      padding: 16px 0;
      border-bottom: 1px solid #e5e5e5;
      font-size: 1.4rem;
      line-height: 1.6;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  &__card {
    aspect-ratio: 4 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-color: #eee;
    border-radius: 8px;
    text-align: center;
    font-size: 1.3rem;
  }

}
</style>
