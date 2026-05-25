import type { gsap as GsapCore } from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'

/**
 * プラグイン経由で提供された GSAP インスタンスを取得する。
 * クライアント専用（`gsap.client` プラグイン）のため、SSR 中は undefined になり得る。
 */
export function useGsap() {
  const { $gsap, $ScrollTrigger } = useNuxtApp()

  return {
    gsap: $gsap as typeof GsapCore,
    ScrollTrigger: $ScrollTrigger as typeof ScrollTriggerPlugin,
  }
}
