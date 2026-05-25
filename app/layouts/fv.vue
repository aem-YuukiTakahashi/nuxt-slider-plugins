<!--
  FVスクロール演出用レイアウト（固定ヘッダーなし・全画面前提）
-->
<template>
  <div class="layout-fv">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout-fv {
  min-height: 100vh;
  background-color: #fff;
}
</style>
