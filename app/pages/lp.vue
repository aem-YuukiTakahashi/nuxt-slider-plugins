<!--
  GSAP ふんだんの LP デモ（バーガーメニュー・セクションスクロール・フッター追従 TOP）
-->
<script setup lang="ts">
import { lpSections } from '~/constants/lpContent'

definePageMeta({
  layout: 'lp',
})

const pageRef = ref<HTMLElement | null>(null)
const headerRef = ref<InstanceType<typeof LpHeader> | null>(null)

const { scrollToSection, scrollToTop } = useLpScrollTo()
const { ScrollTrigger } = useGsap()

/**
 * ヘッダー / ヒーローからのページ内スクロール
 */
function onNavigate(targetId: string) {
  scrollToSection(targetId)
}

function onScrollTop() {
  scrollToTop()
}

/** 画像読み込み後などレイアウト変化で ScrollTrigger を再計算 */
onMounted(() => {
  nextTick(() => {
    ScrollTrigger?.refresh()
  })
})
</script>

<template>
  <div
    ref="pageRef"
    class="lp-page"
  >
    <LpHeader
      ref="headerRef"
      @navigate="onNavigate"
    />

    <main class="lp-page__main">
      <LpHero @navigate="onNavigate" />

      <LpSectionBlock
        v-for="(section, index) in lpSections"
        :key="section.id"
        :section="section"
        :section-index="index"
      />
    </main>

    <LpFooter @scroll-top="onScrollTop" />
  </div>
</template>

<style scoped lang="scss">
.lp-page {
  padding-top: 72px;

  &__main {
    overflow: hidden;
  }
}
</style>
