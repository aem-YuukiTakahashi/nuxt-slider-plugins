/**
 * GSAP + ScrollTrigger をアプリ全体で1回だけ登録する。
 * ページ内での registerPlugin 直書きは避ける（ユーザールール）。
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
