<template>
  <div class="text-list-wrapper">
    <TextListSkeleton
      v-if="loading"
      :count="skeletonCount"
    />
    <ul
      v-else
      class="text-list"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="text-list__item"
      >
        <h3 class="text-list__title">
          {{ item.title }}
        </h3>
        <p
          v-if="item.description"
          class="text-list__description"
        >
          {{ item.description }}
        </p>
        <p
          v-if="item.meta"
          class="text-list__meta"
        >
          {{ item.meta }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * テキストリストの1件分のデータ
 */
export interface TextListItem {
  id: string | number
  title: string
  description?: string
  meta?: string
}

withDefaults(
  defineProps<{
    /** 表示するリスト項目（loading 中は未使用） */
    items: TextListItem[]
    /** 読み込み中ならスケルトンを表示 */
    loading?: boolean
    /** スケルトンの行数 */
    skeletonCount?: number
  }>(),
  {
    loading: false,
    skeletonCount: 5,
  },
)
</script>

<style scoped>
.text-list-wrapper {
  width: 100%;
}

.text-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.text-list__item {
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e4e4e7;
  transition: border-color 0.2s ease;
}

.text-list__item:hover {
  border-color: #d4d4d8;
}

.text-list__title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
}

.text-list__description {
  margin: 0 0 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #3f3f46;
}

.text-list__meta {
  margin: 0;
  font-size: 0.8125rem;
  color: #71717a;
}
</style>
