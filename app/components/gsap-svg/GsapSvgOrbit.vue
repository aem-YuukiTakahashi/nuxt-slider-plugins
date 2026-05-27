<template>
  <div
    ref="root"
    class="gsap-svg-demo"
  >
    <svg
      class="gsap-svg-demo__svg gsap-svg-orbit"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="160"
        cy="160"
        r="100"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        opacity="0.2"
      />
      <g
        class="js-gsap-svg-orbit-arm"
        transform="translate(160 160)"
      >
        <circle
          class="js-gsap-svg-orbit-planet"
          cx="100"
          cy="0"
          r="14"
          fill="currentColor"
        />
      </g>
      <g
        class="js-gsap-svg-orbit-arm"
        transform="translate(160 160)"
      >
        <circle
          class="js-gsap-svg-orbit-planet js-gsap-svg-orbit-planet--inner"
          cx="55"
          cy="0"
          r="8"
          fill="currentColor"
          opacity="0.7"
        />
      </g>
      <circle
        cx="160"
        cy="160"
        r="18"
        fill="currentColor"
      />
    </svg>
    <p class="gsap-svg-demo__hint">
      親 g の回転で惑星が軌道を描きます（transformOrigin: 0 0）
    </p>
  </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const { gsap } = useGsap()

useGsapContext(root, () => {
  const arms = [...root.value!.querySelectorAll<SVGGElement>('.js-gsap-svg-orbit-arm')]

  gsap.set(arms, { transformOrigin: '0px 0px' })

  gsap.to(arms[0], {
    rotation: 360,
    duration: 8,
    ease: 'none',
    repeat: -1,
  })

  gsap.to(arms[1], {
    rotation: -360,
    duration: 5,
    ease: 'none',
    repeat: -1,
  })

  const planets = [...root.value!.querySelectorAll<HTMLElement>('.js-gsap-svg-orbit-planet')]
  gsap.to(planets, {
    scale: 1.15,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    stagger: 0.3,
    transformOrigin: '50% 50%',
  })
})
</script>

<style scoped lang="scss">
.gsap-svg-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #0984e3;
}

.gsap-svg-demo__svg {
  width: min(100%, 300px);
  height: auto;
}

.gsap-svg-demo__hint {
  margin: 0;
  max-width: 320px;
  font-size: 0.875rem;
  text-align: center;
  color: #666;
}
</style>
