<template>
  <main class="page">
    <header class="page__header">
      <h1 class="page__title">
        Card List
      </h1>
      <p class="page__lead">
        読み込み中はスケルトンを表示。取得後は 4:3 の ParallaxThumbnail 付きカードリストへ切り替え
      </p>
    </header>

    <CardList
      :items="items"
      :loading="loading"
      :skeleton-count="6"
    />
  </main>
</template>

<script setup lang="ts">
import type { CardListItem } from '~/components/CardList.vue'

const loading = ref(true)
const items = ref<CardListItem[]>([])

/**
 * カード一覧データの取得を模擬する（実装時は API 呼び出し等に差し替え）
 */
async function fetchCardItems(): Promise<CardListItem[]> {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return [
    {
      id: 1,
      src: 'https://picsum.photos/seed/card-1/800/600',
      alt: '山の風景',
      title: 'Mountain View',
      description: '4:3 のパララックスサムネイル付きカード。スクロールで画像がゆっくり動く。',
      meta: 'Nature · 2026-05-25',
    },
    {
      id: 2,
      src: 'https://picsum.photos/seed/card-2/800/600',
      alt: '海岸の風景',
      title: 'Coastal Line',
      description: 'カード枠は overflow hidden。画像は ParallaxThumbnail で表示。',
      meta: 'Travel · 2026-05-24',
    },
    {
      id: 3,
      src: 'https://picsum.photos/seed/card-3/800/600',
      alt: '都市の風景',
      title: 'Urban Frame',
      description: 'スケルトンは 4:3 のメディア領域とテキスト行で構成。',
      meta: 'City · 2026-05-24',
    },
    {
      id: 4,
      src: 'https://picsum.photos/seed/card-4/800/600',
      alt: '森の風景',
      title: 'Forest Path',
      description: 'ホバー時はカード全体にボーダーとシャドウの transition を適用。',
      meta: 'Nature · 2026-05-23',
    },
    {
      id: 5,
      src: 'https://picsum.photos/seed/card-5/800/600',
      alt: '砂漠の風景',
      title: 'Desert Light',
      description: 'GSAP ScrollTrigger は各 ParallaxThumbnail 内で個別に管理。',
      meta: 'Landscape · 2026-05-23',
    },
    {
      id: 6,
      src: 'https://picsum.photos/seed/card-6/800/600',
      alt: '湖の風景',
      title: 'Lake Mirror',
      description: '実装時は fetch 結果を CardList の items に渡すだけで表示できる。',
      meta: 'Water · 2026-05-22',
    },
  ]
}

onMounted(async () => {
  try {
    items.value = await fetchCardItems()
  }
  finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 8rem;
  font-family: system-ui, sans-serif;
}

.page__header {
  margin-bottom: 3rem;
}

.page__title {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.page__lead {
  margin: 0;
  font-size: 1.125rem;
  color: #555;
  line-height: 1.6;
}
</style>
