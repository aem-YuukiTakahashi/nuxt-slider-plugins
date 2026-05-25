<template>
  <div class="card-list-wrapper">
    <CardListSkeleton
      v-if="loading"
      :count="skeletonCount"
    />
    <ul
      v-else
      class="card-list"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="card-list__item"
      >
        <article class="card-list__card">
          <ParallaxThumbnail
            :src="item.src"
            :alt="item.alt"
            aspect="4-3"
          />
          <div class="card-list__body">
            <h3 class="card-list__title">
              {{ item.title }}
            </h3>
            <p
              v-if="item.description"
              class="card-list__description"
            >
              {{ item.description }}
            </p>
            <p
              v-if="item.meta"
              class="card-list__meta"
            >
              {{ item.meta }}
            </p>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * カードリストの1件分のデータ
 */
export interface CardListItem {
  id: string | number
  src: string
  alt?: string
  title: string
  description?: string
  meta?: string
}

withDefaults(
  defineProps<{
    /** 表示するカード項目（loading 中は未使用） */
    items: CardListItem[]
    /** 読み込み中ならスケルトンを表示 */
    loading?: boolean
    /** スケルトンのカード数 */
    skeletonCount?: number
  }>(),
  {
    loading: false,
    skeletonCount: 6,
  },
)
</script>

<style scoped>
.card-list-wrapper {
  width: 100%;
}

.card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.card-list__item {
  min-width: 0;
}

.card-list__card {
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e4e4e7;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card-list__card:hover {
  border-color: #d4d4d8;
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
}

/* カード内ではキャプションを使わず、本文エリアにテキストをまとめる */
.card-list__card :deep(.parallax-thumbnail__frame) {
  border-radius: 0;
}

/*
 * ホバー拡大は inner に適用（img は GSAP が transform 制御するため）
 */
.card-list__card :deep(.parallax-thumbnail__inner) {
  transform: scale(1);
  transform-origin: center center;
  transition: transform 3s ease-out;
}

.card-list__card:hover :deep(.parallax-thumbnail__inner) {
  transform: scale(1.1);
}

.card-list__body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.card-list__title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
}

.card-list__description {
  margin: 0 0 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #3f3f46;
}

.card-list__meta {
  margin: 0;
  font-size: 0.8125rem;
  color: #71717a;
}
</style>
