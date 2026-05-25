<template>
  <main class="page">
    <header class="page__header">
      <h1 class="page__title">
        Text List
      </h1>
      <p class="page__lead">
        読み込み中はスケルトンリストを表示し、取得後にテキストリストへ切り替え
      </p>
    </header>

    <TextList
      :items="items"
      :loading="loading"
      :skeleton-count="6"
    />
  </main>
</template>

<script setup lang="ts">
import type { TextListItem } from '~/components/TextList.vue'

const loading = ref(true)
const items = ref<TextListItem[]>([])

/**
 * 一覧データの取得を模擬する（実装時は API 呼び出し等に差し替え）
 */
async function fetchListItems(): Promise<TextListItem[]> {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return [
    {
      id: 1,
      title: 'Nuxt 4 プロジェクトのセットアップ',
      description: 'minimal テンプレートで環境構築し、GSAP と ScrollTrigger をプラグイン登録した。',
      meta: '2026-05-25',
    },
    {
      id: 2,
      title: 'パララックスサムネイルコンポーネント',
      description: '4:3 と 3:4 の比率に対応。画像の height と top で枠内を常に覆う。',
      meta: '2026-05-25',
    },
    {
      id: 3,
      title: 'テキストリストとスケルトン',
      description: 'loading 中は TextListSkeleton を表示し、データ取得後にリストへ切り替える。',
      meta: '2026-05-25',
    },
    {
      id: 4,
      title: 'アニメーションの使い分け',
      description: 'ホバーは CSS transition、スクロール連動は GSAP + ScrollTrigger を利用する。',
      meta: '2026-05-24',
    },
    {
      id: 5,
      title: 'gsap.context() でスコープ管理',
      description: 'コンポーネント単位で context を張り、unmount 時に revert してクリーンアップする。',
      meta: '2026-05-24',
    },
    {
      id: 6,
      title: '次のステップ',
      description: '実 API 接続時は composable に fetch 処理を切り出すと再利用しやすい。',
      meta: '2026-05-23',
    },
  ]
}

onMounted(async () => {
  try {
    items.value = await fetchListItems()
  }
  finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page {
  max-width: 720px;
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
