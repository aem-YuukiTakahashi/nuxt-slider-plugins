import { SplitText } from 'gsap/SplitText'
import type { gsap as GsapCore } from 'gsap'
import type { Timeline } from 'gsap/gsap-core'
import type { HeadingAnimationVariant } from '~/constants/headingAnimationDemos'
import type { HeadingAnimationParams } from '~/constants/headingAnimationParams'

export interface ColorVariantContext {
  gsap: typeof GsapCore
  heading: HTMLElement
  clipInner?: HTMLElement | null
  underline?: HTMLElement | null
  bracketLeft?: HTMLElement | null
  bracketRight?: HTMLElement | null
  p: HeadingAnimationParams
  distance: number
  subDuration: number
  splitRef: { current: SplitText | null }
}

/**
 * 色・装飾系バリアント（25〜39）のタイムラインを構築
 */
export function applyColorVariantAnimation(
  variant: HeadingAnimationVariant,
  tl: Timeline,
  ctx: ColorVariantContext,
): void {
  const { gsap, heading, clipInner, underline, bracketLeft, bracketRight, p, distance: d, subDuration, splitRef } = ctx

  const setSplit = (s: SplitText | null) => {
    splitRef.current = s
  }

  switch (variant) {
    case 'color-fade':
      gsap.set(heading, { color: p.fromColor })
      tl.fromTo(heading, { opacity: 0 }, { opacity: 1, duration: p.duration * 0.3, ease: p.ease })
      tl.to(heading, { color: p.toColor, duration: p.duration, ease: p.ease }, 0)
      break

    case 'char-color-stagger': {
      const split = SplitText.create(heading, { type: 'chars' })
      setSplit(split)
      tl.from(split.chars, {
        opacity: 0,
        y: d * 0.4,
        color: p.accentColor,
        stagger: p.stagger,
        duration: subDuration,
        ease: p.ease,
      })
      tl.to(split.chars, {
        color: p.toColor,
        stagger: p.stagger * 0.5,
        duration: subDuration,
        ease: p.ease,
      })
      break
    }

    case 'word-highlight': {
      const split = SplitText.create(heading, { type: 'words' })
      setSplit(split)
      const words = split.words
      tl.from(words, {
        opacity: 0,
        y: d * 0.35,
        color: p.fromColor,
        stagger: p.stagger * 2,
        duration: subDuration,
        ease: p.ease,
      })
      if (words.length > 0) {
        const last = words[words.length - 1]!
        tl.to(words, { color: p.toColor, duration: subDuration * 0.5 }, '-=0.2')
        tl.to(last, { color: p.accentColor, duration: subDuration, ease: p.ease }, '-=0.15')
      }
      break
    }

    case 'gradient-reveal':
      gsap.set(heading, {
        backgroundImage: `linear-gradient(90deg, ${p.fromColor}, ${p.accentColor}, ${p.toColor}, ${p.accentColor}, ${p.fromColor})`,
        backgroundSize: '200% auto',
        backgroundPosition: '0% 50%',
        backgroundClip: 'text',
        webkitBackgroundClip: 'text',
        color: 'transparent',
        opacity: 0,
      })
      tl.to(heading, { opacity: 1, duration: 0.2 })
      tl.to(heading, {
        backgroundPosition: '100% 50%',
        duration: p.duration * 1.2,
        ease: p.ease,
      })
      break

    case 'two-tone-split': {
      const first = heading.querySelector<HTMLElement>('.js-gsap-tone-first')
      const second = heading.querySelector<HTMLElement>('.js-gsap-tone-second')
      if (first && second) {
        gsap.set(first, { color: p.fromColor })
        gsap.set(second, { color: p.accentColor })
        tl.from([first, second], { opacity: 0, y: d * 0.35, duration: p.duration, ease: p.ease, stagger: 0.12 })
        tl.to(first, { color: p.toColor, duration: p.duration * 0.6, ease: p.ease }, '-=0.3')
        tl.to(second, { color: p.toColor, duration: p.duration * 0.6, ease: p.ease }, '-=0.5')
      }
      break
    }

    case 'neon-glow':
      gsap.set(heading, { color: p.fromColor, textShadow: '0 0 0px transparent' })
      tl.to(heading, {
        color: p.toColor,
        textShadow: `0 0 8px ${p.accentColor}, 0 0 24px ${p.accentColor}66`,
        duration: p.duration,
        ease: p.ease,
      })
      break

    case 'weight-expand':
      gsap.set(heading, { fontWeight: 300, color: p.fromColor })
      tl.to(heading, {
        fontWeight: 700,
        color: p.toColor,
        duration: p.duration,
        ease: p.ease,
      })
      break

    case 'blur-sharp-color':
      gsap.set(heading, { color: p.fromColor })
      tl.fromTo(
        heading,
        { opacity: 0, filter: `blur(${p.blur}px)` },
        {
          opacity: 1,
          filter: 'blur(0px)',
          color: p.toColor,
          duration: p.duration,
          ease: p.ease,
        },
      )
      break

    case 'line-wipe-color': {
      const split = SplitText.create(heading, { type: 'lines', mask: 'lines' })
      setSplit(split)
      gsap.set(heading, { color: p.fromColor })
      tl.from(split.lines, {
        yPercent: 110,
        stagger: p.stagger * 5,
        duration: p.duration,
        ease: 'power3.out',
      })
      tl.to(heading, { color: p.toColor, duration: p.duration * 0.7, ease: p.ease }, '-=0.35')
      break
    }

    case 'line-color-stagger': {
      const split = SplitText.create(heading, { type: 'lines' })
      setSplit(split)
      const colors = [p.accentColor, p.fromColor, p.toColor, p.accentColor]
      split.lines.forEach((line, i) => {
        gsap.set(line, { color: colors[i % colors.length] })
      })
      tl.from(split.lines, {
        opacity: 0,
        y: d * 0.5,
        stagger: p.stagger * 5,
        duration: subDuration,
        ease: p.ease,
      })
      tl.to(split.lines, {
        color: p.toColor,
        stagger: p.stagger * 2,
        duration: subDuration,
        ease: p.ease,
      })
      break
    }

    case 'underline-color-reveal':
      gsap.set(heading, { color: p.fromColor })
      tl.to(heading, { color: p.toColor, duration: p.duration * 0.7, ease: p.ease })
      tl.from(heading, { opacity: 0, y: d * 0.35, duration: subDuration, ease: p.ease }, 0)
      if (underline) {
        gsap.set(underline, { backgroundColor: p.accentColor })
        tl.from(
          underline,
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: subDuration,
            ease: p.ease,
          },
          '-=0.2',
        )
      }
      break

    case 'bracket-accent-color':
      if (bracketLeft && bracketRight) {
        gsap.set([bracketLeft, bracketRight], { color: p.accentColor })
        tl.from([bracketLeft, bracketRight], {
          opacity: 0,
          scale: 0.5,
          duration: subDuration,
          ease: p.ease,
        })
      }
      gsap.set(heading, { color: p.fromColor })
      tl.from(heading, { opacity: 0, y: d * 0.3, duration: subDuration, ease: p.ease }, bracketLeft ? '-=0.05' : 0)
      tl.to(heading, { color: p.toColor, duration: p.duration * 0.6, ease: p.ease }, '-=0.15')
      break

    case 'outline-fill':
      gsap.set(heading, {
        color: 'transparent',
        webkitTextStroke: `2px ${p.fromColor}`,
      })
      tl.to(heading, {
        color: p.toColor,
        webkitTextStrokeWidth: 0,
        duration: p.duration,
        ease: p.ease,
      })
      break

    case 'glitch': {
      const split = SplitText.create(heading, { type: 'chars' })
      setSplit(split)
      const chars = split.chars
      tl.set(chars, { opacity: 1, color: p.toColor })
      tl.to(chars, {
        x: () => gsap.utils.random(-12, 12),
        color: () => (Math.random() > 0.5 ? p.accentColor : p.fromColor),
        duration: 0.05,
        stagger: { each: 0.01, from: 'random' },
        repeat: 3,
        yoyo: true,
      })
      tl.to(chars, {
        x: 0,
        color: p.toColor,
        duration: 0.15,
        stagger: 0.008,
        ease: 'power2.out',
      })
      break
    }

    case 'char-scale-color': {
      const split = SplitText.create(heading, { type: 'chars' })
      setSplit(split)
      tl.from(split.chars, {
        scale: 0,
        opacity: 0,
        color: p.accentColor,
        stagger: p.stagger,
        duration: subDuration,
        ease: 'back.out(2)',
      })
      tl.to(split.chars, {
        color: p.toColor,
        stagger: p.stagger * 0.4,
        duration: subDuration * 0.6,
        ease: p.ease,
      }, '-=0.25')
      break
    }

    default:
      break
  }
}

/** 色・装飾系かどうか */
export function isColorVariant(variant: HeadingAnimationVariant): boolean {
  const colorVariants: HeadingAnimationVariant[] = [
    'color-fade',
    'char-color-stagger',
    'word-highlight',
    'gradient-reveal',
    'two-tone-split',
    'neon-glow',
    'weight-expand',
    'blur-sharp-color',
    'line-wipe-color',
    'line-color-stagger',
    'underline-color-reveal',
    'bracket-accent-color',
    'outline-fill',
    'glitch',
    'char-scale-color',
  ]
  return colorVariants.includes(variant)
}
