/**
 * Lenis スムーススクロールと GSAP ScrollTrigger の連携。
 * gsap プラグインより後に読み込む（ファイル名の番号順）。
 */
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    // 内部リンク遷移時に慣性スクロールを止め、Nuxt の scrollBehavior と競合しないようにする
    stopInertiaOnNavigate: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return {
    provide: {
      lenis,
    },
  }
})
