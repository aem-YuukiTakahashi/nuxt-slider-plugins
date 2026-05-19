/**
 * @splidejs/vue-splide は package.json の exports 経由だと型が解決されないため、
 * アプリ側でモジュールを宣言する。
 */
declare module '@splidejs/vue-splide' {
  import type { Plugin } from 'vue';

  const VueSplide: Plugin;

  export default VueSplide;
}

declare module '@splidejs/vue-splide/css';
