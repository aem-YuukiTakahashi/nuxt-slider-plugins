import type { gsap as GsapCore } from 'gsap'
import type { Timeline } from 'gsap/gsap-core'
import type { SplitText } from 'gsap/SplitText'
import type { HeadingAnimationVariant } from '~/constants/headingAnimationDemos'
import type { HeadingAnimationParams } from '~/constants/headingAnimationParams'

/** グリッチ系バリアント */
export const headingGlitchVariants = ['glitch-rich'] as const

/** glitch-rich 用 DOM レイヤー数（CodePen の shiftLine / scat 相当） */
export const GLITCH_RICH_SLICE_COUNT = 6
export const GLITCH_RICH_SCAT_COUNT = 3

export type HeadingGlitchVariant = (typeof headingGlitchVariants)[number]

const HEADING_BASE_COLOR = '#18181b'

export interface GlitchVariantContext {
  gsap: typeof GsapCore
  heading: HTMLElement
  glitchWrap?: HTMLElement | null
  p: HeadingAnimationParams
  distance: number
  subDuration: number
  splitRef: { current: SplitText | null }
}

function randomInsetBand(gsap: typeof GsapCore, minHeight = 5, maxHeight = 22): string {
  const top = gsap.utils.random(0, 78)
  const height = gsap.utils.random(minHeight, maxHeight)
  return `inset(${top}% 0 ${100 - top - height}% 0)`
}

/**
 * CodePen (tksiiii/xdQgJX) を DOM + GSAP で近似（Canvas 不使用）
 */
function applyDomGlitchRich(
  gsap: typeof GsapCore,
  tl: Timeline,
  ctx: GlitchVariantContext,
): void {
  const { heading, glitchWrap, p, distance: d } = ctx
  if (!glitchWrap) return

  const flow = glitchWrap.querySelector<HTMLElement>('.js-gsap-glitch-flow')
  const slices = [...glitchWrap.querySelectorAll<HTMLElement>('.js-gsap-glitch-slice')]
  const sliceInners = slices
    .map(s => s.querySelector<HTMLElement>('.js-gsap-glitch-slice-inner'))
    .filter((el): el is HTMLElement => el != null)
  const rgbLayers = [...glitchWrap.querySelectorAll<HTMLElement>('.js-gsap-glitch-rgb')]
  const scats = [...glitchWrap.querySelectorAll<HTMLElement>('.js-gsap-glitch-scat')]
  const scatInners = scats
    .map(s => s.querySelector<HTMLElement>('.js-gsap-glitch-scat-inner'))
    .filter((el): el is HTMLElement => el != null)
  const effectLayers = [...glitchWrap.querySelectorAll<HTMLElement>('.js-gsap-glitch-layer')]

  const shiftMax = Math.max(14, d * 0.8)
  const rgbMax = Math.max(10, d * 0.55)
  const totalDur = Math.max(1, p.duration * 1.45)
  const cycleCount = 11
  const cycleDur = totalDur / cycleCount

  gsap.set(heading, {
    opacity: 0,
    x: 0,
    y: 0,
    color: HEADING_BASE_COLOR,
    clipPath: 'none',
    textShadow: 'none',
  })
  gsap.set(effectLayers, {
    opacity: 0,
    x: 0,
    y: 0,
    clipPath: 'none',
    clearProps: 'top,left,width,height',
  })
  scats.forEach((scat) => {
    gsap.set(scat, { top: '0%', left: '0%', width: '0%', height: '0%' })
  })

  const wrapWidth = glitchWrap.offsetWidth
  scatInners.forEach((inner) => {
    gsap.set(inner, { width: wrapWidth || 'auto' })
  })

  for (let i = 0; i < cycleCount; i++) {
    const t = i * cycleDur

    if (gsap.utils.random(0, 100) > 76) {
      tl.set(effectLayers, { opacity: 0 }, t)
      tl.set(heading, { opacity: 1 }, t)
      tl.set(heading, { opacity: 0 }, t + cycleDur * 0.35)
      continue
    }

    if (flow) {
      const flowRgb = flow.querySelectorAll<HTMLElement>('.js-gsap-glitch-rgb')
      const top = gsap.utils.random(0, 86)
      const bandH = gsap.utils.random(3, 11)
      const endTop = Math.min(92, top + gsap.utils.random(12, 28))
      tl.set(flow, { opacity: 1, clipPath: `inset(${top}% 0 ${100 - top - bandH}% 0)` }, t)
      tl.to(
        flow,
        {
          clipPath: `inset(${endTop}% 0 ${Math.max(2, 100 - endTop - bandH)}% 0)`,
          duration: cycleDur * 0.88,
          ease: 'none',
        },
        t,
      )
      tl.fromTo(
        flowRgb,
        { x: 0 },
        {
          x: () => gsap.utils.random(shiftMax * 0.35, shiftMax),
          duration: 0.045,
          repeat: 4,
          yoyo: true,
          ease: 'steps(2)',
        },
        t,
      )
      tl.set(flow, { opacity: 0, clipPath: 'none' }, t + cycleDur * 0.92)
      tl.set(flowRgb, { x: 0 }, t + cycleDur * 0.92)
    }

    slices.forEach((slice, idx) => {
      if (gsap.utils.random(0, 100) <= 50) return
      const inner = sliceInners[idx]
      if (!inner) return
      const offset = gsap.utils.random(-shiftMax, shiftMax)
      tl.set(slice, { opacity: 1, clipPath: randomInsetBand(gsap, 6, 20) }, t)
      tl.set(inner, { x: offset }, t)
      tl.to(slice, { opacity: 0, duration: 0.06 }, t + cycleDur * 0.45)
      tl.set(inner, { x: 0 }, t + cycleDur * 0.5)
      tl.set(slice, { clipPath: 'none' }, t + cycleDur * 0.52)
    })

    if (rgbLayers.length && gsap.utils.random(0, 100) > 34) {
      rgbLayers.forEach((layer, idx) => {
        const sign = idx === 0 ? 1 : -1
        tl.set(layer, { opacity: () => gsap.utils.random(0.5, 0.95) }, t)
        tl.to(
          layer,
          {
            x: () => sign * gsap.utils.random(rgbMax * 0.35, rgbMax),
            duration: 0.048,
            repeat: 3,
            yoyo: true,
            ease: 'steps(2)',
          },
          t,
        )
      })
      tl.set(rgbLayers, { opacity: 0, x: 0 }, t + cycleDur * 0.88)
    }

    scats.forEach((scat, idx) => {
      if (gsap.utils.random(0, 100) <= 78) return
      const inner = scatInners[idx]
      if (!inner) return
      const topPct = gsap.utils.random(0, 62)
      const leftPct = gsap.utils.random(-8, 42)
      const wPct = gsap.utils.random(22, 48)
      const hPct = gsap.utils.random(10, 24)
      const offsetX = gsap.utils.random(-shiftMax * 0.6, shiftMax * 0.6)

      tl.set(
        scat,
        {
          opacity: 1,
          top: `${topPct}%`,
          left: `${leftPct}%`,
          width: `${wPct}%`,
          height: `${hPct}%`,
        },
        t,
      )
      tl.add(() => {
        const h = glitchWrap.offsetHeight || heading.offsetHeight
        const w = glitchWrap.offsetWidth || heading.offsetWidth
        gsap.set(inner, {
          x: (-leftPct / 100) * w + offsetX,
          y: (-topPct / 100) * h,
        })
      }, t)
      tl.to(scat, { opacity: 0, duration: 0.07 }, t + 0.14)
    })
  }

  tl.set(effectLayers, {
    opacity: 0,
    x: 0,
    y: 0,
    clipPath: 'none',
    clearProps: 'top,left,width,height',
  }, totalDur)
  scats.forEach((scat) => {
    tl.set(scat, { top: '0%', left: '0%', width: '0%', height: '0%' }, totalDur)
  })
  tl.to(heading, { opacity: 1, duration: 0.22, ease: 'power2.out' }, totalDur)
}

/**
 * グリッチ系バリアントのタイムラインを構築
 */
export function applyGlitchVariantAnimation(
  variant: HeadingAnimationVariant,
  tl: Timeline,
  ctx: GlitchVariantContext,
): void {
  if (variant === 'glitch-rich') {
    applyDomGlitchRich(ctx.gsap, tl, ctx)
  }
}

/** グリッチ系かどうか */
export function isGlitchVariant(variant: HeadingAnimationVariant): boolean {
  return (headingGlitchVariants as readonly string[]).includes(variant)
}
