<template>
  <div
    ref="root"
    class="gsap-svg-demo"
  >
    <svg
      class="gsap-svg-demo__svg gsap-svg-mask"
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="マスクで露出するグラデーション図形"
    >
      <defs>
        <linearGradient
          id="gsap-svg-mask-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stop-color="#ff6b6b"
          />
          <stop
            offset="50%"
            stop-color="#feca57"
          />
          <stop
            offset="100%"
            stop-color="#48dbfb"
          />
        </linearGradient>
        <mask id="gsap-svg-circle-mask">
          <rect
            width="400"
            height="280"
            fill="black"
          />
          <circle
            class="js-gsap-svg-mask-circle"
            cx="200"
            cy="140"
            r="0"
            fill="white"
          />
        </mask>
      </defs>
      <g mask="url(#gsap-svg-circle-mask)">
        <rect
          width="400"
          height="280"
          fill="url(#gsap-svg-mask-gradient)"
        />
        <text
          x="200"
          y="150"
          text-anchor="middle"
          fill="#1a1a2e"
          font-size="28"
          font-weight="700"
          font-family="system-ui, sans-serif"
        >
          REVEAL
        </text>
      </g>
      <circle
        class="gsap-svg-mask__ring js-gsap-svg-mask-ring"
        cx="200"
        cy="140"
        r="120"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-dasharray="8 6"
        opacity="0.35"
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

function buildTimeline() {
  if (!root.value || !gsap) return null

  const maskCircle = root.value.querySelector<SVGCircleElement>('.js-gsap-svg-mask-circle')
  const ring = root.value.querySelector<SVGCircleElement>('.js-gsap-svg-mask-ring')

  if (!maskCircle || !ring) return null

  gsap.set(maskCircle, { attr: { r: 0 } })
  gsap.set(ring, { scale: 0.6, transformOrigin: '50% 50%', opacity: 0 })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(maskCircle, { attr: { r: 200 }, duration: 1.6 })
    .to(
      ring,
      { scale: 1, opacity: 0.35, duration: 1.2, ease: 'power2.out' },
      0.4,
    )
    .to(ring, { rotation: 90, duration: 2, ease: 'none' }, 0)

  return tl
}

useGsapContext(root, () => {
  timeline = buildTimeline()
})

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
  color: #2d3436;
}

.gsap-svg-demo__svg {
  width: min(100%, 420px);
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgb(0 0 0 / 8%);
}

.gsap-svg-demo__replay {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  border: 1px solid #2d3436;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: #2d3436;
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid #2d3436;
    outline-offset: 2px;
  }
}
</style>
