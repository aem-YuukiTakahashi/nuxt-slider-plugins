<template>
  <main class="hub">
    <header class="hub__header">
      <h1 class="hub__title">
        GSAP + SVG
      </h1>
      <p class="hub__lead">
        GSAP と SVG を組み合わせたアニメーションサンプル。各デモは個別ページで確認できます。
      </p>
    </header>

    <ul class="hub__list">
      <li
        v-for="link in gsapSvgNavLinks"
        :key="link.to"
        class="hub__item"
      >
        <NuxtLink
          :to="link.to"
          class="hub__card"
        >
          <span class="hub__card-label">{{ link.label }}</span>
          <span class="hub__card-desc">{{ link.description }}</span>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { gsapSvgNavLinks } from '~/constants/gsapSvgNav'
</script>

<style scoped lang="scss">
.hub {
  min-height: calc(100vh - 60px);
  padding: 3rem 2rem 6rem;
  font-family: system-ui, sans-serif;
}

.hub__header {
  max-width: 640px;
  margin: 0 auto 3rem;
}

.hub__title {
  margin: 0 0 0.75rem;
  font-size: 2.25rem;
  font-weight: 700;
}

.hub__lead {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: #555;
}

.hub__list {
  display: grid;
  gap: 1rem;
  max-width: 640px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.hub__card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #bbb;
    box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
  }
}

.hub__card-label {
  font-size: 1.125rem;
  font-weight: 600;
}

.hub__card-desc {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
}
</style>
