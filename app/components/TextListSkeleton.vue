<template>
  <ul
    class="text-list-skeleton"
    aria-hidden="true"
    aria-busy="true"
    aria-label="読み込み中"
  >
    <li
      v-for="i in count"
      :key="i"
      class="text-list-skeleton__item"
    >
      <span class="text-list-skeleton__line text-list-skeleton__line--title" />
      <span class="text-list-skeleton__line text-list-skeleton__line--desc" />
      <span class="text-list-skeleton__line text-list-skeleton__line--meta" />
    </li>
  </ul>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** スケルトン行数 */
    count?: number
  }>(),
  {
    count: 5,
  },
)
</script>

<style scoped>
.text-list-skeleton {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.text-list-skeleton__item {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  background: #fafafa;
  border: 1px solid #e4e4e7;
}

.text-list-skeleton__line {
  display: block;
  height: 0.875rem;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #e4e4e7 0%,
    #f4f4f5 50%,
    #e4e4e7 100%
  );
  background-size: 200% 100%;
  animation: text-list-skeleton-shimmer 1.4s ease-in-out infinite;
}

.text-list-skeleton__line--title {
  width: 55%;
  height: 1rem;
}

.text-list-skeleton__line--desc {
  width: 90%;
}

.text-list-skeleton__line--meta {
  width: 30%;
  height: 0.75rem;
}

@keyframes text-list-skeleton-shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
