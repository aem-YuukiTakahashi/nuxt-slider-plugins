<script setup lang="ts">
</script>

<template>
  <section class="section">
    <h2>SWIPER BANNER</h2>

    <div class="banner">
      <SwiperBanner />
    </div>

    <div class="item">
      <nuxtLink to="/splide" class="item__link">
        SPLIDE BANNER
      </nuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  padding: 40px 0px;
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

.banner {
  margin: 0 auto 60px;
}

</style>
