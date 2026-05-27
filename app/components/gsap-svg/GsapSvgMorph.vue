<template>
  <div
    ref="root"
    class="gsap-svg-demo"
  >
    <svg
      class="gsap-svg-demo__svg"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        ref="morphPath"
        class="gsap-svg-demo__shape js-gsap-svg-morph"
        :d="paths[0]"
        fill="currentColor"
      />
    </svg>
    <p class="gsap-svg-demo__hint">
      外周 ↔ 内周の円を yoyo でループ
    </p>
  </div>
</template>

<script setup lang="ts">
/** 同一ベジェ構造の円形パス（外側 ↔ 内側でスムーズにモーフ） */
const paths = [
  'M160,40 C230,40 290,100 290,160 C290,230 230,290 160,290 C90,290 30,230 30,160 C30,90 90,40 160,40 Z',
  'M160,80 C210,80 260,120 260,160 C260,210 210,250 160,250 C110,250 60,210 60,160 C60,110 110,80 160,80 Z',
]

const root = ref<HTMLElement | null>(null)
const morphPath = ref<SVGPathElement | null>(null)
const { gsap } = useGsap()

useGsapContext(root, () => {
  const path = morphPath.value
  if (!path || !gsap) return

  gsap.to(path, {
    attr: { d: paths[1] },
    duration: 2.2,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
  })
})
</script>

<style scoped lang="scss">
.gsap-svg-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #5b3ea8;
}

.gsap-svg-demo__svg {
  width: min(100%, 280px);
  height: auto;
}

.gsap-svg-demo__shape {
  opacity: 0.92;
}

.gsap-svg-demo__hint {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
}
</style>
