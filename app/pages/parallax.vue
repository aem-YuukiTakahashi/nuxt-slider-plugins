<template>
  <main class="page">
    <header class="page__header">
      <h1 class="page__title">
        Parallax Thumbnail
      </h1>
      <p class="page__lead">
        4:3（横長）と 3:4（縦長）のサムネイルに、ScrollTrigger 連動のパララックスを適用
      </p>
    </header>

    <section class="page__section">
      <h2 class="page__section-title">
        4:3（横長）
      </h2>
      <div class="page__grid page__grid--landscape">
        <ParallaxThumbnail
          v-for="item in landscapeItems"
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
          v-for="item in portraitItems"
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
const landscapeItems = [
  { src: 'https://picsum.photos/seed/landscape-1/800/600', alt: '横長サンプル 1', caption: '4:3 — Sample 1' },
  { src: 'https://picsum.photos/seed/landscape-2/800/600', alt: '横長サンプル 2', caption: '4:3 — Sample 2' },
  { src: 'https://picsum.photos/seed/landscape-3/800/600', alt: '横長サンプル 3', caption: '4:3 — Sample 3' },
]

const portraitItems = [
  { src: 'https://picsum.photos/seed/portrait-1/600/800', alt: '縦長サンプル 1', caption: '3:4 — Sample 1' },
  { src: 'https://picsum.photos/seed/portrait-2/600/800', alt: '縦長サンプル 2', caption: '3:4 — Sample 2' },
  { src: 'https://picsum.photos/seed/portrait-3/600/800', alt: '縦長サンプル 3', caption: '3:4 — Sample 3' },
]
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
