<template>
  <ul
    class="card-list-skeleton"
    aria-hidden="true"
    aria-busy="true"
    aria-label="読み込み中"
  >
    <li
      v-for="i in count"
      :key="i"
      class="card-list-skeleton__item"
    >
      <article class="card-list-skeleton__card">
        <span class="card-list-skeleton__media" />
        <div class="card-list-skeleton__body">
          <span class="card-list-skeleton__line card-list-skeleton__line--title" />
          <span class="card-list-skeleton__line card-list-skeleton__line--desc" />
          <span class="card-list-skeleton__line card-list-skeleton__line--meta" />
        </div>
      </article>
    </li>
  </ul>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** スケルトンカード数 */
    count?: number
  }>(),
  {
    count: 6,
  },
)
</script>

<style scoped>
.card-list-skeleton {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.card-list-skeleton__item {
  min-width: 0;
}

.card-list-skeleton__card {
  overflow: hidden;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #e4e4e7;
}

.card-list-skeleton__media {
  display: block;
  aspect-ratio: 4 / 3;
  background: linear-gradient(
    90deg,
    #e4e4e7 0%,
    #f4f4f5 50%,
    #e4e4e7 100%
  );
  background-size: 200% 100%;
  animation: card-list-skeleton-shimmer 1.4s ease-in-out infinite;
}

.card-list-skeleton__body {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem 1.5rem 1.5rem;
}

.card-list-skeleton__line {
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
  animation: card-list-skeleton-shimmer 1.4s ease-in-out infinite;
}

.card-list-skeleton__line--title {
  width: 70%;
  height: 1rem;
}

.card-list-skeleton__line--desc {
  width: 100%;
}

.card-list-skeleton__line--meta {
  width: 35%;
  height: 0.75rem;
}

@keyframes card-list-skeleton-shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
