import type { gsap as GsapCore } from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof GsapCore
    $ScrollTrigger: typeof ScrollTriggerPlugin
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $gsap: typeof GsapCore
    $ScrollTrigger: typeof ScrollTriggerPlugin
  }
}

export {}
