import { SplitText } from 'gsap/SplitText'
import type { gsap as GsapCore } from 'gsap'
import type { Timeline } from 'gsap/gsap-core'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'
import type { HeadingAnimationVariant } from '~/constants/headingAnimationDemos'
import {
  mergeHeadingAnimationParams,
  type HeadingAnimationParams,
} from '~/constants/headingAnimationParams'
import { getHeadingPlainText, setHeadingTextWithLineBreaks } from '~/utils/headingTextLines'
import {
  applyGlitchVariantAnimation,
  isGlitchVariant,
} from '~/composables/headingAnimationGlitch'

export interface GsapHeadingAnimationTargets {
  root: HTMLElement
  heading: HTMLElement
  clipInner?: HTMLElement | null
  underline?: HTMLElement | null
  accent?: HTMLElement | null
  bracketLeft?: HTMLElement | null
  bracketRight?: HTMLElement | null
  /** #25 glitch-rich の DOM ラッパー */
  glitchWrap?: HTMLElement | null
}

export interface GsapHeadingAnimationOptions {
  variant: HeadingAnimationVariant
  scrollTrigger?: boolean
  params?: Partial<HeadingAnimationParams>
}

export interface GsapHeadingAnimationHandle {
  timeline: Timeline
  /** 現在のパラメータで再構築して再生 */
  replay: (params?: Partial<HeadingAnimationParams>, headingText?: string) => void
  cleanup: () => void
}

/**
 * 見出し用 GSAP アニメーションを組み立てる
 */
export function createGsapHeadingAnimation(
  gsap: typeof GsapCore,
  _ScrollTrigger: typeof ScrollTriggerPlugin,
  targets: GsapHeadingAnimationTargets,
  options: GsapHeadingAnimationOptions,
): GsapHeadingAnimationHandle | null {
  const { root, heading, clipInner, underline, accent, bracketLeft, bracketRight, glitchWrap } = targets
  const { variant, scrollTrigger = true } = options

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const glitchLayers = glitchWrap
      ? [...glitchWrap.querySelectorAll<HTMLElement>('.js-gsap-glitch-layer')]
      : []
    gsap.set(
      [heading, clipInner, underline, accent, bracketLeft, bracketRight, ...glitchLayers].filter(Boolean),
      { clearProps: 'all' },
    )
    gsap.set(heading, { opacity: 1 })
    return null
  }

  let split: SplitText | null = null
  const splitRef = { current: null as SplitText | null }
  let currentParams = mergeHeadingAnimationParams(options.params)

  const buildTimeline = (
    withScrollTrigger: boolean,
    p: HeadingAnimationParams,
  ): Timeline => {
    split?.revert()
    split = null
    splitRef.current = null

    const tl = gsap.timeline({
      paused: true,
      delay: p.delay,
      scrollTrigger: withScrollTrigger
        ? {
            trigger: root,
            start: 'top 82%',
            once: true,
          }
        : undefined,
    })

    const d = p.distance
    const subDuration = Math.max(0.2, p.duration * 0.65)

    if (isGlitchVariant(variant)) {
      const glitchLayers = glitchWrap
        ? [...glitchWrap.querySelectorAll<HTMLElement>('.js-gsap-glitch-layer')]
        : []
      gsap.set([heading, ...glitchLayers], {
        clearProps:
          'opacity,filter,textShadow,x,y,skewX,scaleX,scaleY,clipPath,transform,top,left,width,height',
      })
      applyGlitchVariantAnimation(variant, tl, {
        gsap,
        heading,
        glitchWrap,
        p,
        distance: d,
        subDuration,
        splitRef,
      })
      split = splitRef.current
      return tl
    }

    switch (variant) {
      case 'fade-up':
        tl.from(heading, { y: d, opacity: 0, duration: p.duration, ease: p.ease })
        break
      case 'fade-down':
        tl.from(heading, { y: -d * 0.75, opacity: 0, duration: p.duration, ease: p.ease })
        break
      case 'clip-reveal':
        tl.from(clipInner ?? heading, {
          yPercent: 100 + d * 0.25,
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'blur-in':
        tl.from(heading, {
          opacity: 0,
          filter: `blur(${p.blur}px)`,
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'scale-in':
        tl.from(heading, {
          scale: Math.max(0.5, 1 - d / 400),
          opacity: 0,
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'char-stagger':
        split = SplitText.create(heading, { type: 'chars' })
        tl.from(split.chars, {
          opacity: 0,
          y: d * 0.58,
          rotateX: -45,
          transformOrigin: '50% 100%',
          stagger: p.stagger,
          duration: subDuration,
          ease: p.ease,
        })
        break
      case 'word-stagger':
        split = SplitText.create(heading, { type: 'words' })
        tl.from(split.words, {
          opacity: 0,
          y: d * 0.42,
          stagger: p.stagger * 2.4,
          duration: subDuration,
          ease: p.ease,
        })
        break
      case 'underline-reveal':
        tl.from(heading, { opacity: 0, y: d * 0.5, duration: subDuration, ease: p.ease })
        if (underline) {
          tl.from(
            underline,
            {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: subDuration,
              ease: p.ease,
            },
            '-=0.25',
          )
        }
        break
      case 'slide-left':
        tl.from(heading, { x: -d * 1.5, opacity: 0, duration: p.duration, ease: p.ease })
        break
      case 'slide-right':
        tl.from(heading, { x: d * 1.5, opacity: 0, duration: p.duration, ease: p.ease })
        break
      case 'rotate-in':
        tl.from(heading, {
          opacity: 0,
          rotation: -(d * 0.21),
          y: d * 0.5,
          transformOrigin: 'left bottom',
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'flip-up':
        tl.from(heading, {
          opacity: 0,
          rotateX: -85,
          transformOrigin: '50% 100%',
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'line-stagger':
        // マスクなし：行全体がフェードしながら下から出る
        split = SplitText.create(heading, { type: 'lines' })
        tl.from(split.lines, {
          opacity: 0,
          y: d * 0.65,
          stagger: p.stagger * 5,
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'line-mask':
        // マスクあり：行ごとの枠から下へスライド（フェードなし＝切り抜き感）
        split = SplitText.create(heading, { type: 'lines', mask: 'lines' })
        tl.from(split.lines, {
          yPercent: 110,
          stagger: p.stagger * 5,
          duration: p.duration,
          ease: 'power3.out',
        })
        break
      case 'char-random':
        split = SplitText.create(heading, { type: 'chars' })
        tl.from(split.chars, {
          opacity: 0,
          y: d * 0.33,
          scale: 0.6,
          stagger: { each: p.stagger, from: 'random' },
          duration: subDuration,
          ease: p.ease,
        })
        break
      case 'elastic-in':
        tl.from(heading, {
          scale: Math.max(0.2, 1 - d / 120),
          opacity: 0,
          duration: p.duration,
          ease: p.ease.includes('elastic') ? p.ease : 'elastic.out(1, 0.5)',
        })
        break
      case 'skew-in':
        tl.from(heading, {
          opacity: 0,
          skewX: d * 0.29,
          x: -d * 0.5,
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'clip-horizontal':
        tl.from(heading, {
          clipPath: 'inset(0 100% 0 0)',
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'bounce-up':
        tl.from(heading, {
          y: d * 1.67,
          opacity: 0,
          duration: p.duration,
          ease: p.ease.includes('bounce') ? p.ease : 'bounce.out',
        })
        break
      case 'tracking-expand':
        tl.from(heading, {
          opacity: 0,
          letterSpacing: `${p.trackingEm}em`,
          duration: p.duration,
          ease: p.ease,
        })
        break
      case 'scramble-text': {
        const finalText = getHeadingPlainText(heading)
        tl.from(heading, {
          duration: p.duration,
          scrambleText: {
            text: finalText,
            chars: 'XO▪#%&',
            speed: p.scrambleSpeed,
          },
        })
        break
      }
      case 'accent-bar':
        if (accent) {
          tl.from(accent, {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: subDuration,
            ease: p.ease,
          })
        }
        tl.from(
          heading,
          { opacity: 0, x: d * 0.5, duration: subDuration, ease: p.ease },
          accent ? '-=0.15' : 0,
        )
        break
      case 'bracket-reveal':
        if (bracketLeft && bracketRight) {
          tl.from([bracketLeft, bracketRight], {
            opacity: 0,
            scale: 0.5,
            duration: subDuration,
            ease: p.ease,
          })
        }
        tl.from(
          heading,
          { opacity: 0, y: d * 0.33, duration: subDuration, ease: p.ease },
          bracketLeft ? '-=0.1' : 0,
        )
        break
      case 'char-wave':
        split = SplitText.create(heading, { type: 'chars' })
        tl.from(split.chars, {
          opacity: 0,
          y: (index: number) => d * 0.58 + Math.sin(index * 0.65) * (d * 0.375),
          rotation: (index: number) => Math.sin(index * 0.65) * (d * 0.21),
          transformOrigin: '50% 100%',
          stagger: p.stagger,
          duration: subDuration,
          ease: p.ease,
        })
        break
      default:
        break
    }

    return tl
  }

  let timeline = buildTimeline(scrollTrigger, currentParams)

  return {
    timeline,
    replay(partial?: Partial<HeadingAnimationParams>, headingText?: string) {
      if (partial) {
        currentParams = mergeHeadingAnimationParams({ ...currentParams, ...partial })
      }
      timeline.scrollTrigger?.kill()
      timeline.kill()
      split?.revert()
      split = null
      splitRef.current = null
      if (headingText !== undefined) {
        if (headingText.includes('\n')) {
          setHeadingTextWithLineBreaks(heading, headingText)
        }
        else {
          heading.textContent = headingText
        }
      }
      timeline = buildTimeline(false, currentParams)
      timeline.play(0)
    },
    cleanup() {
      timeline.scrollTrigger?.kill()
      timeline.kill()
      split?.revert()
      split = null
      splitRef.current = null
    },
  }
}
