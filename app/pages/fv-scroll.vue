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

/** ScrollTrigger / Lenis 再計算用 */
const refreshScroll = () => {
  ScrollTrigger.refresh()
}

let gsapContext: gsap.Context | null = null

onMounted(async () => {
  await nextTick()

  if (!fvScrollRef.value || !fvPinRef.value || !fvInnerRef.value) {
    return
  }

  gsapContext = gsap.context(() => {
    gsap.timeline({
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
          borderRadius: 12,
        },
        {
          width: '100%',
          height: '100vh',
          borderRadius: 0,
          ease: 'none',
        },
      )
  }, fvScrollRef.value)

  refreshScroll()
  window.addEventListener('resize', refreshScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', refreshScroll)
  gsapContext?.revert()
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

    <footer class="fv-page__footer">
      <NuxtLink
        to="/"
        class="fv-page__back"
      >
        トップへ戻る
      </NuxtLink>
    </footer>
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
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    will-change: width, height, border-radius;
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

  &__footer {
    padding: 48px 24px 80px;
    text-align: center;
  }

  &__back {
    display: inline-block;
    padding: 16px 32px;
    background-color: #000;
    color: #fff;
    font-size: 1.4rem;
    border-radius: 4px;
  }
}
</style>
