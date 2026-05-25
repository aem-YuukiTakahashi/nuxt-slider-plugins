<script setup lang="ts">
import { withoutBase } from 'ufo'
import { siteNavLinks } from '~/constants/siteNav'

const route = useRoute()
const config = useRuntimeConfig()

/** baseURL 付きでも正しく現在ページを判定する */
const normalizedPath = computed(() =>
  withoutBase(route.path, config.app.baseURL) || '/',
)

/**
 * ナビリンクが現在のページかどうか
 */
function isNavActive(to: string): boolean {
  return normalizedPath.value === to
}
</script>

<template>
  <footer class="app-footer">
    <nav
      class="app-footer__nav"
      aria-label="デモページ一覧"
    >
      <ul class="app-footer__list">
        <li
          v-for="link in siteNavLinks"
          :key="link.to"
          class="app-footer__item"
        >
          <NuxtLink
            :to="link.to"
            class="app-footer__link"
            :class="{ 'app-footer__link--active': isNavActive(link.to) }"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <p class="app-footer__copy">
      &copy; test site
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  width: 100%;
  margin-top: auto;
  padding: 32px 20px 40px;
  background-color: gray;
  color: #fff;

  &__nav {
    max-width: 1200px;
    margin: 0 auto 24px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__link {
    display: inline-block;
    padding: 12px 16px;
    background-color: #000;
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    line-height: 1.2;
    text-align: center;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.85;
    }

    &--active {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
  }

  &__copy {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
  }
}
</style>
