<template>
  <main class="scroll-page">
    <header class="scroll-page__header">
      <NuxtLink
        to="/gsap-svg"
        class="scroll-page__back"
      >
        ← GSAP SVG 一覧
      </NuxtLink>
      <h1 class="scroll-page__title">
        Scroll Reveal
      </h1>
      <p class="scroll-page__lead">
        ScrollTrigger の scrub でスクロール量に応じて SVG パスが描かれます。
      </p>
    </header>
    <GsapSvgScrollReveal />
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.scroll-page {
  font-family: system-ui, sans-serif;
}

.scroll-page__header {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 2rem 0;
}

.scroll-page__back {
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

.scroll-page__title {
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 700;
}

.scroll-page__lead {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: #555;
}
</style>
