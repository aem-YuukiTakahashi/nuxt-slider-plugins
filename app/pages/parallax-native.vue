<template>
  <main class="page">
    <header class="page__header">
      <p
        class="page__badge"
        role="status"
      >
        Lenis はこのページでは無効です（ブラウザのネイティブスクロールのみ）。
        <NuxtLink
          class="page__jump"
          to="/parallax"
        >
          Lenis 有効のページへ
        </NuxtLink>
      </p>
      <h1 class="page__title">
        Parallax Thumbnail（Lenis オフ）
      </h1>
      <p class="page__lead">
        コンテンツは <code>/parallax</code> と同一です。
        iOS などでカクつきを比較する場合、このページと通常ページを交互に確認してください。
      </p>
    </header>

    <section class="page__section">
      <h2 class="page__section-title">
        4:3（横長）
      </h2>
      <div class="page__grid page__grid--landscape">
        <ParallaxThumbnail
          v-for="item in parallaxLandscapeItems"
          :key="item.src"
          :src="item.src"
          :alt="item.alt"
          aspect="4-3"
          :caption="item.caption"
        />
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">
        3:4（縦長）
      </h2>
      <div class="page__grid page__grid--portrait">
        <ParallaxThumbnail
          v-for="item in parallaxPortraitItems"
          :key="item.src"
          :src="item.src"
          :alt="item.alt"
          aspect="3-4"
          :caption="item.caption"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {
  parallaxLandscapeItems,
  parallaxPortraitItems,
} from '~/constants/parallaxGalleryItems'
</script>

<style scoped>
.page {
  min-height: 200vh;
  padding: 4rem 2rem 8rem;
  font-family: system-ui, sans-serif;
}

.page__header {
  margin-bottom: 4rem;
}

.page__badge {
  margin: 0 0 1.25rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #0f766e;
  background-color: #f0fdfa;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #115e59;
}

.page__jump {
  display: inline-block;
  margin-left: 0.25rem;
  font-weight: 600;
  color: #0f766e;
  text-underline-offset: 2px;
}

.page__title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.page__lead {
  margin: 0;
  font-size: 1.125rem;
  color: #555;
}

.page__lead code {
  font-size: 0.95em;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  background: #f4f4f5;
}

.page__section {
  margin-bottom: 6rem;
}

.page__section-title {
  margin: 0 0 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.page__grid {
  display: grid;
  gap: 2.5rem;
}

.page__grid--landscape {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.page__grid--portrait {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  max-width: 960px;
}
</style>
