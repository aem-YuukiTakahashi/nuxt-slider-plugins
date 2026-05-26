<template>
  <main class="page">
    <header class="page__header">
      <h1 class="page__title">
        Heading Animations
      </h1>
      <p class="page__lead">
        GSAP による見出しアニメーションのパターン集（39種）。色変化・グラデーション・グリッチなど含む。各ブロックはスクロールで一度再生され、テキスト・色・パラメーターを調整して「適用して再生」で再確認できます。
      </p>
    </header>

    <div class="page__demos">
      <GsapHeadingDemo
        v-for="demo in headingAnimationDemos"
        :key="demo.id"
        :variant="demo.variant"
        :label="demo.label"
        :title="demo.title"
        :description="demo.description"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { headingAnimationDemos } from '~/constants/headingAnimationDemos'
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 4rem 2rem 8rem;
  font-family: system-ui, sans-serif;
}

.page__header {
  margin-bottom: 2rem;
  max-width: 40rem;
}

.page__title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.page__lead {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #555;
}

.page__demos {
  max-width: 48rem;
}

.page__demos :deep(.gsap-heading-demo:last-child) {
  border-bottom: none;
}
</style>
