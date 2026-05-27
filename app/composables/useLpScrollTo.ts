import type Lenis from 'lenis'

/** 固定ヘッダー高さ（スクロールオフセット） */
export const LP_HEADER_OFFSET = 72

/**
 * LP 内のセクションへスムーススクロールする。
 * Lenis があれば Lenis 経由、なければ ScrollToPlugin / ネイティブにフォールバック。
 */
export function useLpScrollTo() {
  const { gsap } = useGsap()
  const nuxtApp = useNuxtApp()
  const lenis = nuxtApp.$lenis as Lenis | undefined

  /**
   * @param targetId - 要素 id（# なし）
   */
  function scrollToSection(targetId: string, onComplete?: () => void) {
    const element = document.getElementById(targetId)
    if (!element) return

    if (lenis) {
      lenis.scrollTo(element, {
        offset: -LP_HEADER_OFFSET,
        duration: 1.25,
        onComplete,
      })
      return
    }

    if (gsap) {
      gsap.to(window, {
        duration: 1.1,
        ease: 'power2.inOut',
        scrollTo: {
          y: element,
          offsetY: LP_HEADER_OFFSET,
        },
        onComplete,
      })
      return
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    onComplete?.()
  }

  /** ページ先頭へ */
  function scrollToTop(onComplete?: () => void) {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2, onComplete })
      return
    }

    if (gsap) {
      gsap.to(window, {
        duration: 1.1,
        ease: 'power2.inOut',
        scrollTo: { y: 0 },
        onComplete,
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
    onComplete?.()
  }

  return {
    scrollToSection,
    scrollToTop,
  }
}
