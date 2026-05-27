<template>
  <div
    ref="root"
    class="shape-morph-scroll"
  >
    <div class="shape-morph-scroll__layout">
      <div class="shape-morph-scroll__stage">
        <svg
          class="shape-morph-scroll__svg"
          viewBox="0 0 320 320"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            ref="morphPathRef"
            class="shape-morph-scroll__path js-gsap-svg-shape-morph"
            :d="gsapSvgMorphShapes[0].d"
            :fill="activeColor"
          />
        </svg>
        <p class="shape-morph-scroll__shape-label">
          {{ activeLabel }}
        </p>
      </div>

      <div class="shape-morph-scroll__sections">
        <section
          v-for="(shape, index) in gsapSvgMorphShapes"
          :key="shape.id"
          :ref="(el) => setSectionRef(el, index)"
          class="shape-morph-scroll__section"
          :class="`shape-morph-scroll__section--${shape.id}`"
        >
          <span class="shape-morph-scroll__section-index">0{{ index + 1 }}</span>
          <h2 class="shape-morph-scroll__section-title">
            {{ shape.label }}
          </h2>
          <p class="shape-morph-scroll__section-desc">
            {{ shape.description }}
          </p>
          <p class="shape-morph-scroll__section-hint">
            このブロックが画面中央付近に入ると、左の SVG がモーフします
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { gsap as GsapCore } from 'gsap'
import { gsapSvgMorphShapes } from '~/constants/gsapSvgShapePaths'

const root = ref<HTMLElement | null>(null)
const morphPathRef = ref<SVGPathElement | null>(null)
const sectionRefs = ref<(HTMLElement | null)[]>([])

const activeLabel = ref(gsapSvgMorphShapes[0].label)
const activeColor = ref(gsapSvgMorphShapes[0].color)

const { gsap, ScrollTrigger } = useGsap()

let morphTween: ReturnType<GsapCore['to']> | null = null

/**
 * セクション要素の ref をインデックス付きで保持する
 */
function setSectionRef(el: Element | ComponentPublicInstance | null, index: number) {
  sectionRefs.value[index] = el instanceof HTMLElement ? el : null
}

/**
 * 指定シェイプの d 属性へモーフし、ラベル・色を同期する
 */
function morphToShape(shapeIndex: number) {
  const shape = gsapSvgMorphShapes[shapeIndex]
  const path = morphPathRef.value
  if (!path || !gsap || !shape) return

  activeLabel.value = shape.label
  activeColor.value = shape.color

  morphTween?.kill()
  morphTween = gsap.to(path, {
    attr: { d: shape.d },
    duration: 0.85,
    ease: 'power2.inOut',
    overwrite: 'auto',
  })
}

useGsapContext(root, () => {
  if (!ScrollTrigger) return

  gsapSvgMorphShapes.forEach((shape, index) => {
    const section = sectionRefs.value[index]
    if (!section) return

    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => morphToShape(index),
      onEnterBack: () => morphToShape(index),
    })
  })

  ScrollTrigger.refresh()
})
</script>

<style scoped lang="scss">
.shape-morph-scroll {
  --shape-morph-header-offset: 80px;
}

.shape-morph-scroll__layout {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(280px, 1.1fr);
  gap: 2rem;
  max-width: 1080px;
  margin: 0 auto;
}

.shape-morph-scroll__stage {
  position: sticky;
  top: var(--shape-morph-header-offset);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: calc(100vh - var(--shape-morph-header-offset) - 2rem);
  padding: 1rem 0;
}

.shape-morph-scroll__svg {
  width: min(100%, 300px);
  height: auto;
  filter: drop-shadow(0 12px 28px rgb(0 0 0 / 10%));
}

.shape-morph-scroll__path {
  transition: fill 0.5s ease;
}

.shape-morph-scroll__shape-label {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.shape-morph-scroll__sections {
  display: flex;
  flex-direction: column;
}

.shape-morph-scroll__section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 85vh;
  padding: 3rem 0 3rem 1rem;
  border-bottom: 1px solid #ececec;

  &:last-child {
    border-bottom: none;
    min-height: 70vh;
    padding-bottom: 6rem;
  }
}

.shape-morph-scroll__section-index {
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #999;
}

.shape-morph-scroll__section-title {
  margin: 0 0 0.75rem;
  font-size: 2.25rem;
  font-weight: 700;
}

.shape-morph-scroll__section-desc {
  margin: 0 0 1rem;
  font-size: 1.0625rem;
  color: #444;
}

.shape-morph-scroll__section-hint {
  margin: 0;
  max-width: 28rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #888;
}

.shape-morph-scroll__section--circle .shape-morph-scroll__section-title {
  color: #5b3ea8;
}

.shape-morph-scroll__section--square .shape-morph-scroll__section-title {
  color: #1a6b4a;
}

.shape-morph-scroll__section--triangle .shape-morph-scroll__section-title {
  color: #c45c26;
}

.shape-morph-scroll__section--star .shape-morph-scroll__section-title {
  color: #0984e3;
}

@media (width <= 768px) {
  .shape-morph-scroll__layout {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .shape-morph-scroll__stage {
    position: relative;
    top: auto;
    height: auto;
    min-height: 42vh;
    padding: 2rem 0 1rem;
  }

  .shape-morph-scroll__section {
    min-height: 72vh;
    padding-left: 0;
  }
}
</style>
