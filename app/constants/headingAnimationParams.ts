import type { HeadingAnimationVariant } from '~/constants/headingAnimationDemos'
import { headingVariantsWithColorParams } from '~/constants/headingAnimationDemos'

/** 見出しアニメーションの調整可能パラメータ */
export interface HeadingAnimationParams {
  duration: number
  delay: number
  stagger: number
  distance: number
  ease: string
  blur: number
  scrambleSpeed: number
  trackingEm: number
  /** 開始色 */
  fromColor: string
  /** 終了色（本文色） */
  toColor: string
  /** アクセント色 */
  accentColor: string
}

export const defaultHeadingAnimationParams: HeadingAnimationParams = {
  duration: 0.85,
  delay: 0,
  stagger: 0.05,
  distance: 48,
  ease: 'power3.out',
  blur: 14,
  scrambleSpeed: 0.35,
  trackingEm: 0.4,
  fromColor: '#a1a1aa',
  toColor: '#18181b',
  accentColor: '#2563eb',
}

export const headingAnimationEaseOptions = [
  { value: 'power2.out', label: 'power2.out' },
  { value: 'power3.out', label: 'power3.out' },
  { value: 'power2.inOut', label: 'power2.inOut' },
  { value: 'power3.inOut', label: 'power3.inOut' },
  { value: 'bounce.out', label: 'bounce.out' },
  { value: 'elastic.out(1, 0.5)', label: 'elastic.out' },
  { value: 'back.out(2)', label: 'back.out(2)' },
] as const

export type HeadingAnimationParamKey = keyof HeadingAnimationParams

export interface HeadingAnimationParamField {
  key: HeadingAnimationParamKey
  label: string
  min: number
  max: number
  step: number
  unit?: string
}

export const headingAnimationParamFields: HeadingAnimationParamField[] = [
  { key: 'duration', label: 'Duration', min: 0.2, max: 3, step: 0.05, unit: 's' },
  { key: 'delay', label: 'Delay', min: 0, max: 2, step: 0.05, unit: 's' },
  { key: 'stagger', label: 'Stagger', min: 0.01, max: 0.3, step: 0.005, unit: 's' },
  { key: 'distance', label: 'Distance', min: 0, max: 120, step: 1, unit: 'px' },
  { key: 'blur', label: 'Blur', min: 0, max: 30, step: 1, unit: 'px' },
  { key: 'scrambleSpeed', label: 'Scramble speed', min: 0.05, max: 1, step: 0.05 },
  { key: 'trackingEm', label: 'Tracking', min: 0, max: 1, step: 0.05, unit: 'em' },
]

export const headingAnimationColorFields = [
  { key: 'fromColor' as const, label: 'From color' },
  { key: 'toColor' as const, label: 'To color' },
  { key: 'accentColor' as const, label: 'Accent color' },
]

const STAGGER_VARIANTS: HeadingAnimationVariant[] = [
  'char-stagger',
  'word-stagger',
  'line-stagger',
  'line-mask',
  'char-random',
  'char-wave',
  'char-color-stagger',
  'char-scale-color',
  'glitch',
  'line-color-stagger',
]

const DISTANCE_VARIANTS: HeadingAnimationVariant[] = [
  'fade-up',
  'fade-down',
  'clip-reveal',
  'scale-in',
  'char-stagger',
  'word-stagger',
  'underline-reveal',
  'slide-left',
  'slide-right',
  'rotate-in',
  'flip-up',
  'line-stagger',
  'line-mask',
  'char-random',
  'skew-in',
  'bounce-up',
  'accent-bar',
  'bracket-reveal',
  'char-wave',
  'word-highlight',
  'line-wipe-color',
  'underline-color-reveal',
  'bracket-accent-color',
  'char-scale-color',
  'glitch',
]

export function getVisibleParamKeys(variant: HeadingAnimationVariant): HeadingAnimationParamKey[] {
  const keys: HeadingAnimationParamKey[] = ['duration', 'delay', 'ease']

  if (STAGGER_VARIANTS.includes(variant)) {
    keys.push('stagger')
  }
  if (DISTANCE_VARIANTS.includes(variant)) {
    keys.push('distance')
  }
  if (variant === 'blur-in' || variant === 'blur-sharp-color') {
    keys.push('blur')
  }
  if (variant === 'scramble-text') {
    keys.push('scrambleSpeed')
  }
  if (variant === 'tracking-expand') {
    keys.push('trackingEm')
  }
  if ((headingVariantsWithColorParams as readonly string[]).includes(variant)) {
    keys.push('fromColor', 'toColor', 'accentColor')
  }

  return keys
}

export function usesColorParamControls(variant: HeadingAnimationVariant): boolean {
  return (headingVariantsWithColorParams as readonly string[]).includes(variant)
}

export function mergeHeadingAnimationParams(
  partial?: Partial<HeadingAnimationParams>,
): HeadingAnimationParams {
  return { ...defaultHeadingAnimationParams, ...partial }
}
