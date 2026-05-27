<template>
  <main class="shape-morph-page">
    <header class="shape-morph-page__header">
      <NuxtLink
        to="/gsap-svg"
        class="shape-morph-page__back"
      >
        ← GSAP SVG 一覧
      </NuxtLink>
      <h1 class="shape-morph-page__title">
        Shape Morph on Scroll
      </h1>
      <p class="shape-morph-page__lead">
        各セクションが画面中央付近に入ると、10頂点の同一構造パスが丸・四角・三角・5角星へモーフします。
      </p>
    </header>

    <GsapSvgShapeMorphScroll />
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.shape-morph-page {
  min-height: calc(100vh - 60px);
  padding: 3rem 2rem 0;
  font-family: system-ui, sans-serif;
}

.shape-morph-page__header {
  max-width: 1080px;
  margin: 0 auto 2rem;
}

.shape-morph-page__back {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #555;
  text-decoration: none;

  &:hover {
    color: #111;
    text-decoration: underline;
  }
}

.shape-morph-page__title {
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 700;
}

.shape-morph-page__lead {
  margin: 0;
  max-width: 40rem;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: #555;
}
</style>
