import type { gsap as GsapCore } from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof GsapCore
    $ScrollTrigger: typeof ScrollTriggerPlugin
    $lenis?: Lenis
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $gsap: typeof GsapCore
    $ScrollTrigger: typeof ScrollTriggerPlugin
  }
}

export {}
