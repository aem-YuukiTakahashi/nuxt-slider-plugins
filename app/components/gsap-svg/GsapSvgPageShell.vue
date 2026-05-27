<template>
  <main class="gsap-svg-page">
    <header class="gsap-svg-page__header">
      <NuxtLink
        to="/gsap-svg"
        class="gsap-svg-page__back"
      >
        ← GSAP SVG 一覧
      </NuxtLink>
      <h1 class="gsap-svg-page__title">
        {{ title }}
      </h1>
      <p class="gsap-svg-page__lead">
        {{ lead }}
      </p>
    </header>
    <div class="gsap-svg-page__body">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  lead: string
}>()
</script>

<style scoped lang="scss">
.gsap-svg-page {
  min-height: calc(100vh - 60px);
  padding: 3rem 2rem 6rem;
  font-family: system-ui, sans-serif;
}

.gsap-svg-page__header {
  max-width: 720px;
  margin: 0 auto 3rem;
}

.gsap-svg-page__back {
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

.gsap-svg-page__title {
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 700;
}

.gsap-svg-page__lead {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: #555;
}

.gsap-svg-page__body {
  display: flex;
  justify-content: center;
}
</style>
