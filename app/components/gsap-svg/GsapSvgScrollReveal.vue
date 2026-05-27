<template>
  <div
    ref="root"
    class="gsap-svg-scroll"
  >
    <section class="gsap-svg-scroll__spacer gsap-svg-scroll__spacer--top">
      <p>下へスクロール</p>
    </section>

    <section class="gsap-svg-scroll__stage">
      <svg
        class="gsap-svg-scroll__svg"
        viewBox="0 0 480 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          class="gsap-svg-scroll__path js-gsap-svg-scroll-path"
          d="M 20 150 C 80 30 160 30 220 100 S 380 30 460 120"
          fill="none"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          class="gsap-svg-scroll__path js-gsap-svg-scroll-path"
          d="M 20 170 L 120 170 L 200 90 L 280 170 L 460 170"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.5"
        />
      </svg>
      <p class="gsap-svg-scroll__label">
        スクロール量に連動して線が描かれます
      </p>
    </section>

    <section class="gsap-svg-scroll__spacer gsap-svg-scroll__spacer--bottom" />
  </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const { gsap, ScrollTrigger } = useGsap()

useGsapContext(root, () => {
  if (!ScrollTrigger) return

  const paths = [...root.value!.querySelectorAll<SVGPathElement>('.js-gsap-svg-scroll-path')]

  paths.forEach((path) => {
    const length = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 0.8,
      },
    })
  })
})
</script>

<style scoped lang="scss">
.gsap-svg-scroll {
  color: #c45c26;
}

.gsap-svg-scroll__spacer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 0.9375rem;
  color: #888;

  p {
    margin: 0;
  }
}

.gsap-svg-scroll__spacer--bottom {
  min-height: 60vh;
}

.gsap-svg-scroll__stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 4rem 1.5rem;
  min-height: 70vh;
}

.gsap-svg-scroll__svg {
  width: min(100%, 520px);
  height: auto;
}

.gsap-svg-scroll__label {
  margin: 0;
  font-size: 0.9375rem;
  color: #666;
}
</style>
