<template>
  <div
    ref="root"
    class="gsap-svg-demo"
  >
    <svg
      class="gsap-svg-demo__svg js-gsap-svg-draw"
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        class="gsap-svg-demo__path js-gsap-svg-path"
        d="M 40 200 Q 120 40 200 120 T 360 80"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        class="gsap-svg-demo__path js-gsap-svg-path"
        d="M 60 240 L 140 160 L 220 220 L 340 100"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.65"
      />
      <circle
        class="gsap-svg-demo__dot js-gsap-svg-dot"
        cx="200"
        cy="120"
        r="10"
        fill="currentColor"
      />
    </svg>
    <button
      type="button"
      class="gsap-svg-demo__replay"
      @click="replay"
    >
      再生
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Timeline } from 'gsap/gsap-core'

const root = ref<HTMLElement | null>(null)
const { gsap } = useGsap()

let timeline: Timeline | null = null

/**
 * パスの全長を取得し、描画用の dash 設定を行う
 */
function preparePath(path: SVGPathElement, gsapInstance: NonNullable<typeof gsap>) {
  const length = path.getTotalLength()
  gsapInstance.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })
  return length
}

function buildTimeline() {
  if (!root.value || !gsap) return null

  const paths = [...root.value.querySelectorAll<SVGPathElement>('.js-gsap-svg-path')]
  const dots = [...root.value.querySelectorAll<SVGCircleElement>('.js-gsap-svg-dot')]

  paths.forEach(path => preparePath(path, gsap))
  gsap.set(dots, { scale: 0, transformOrigin: '50% 50%', opacity: 0 })

  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  paths.forEach((path, index) => {
    tl.to(
      path,
      { strokeDashoffset: 0, duration: 1.4 },
      index * 0.35,
    )
  })

  tl.to(
    dots,
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
    '-=0.3',
  )

  return tl
}

useGsapContext(root, () => {
  timeline = buildTimeline()
})

/** タイムラインを先頭から再生し直す */
function replay() {
  timeline?.restart()
}
</script>

<style scoped lang="scss">
.gsap-svg-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  color: #1a6b4a;
}

.gsap-svg-demo__svg {
  width: min(100%, 420px);
  height: auto;
}

.gsap-svg-demo__replay {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  border: 1px solid #1a6b4a;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: #1a6b4a;
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid #1a6b4a;
    outline-offset: 2px;
  }
}
</style>
