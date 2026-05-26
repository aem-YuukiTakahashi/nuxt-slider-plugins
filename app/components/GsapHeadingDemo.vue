<template>
  <article
    ref="root"
    class="gsap-heading-demo"
  >
    <p class="gsap-heading-demo__label">
      {{ label }}
    </p>

    <p
      v-if="variant === 'line-stagger'"
      class="gsap-heading-demo__note"
    >
      <strong>13 — フェードイン</strong>：各行が薄い状態から、下からふわっと現れます（行全体が見える）。
    </p>
    <p
      v-else-if="variant === 'line-mask'"
      class="gsap-heading-demo__note"
    >
      <strong>14 — マスクスライド</strong>：各行が横長の枠に収まり、下からスッと押し上げられるように現れます（切り抜き・シャッター感）。<kbd>Enter</kbd> で改行、「適用して再生」で反映。
    </p>
    <p
      v-else-if="variant === 'glitch-rich'"
      class="gsap-heading-demo__note"
    >
      <strong>25 — DOM グリッチ</strong>：Canvas 不使用。GSAP で横帯の流れ（flowLine）・帯の水平ずれ（shiftLine）・RGB ずれ（shiftRGB）・矩形の飛び（scat）を再現（<a href="https://codepen.io/tksiiii/pen/xdQgJX" target="_blank" rel="noopener noreferrer">CodePen 参考</a> の近似）。
    </p>

    <!-- glitch-rich: DOM レイヤー（Canvas なし） -->
    <div
      v-if="usesGlitchStack"
      ref="glitchWrapRef"
      class="glitch-rich"
    >
      <h2
        ref="headingRef"
        class="gsap-heading-demo__title glitch-rich__heading js-gsap-heading"
      >
        {{ headingText }}
      </h2>

      <div
        class="glitch-rich__flow js-gsap-glitch-flow js-gsap-glitch-layer"
        aria-hidden="true"
      >
        <span class="gsap-heading-demo__title glitch-rich__text glitch-rich__text--r js-gsap-glitch-rgb js-gsap-glitch-copy">{{ headingText }}</span>
        <span class="gsap-heading-demo__title glitch-rich__text js-gsap-glitch-copy">{{ headingText }}</span>
        <span class="gsap-heading-demo__title glitch-rich__text glitch-rich__text--c js-gsap-glitch-rgb js-gsap-glitch-copy">{{ headingText }}</span>
      </div>

      <div
        v-for="i in glitchRichSliceIndexes"
        :key="`slice-${i}`"
        class="glitch-rich__slice js-gsap-glitch-slice js-gsap-glitch-layer"
        aria-hidden="true"
      >
        <span class="gsap-heading-demo__title glitch-rich__text glitch-rich__slice-inner js-gsap-glitch-slice-inner js-gsap-glitch-copy">{{ headingText }}</span>
      </div>

      <span
        class="gsap-heading-demo__title glitch-rich__text glitch-rich__text--r glitch-rich__rgb js-gsap-glitch-rgb js-gsap-glitch-layer js-gsap-glitch-copy"
        aria-hidden="true"
      >{{ headingText }}</span>
      <span
        class="gsap-heading-demo__title glitch-rich__text glitch-rich__text--c glitch-rich__rgb js-gsap-glitch-rgb js-gsap-glitch-layer js-gsap-glitch-copy"
        aria-hidden="true"
      >{{ headingText }}</span>

      <div
        v-for="i in glitchRichScatIndexes"
        :key="`scat-${i}`"
        class="glitch-rich__scat js-gsap-glitch-scat js-gsap-glitch-layer"
        aria-hidden="true"
      >
        <span class="gsap-heading-demo__title glitch-rich__text glitch-rich__scat-inner js-gsap-glitch-scat-inner js-gsap-glitch-copy">{{ headingText }}</span>
      </div>
    </div>

    <!-- accent-bar -->
    <div
      v-else-if="usesAccent"
      class="gsap-heading-demo__accent-row"
    >
      <span
        ref="accentRef"
        class="gsap-heading-demo__accent js-gsap-heading-accent"
        aria-hidden="true"
      />
      <h2
        ref="headingRef"
        class="gsap-heading-demo__title js-gsap-heading"
      >
        {{ headingText }}
      </h2>
    </div>

    <!-- bracket-reveal -->
    <div
      v-else-if="usesBrackets"
      class="gsap-heading-demo__bracket-row"
    >
      <span
        ref="bracketLeftRef"
        class="gsap-heading-demo__bracket js-gsap-heading-bracket"
        aria-hidden="true"
      >[</span>
      <h2
        ref="headingRef"
        class="gsap-heading-demo__title js-gsap-heading"
      >
        {{ headingText }}
      </h2>
      <span
        ref="bracketRightRef"
        class="gsap-heading-demo__bracket js-gsap-heading-bracket"
        aria-hidden="true"
      >]</span>
    </div>

    <!-- clip-reveal / clip-horizontal -->
    <div
      v-else-if="usesClip"
      class="gsap-heading-demo__clip"
    >
      <h2
        ref="headingRef"
        class="gsap-heading-demo__title js-gsap-heading"
        :class="headingTitleClasses"
      >
        <template v-if="usesMultilineTitle">
          <template
            v-for="(line, index) in headingLines"
            :key="index"
          >
            {{ line }}<br v-if="index < headingLines.length - 1">
          </template>
        </template>
        <template v-else>
          {{ headingText }}
        </template>
      </h2>
    </div>

    <!-- 通常見出し -->
    <h2
      v-else
      ref="headingRef"
      class="gsap-heading-demo__title js-gsap-heading"
      :class="headingTitleClasses"
    >
      <template v-if="usesMultilineTitle">
        <template
          v-for="(line, index) in headingLines"
          :key="index"
        >
          {{ line }}<br v-if="index < headingLines.length - 1">
        </template>
      </template>
      <template v-else>
        {{ headingText }}
      </template>
    </h2>

    <span
      v-if="usesUnderline"
      ref="underlineRef"
      class="gsap-heading-demo__underline js-gsap-heading-underline"
      aria-hidden="true"
    />

    <p class="gsap-heading-demo__description">
      {{ description }}
    </p>

    <fieldset class="gsap-heading-demo__params">
      <legend class="gsap-heading-demo__params-legend">
        パラメーター
      </legend>

      <div class="gsap-heading-demo__param">
        <label
          class="gsap-heading-demo__param-label"
          :for="`${variant}-heading-text`"
        >
          見出しテキスト
        </label>
        <textarea
          v-if="usesMultilineTitle"
          :id="`${variant}-heading-text`"
          v-model="headingText"
          class="gsap-heading-demo__param-textarea"
          rows="4"
          spellcheck="false"
          placeholder="1行目&#10;2行目&#10;3行目"
        />
        <input
          v-else
          :id="`${variant}-heading-text`"
          v-model="headingText"
          class="gsap-heading-demo__param-text"
          type="text"
          spellcheck="false"
        >
        <p class="gsap-heading-demo__param-hint">
          「適用して再生」で見出しに反映されます
        </p>
      </div>

      <div
        v-for="field in visibleNumberFields"
        :key="field.key"
        class="gsap-heading-demo__param"
      >
        <label
          class="gsap-heading-demo__param-label"
          :for="`${variant}-${field.key}`"
        >
          <span>{{ field.label }}</span>
          <span class="gsap-heading-demo__param-value">{{ formatParamValue(field.key) }}</span>
        </label>
        <input
          :id="`${variant}-${field.key}`"
          v-model.number="params[field.key]"
          class="gsap-heading-demo__param-range"
          type="range"
          :min="field.min"
          :max="field.max"
          :step="field.step"
        >
      </div>

      <div
        v-if="showsEase"
        class="gsap-heading-demo__param"
      >
        <label
          class="gsap-heading-demo__param-label"
          :for="`${variant}-ease`"
        >
          Ease
        </label>
        <select
          :id="`${variant}-ease`"
          v-model="params.ease"
          class="gsap-heading-demo__param-select"
        >
          <option
            v-for="opt in headingAnimationEaseOptions"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>

      <div class="gsap-heading-demo__param-actions">
        <button
          type="button"
          class="gsap-heading-demo__replay"
          @click="applyAndReplay"
        >
          適用して再生
        </button>
        <button
          type="button"
          class="gsap-heading-demo__reset"
          @click="resetParams"
        >
          リセット
        </button>
      </div>
    </fieldset>
  </article>
</template>

<script setup lang="ts">
import {
  GLITCH_RICH_SCAT_COUNT,
  GLITCH_RICH_SLICE_COUNT,
} from '~/composables/headingAnimationGlitch'
import {
  headingVariantsMultiline,
  headingVariantsWithAccent,
  headingVariantsWithBrackets,
  headingVariantsWithClip,
  headingVariantsWithGlitchStack,
  headingVariantsWithUnderline,
  type HeadingAnimationVariant,
} from '~/constants/headingAnimationDemos'
import { createGsapHeadingAnimation } from '~/composables/useGsapHeadingAnimation'
import {
  defaultHeadingAnimationParams,
  getVisibleParamKeys,
  headingAnimationEaseOptions,
  headingAnimationParamFields,
  type HeadingAnimationParamKey,
} from '~/constants/headingAnimationParams'
import { setHeadingTextWithLineBreaks } from '~/utils/headingTextLines'

const props = defineProps<{
  variant: HeadingAnimationVariant
  label: string
  title: string
  description: string
}>()

const root = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const underlineRef = ref<HTMLElement | null>(null)
const accentRef = ref<HTMLElement | null>(null)
const bracketLeftRef = ref<HTMLElement | null>(null)
const bracketRightRef = ref<HTMLElement | null>(null)
const glitchWrapRef = ref<HTMLElement | null>(null)

const glitchRichSliceIndexes = Array.from({ length: GLITCH_RICH_SLICE_COUNT }, (_, i) => i)
const glitchRichScatIndexes = Array.from({ length: GLITCH_RICH_SCAT_COUNT }, (_, i) => i)

const { gsap, ScrollTrigger } = useGsap()

const usesClip = computed(() =>
  (headingVariantsWithClip as readonly string[]).includes(props.variant),
)
const usesUnderline = computed(() =>
  (headingVariantsWithUnderline as readonly string[]).includes(props.variant),
)
const usesAccent = computed(() =>
  (headingVariantsWithAccent as readonly string[]).includes(props.variant),
)
const usesBrackets = computed(() =>
  (headingVariantsWithBrackets as readonly string[]).includes(props.variant),
)
const usesGlitchStack = computed(() =>
  (headingVariantsWithGlitchStack as readonly string[]).includes(props.variant),
)

const usesMultilineTitle = computed(() =>
  (headingVariantsMultiline as readonly string[]).includes(props.variant),
)

const headingTitleClasses = computed(() => ({
  'gsap-heading-demo__title--multiline': usesMultilineTitle.value,
}))

/** 見出しの初期テキスト */
function getDefaultHeadingText(): string {
  if (props.variant === 'line-stagger') {
    return 'Fade Line One\nFade Line Two\nFade Line Three'
  }
  if (props.variant === 'line-mask') {
    return 'Mask Line One\nMask Line Two\nMask Line Three'
  }
  return props.title
}

const headingText = ref(getDefaultHeadingText())

/** 改行で分割した行（表示・SplitText 用） */
const headingLines = computed(() => headingText.value.split('\n'))

/** スライダー表示対象（ease 以外） */
const visibleNumberFields = computed(() => {
  const keys = getVisibleParamKeys(props.variant).filter((k): k is
    | 'duration'
    | 'delay'
    | 'stagger'
    | 'distance'
    | 'blur'
    | 'scrambleSpeed'
    | 'trackingEm' => {
    return k !== 'ease'
  })
  return headingAnimationParamFields.filter(f => keys.includes(f.key))
})

const showsEase = computed(() =>
  getVisibleParamKeys(props.variant).includes('ease'),
)

const params = reactive({ ...defaultHeadingAnimationParams })

let animationHandle: ReturnType<typeof createGsapHeadingAnimation> | null = null

function formatParamValue(key: HeadingAnimationParamKey): string {
  const value = params[key]
  if (typeof value === 'string') return value
  const field = headingAnimationParamFields.find(f => f.key === key)
  if (typeof value !== 'number') return String(value)
  const unit = field?.unit ?? ''
  return unit ? `${value}${unit}` : String(value)
}

function getParamsSnapshot() {
  return { ...params }
}

useGsapContext(root, () => {
  if (!root.value || !headingRef.value) return

  animationHandle = createGsapHeadingAnimation(
    gsap,
    ScrollTrigger,
    {
      root: root.value,
      heading: headingRef.value,
      clipInner: usesClip.value ? headingRef.value : null,
      underline: underlineRef.value,
      accent: accentRef.value,
      bracketLeft: bracketLeftRef.value,
      bracketRight: bracketRightRef.value,
      glitchWrap: glitchWrapRef.value,
    },
    {
      variant: props.variant,
      scrollTrigger: true,
      params: getParamsSnapshot(),
    },
  )
})

onUnmounted(() => {
  animationHandle?.cleanup()
})

function syncHeadingToDom() {
  if (!headingRef.value) return
  if (usesMultilineTitle.value) {
    setHeadingTextWithLineBreaks(headingRef.value, headingText.value)
    return
  }
  headingRef.value.textContent = headingText.value
  if (usesGlitchStack.value && glitchWrapRef.value) {
    glitchWrapRef.value.querySelectorAll('.js-gsap-glitch-copy').forEach((el) => {
      el.textContent = headingText.value
    })
  }
}

function applyAndReplay() {
  const text = headingText.value.trim()
  if (!text) return
  headingText.value = text
  syncHeadingToDom()
  animationHandle?.replay(getParamsSnapshot(), text)
}

function resetParams() {
  Object.assign(params, defaultHeadingAnimationParams)
  headingText.value = getDefaultHeadingText()
  applyAndReplay()
}
</script>

<style scoped>
.gsap-heading-demo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 70vh;
  padding: 3rem 0;
  border-bottom: 1px solid #e4e4e7;
}

.gsap-heading-demo__label {
  margin: 0 0 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #71717a;
}

.gsap-heading-demo__note {
  margin: 0 0 1.25rem;
  max-width: 36rem;
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: #3f3f46;
  background: #f4f4f5;
  border-radius: 6px;
  border-left: 3px solid #18181b;
}

.gsap-heading-demo__note strong {
  font-weight: 600;
}

.gsap-heading-demo__note kbd {
  padding: 0.1em 0.35em;
  font-family: inherit;
  font-size: 0.9em;
  background: #fff;
  border: 1px solid #d4d4d8;
  border-radius: 4px;
}

.gsap-heading-demo__clip {
  overflow: hidden;
}

.gsap-heading-demo__accent-row {
  display: flex;
  align-items: stretch;
  gap: 1rem;
}

.gsap-heading-demo__accent {
  flex-shrink: 0;
  width: 4px;
  align-self: stretch;
  min-height: 2.5rem;
  background: #18181b;
  transform-origin: top center;
}

.gsap-heading-demo__bracket-row {
  display: flex;
  align-items: baseline;
  gap: 0.35em;
}

.gsap-heading-demo__bracket {
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 300;
  line-height: 1;
  color: #a1a1aa;
}

.gsap-heading-demo__title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  color: #18181b;
  perspective: 500px;
}

.gsap-heading-demo__title--multiline {
  white-space: pre-line;
}

/* #26 — DOM グリッチ（Canvas なし） */
.glitch-rich {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.glitch-rich__heading {
  position: relative;
  z-index: 3;
  margin: 0;
}

.glitch-rich__text {
  display: block;
  margin: 0;
  color: #18181b;
  white-space: pre-wrap;
}

.glitch-rich__flow .glitch-rich__text {
  position: absolute;
  inset: 0;
}

.glitch-rich__text--r {
  color: #ff2a6d;
}

.glitch-rich__text--c {
  color: #05d9e8;
}

.glitch-rich__flow,
.glitch-rich__slice,
.glitch-rich__rgb,
.glitch-rich__scat {
  position: absolute;
  inset: 0;
  margin: 0;
  pointer-events: none;
  opacity: 0;
  overflow: hidden;
}

.glitch-rich__flow {
  z-index: 2;
}

.glitch-rich__slice {
  z-index: 2;
}

.glitch-rich__slice-inner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.glitch-rich__rgb {
  z-index: 1;
  mix-blend-mode: screen;
}

.glitch-rich__rgb.glitch-rich__text--r {
  z-index: 1;
}

.glitch-rich__rgb.glitch-rich__text--c {
  z-index: 1;
}

.glitch-rich__scat {
  z-index: 2;
  inset: auto;
  overflow: hidden;
}

.glitch-rich__scat-inner {
  position: absolute;
  left: 0;
  top: 0;
}

.gsap-heading-demo__underline {
  display: block;
  width: min(12rem, 60%);
  height: 4px;
  margin-top: 0.75rem;
  background: #18181b;
  transform-origin: left center;
}

.gsap-heading-demo__description {
  margin: 1.25rem 0 0;
  max-width: 36rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #52525b;
}

.gsap-heading-demo__params {
  margin: 1.5rem 0 0;
  padding: 1.25rem;
  max-width: 28rem;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  background: #fafafa;
}

.gsap-heading-demo__params-legend {
  padding: 0 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #71717a;
}

.gsap-heading-demo__param {
  margin-top: 1rem;
}

.gsap-heading-demo__param:first-of-type {
  margin-top: 0.5rem;
}

.gsap-heading-demo__param-label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #3f3f46;
}

.gsap-heading-demo__param-value {
  font-variant-numeric: tabular-nums;
  color: #71717a;
}

.gsap-heading-demo__param-range {
  display: block;
  width: 100%;
  accent-color: #18181b;
}

.gsap-heading-demo__param-select {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.45rem 0.6rem;
  font-size: 0.8125rem;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  background: #fff;
}

.gsap-heading-demo__param-text,
.gsap-heading-demo__param-textarea {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.5rem 0.6rem;
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1.4;
  color: #18181b;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  background: #fff;
}

.gsap-heading-demo__param-textarea {
  resize: vertical;
  min-height: 4.5rem;
}

.gsap-heading-demo__param-hint {
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
  color: #a1a1aa;
}

.gsap-heading-demo__param-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.gsap-heading-demo__replay {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #18181b;
  background: #f4f4f5;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.gsap-heading-demo__reset {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #52525b;
  background: #fff;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.gsap-heading-demo__replay:hover {
  background: #e4e4e7;
  border-color: #a1a1aa;
}

.gsap-heading-demo__reset:hover {
  background: #f4f4f5;
  border-color: #a1a1aa;
}

.gsap-heading-demo__replay:focus-visible,
.gsap-heading-demo__reset:focus-visible {
  outline: 2px solid #18181b;
  outline-offset: 2px;
}
</style>
