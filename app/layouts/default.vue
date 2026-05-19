<script setup lang="ts">
</script>

<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <h1>SAMPLE SITE</h1>
      </header>
      <div class="container">
        <slot />
      </div>
      <footer>
        <p>
          &copy; test site
        </p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  height: 60px;
  background-color: #000;
  color: #fff;

  h1 {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  margin-top: 60px;
}

footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:  auto;
  padding: 0;
  height: 100px;
  background-color: gray;
  color: #fff;


  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
  }
}
</style>
