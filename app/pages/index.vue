<script setup lang="ts">
</script>

<template>
  <section class="section">
    <h2>LINKS</h2>

    <div class="item">
      <nuxtLink to="/swiper" class="item__link">
        SWIPER BANNER
      </nuxtLink>
    </div>

    <div class="item">
      <nuxtLink to="/splide" class="item__link">
        SPLIDE BANNER
      </nuxtLink>
    </div>

    <div class="item">
      <nuxtLink to="/embla" class="item__link">
        EMBLA CAROUSEL
      </nuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  padding: 40px 20px;
}

h2 {
  margin: 0 auto 30px;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
}

.item {
  & + & {
    margin-top: 20px;
  }

  &__link {
    display: block;
    width: 300px;
    background-color: #000;
    padding: 24px 16px;
    color: #fff;
    text-align: center;
    line-height: 1;
    margin: 0 auto;
  }
}
</style>
