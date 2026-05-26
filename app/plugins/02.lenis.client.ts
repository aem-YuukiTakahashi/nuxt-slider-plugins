/**
 * Lenis スムーススクロールと GSAP ScrollTrigger の連携。
 * gsap プラグインより後に読み込む（ファイル名の番号順）。
 *
 * `/parallax-native` では Lenis を破棄し、ネイティブスクロールとの比較検証ができるようにする。
 * （`stop()` はタッチで preventDefault が入るため、この用途では `destroy()` を使う。）
 */
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { withoutBase } from 'ufo'

/** Lenis を使わずネイティブスクロールで見る検証ページのパス接頭辞 */
const PARALLAX_NATIVE_PATH = '/parallax-native'

/**
 * 現在パスが Lenis 無効ページかどうか（ベースパス運用にも対応）
 */
function shouldDisableLenisForPath(routePath: string, baseURL: string): boolean {
  const path = withoutBase(routePath, baseURL) || '/'
  return path === PARALLAX_NATIVE_PATH || path.startsWith(`${PARALLAX_NATIVE_PATH}/`)
}

export default defineNuxtPlugin(() => {

  const router = useRouter()
  const runtimeConfig = useRuntimeConfig()

  let lenis: Lenis | null = null
  let unsubscribeScroll: (() => void) | null = null
  let tickerRafHandler: ((_time: number) => void) | null = null

  /** 将来のデバッグ用：`$lenis` はマウント中のみインスタンスを指す */
  const lenisRef = shallowRef<Lenis | null>(null)

  /**
   * Lenis と GSAP ticker の両方で ScrollTrigger と同期する。
   */
  function attachLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      // 内部リンク遷移時に慣性スクロールを止め、Nuxt の scrollBehavior と競合しないようにする
      stopInertiaOnNavigate: true,
    })
    unsubscribeScroll = lenis.on('scroll', ScrollTrigger.update)

    tickerRafHandler = (time: number) => {
      lenis?.raf(time * 1000)
    }
    gsap.ticker.add(tickerRafHandler)
    gsap.ticker.lagSmoothing(0)

    lenisRef.value = lenis
  }

  /**
   * リスナー・ticker・VirtualScroll を外し、ネイティブスクロールに戻す。
   */
  function detachLenis() {
    if (tickerRafHandler) {
      gsap.ticker.remove(tickerRafHandler)
      tickerRafHandler = null
    }
    if (unsubscribeScroll) {
      unsubscribeScroll()
      unsubscribeScroll = null
    }
    lenis?.destroy()
    lenis = null
    lenisRef.value = null
    ScrollTrigger.refresh()
  }

  /**
   * ルートに応じて Lenis を付け外しする。
   */
  function syncLenisForCurrentRoute() {
    const path = router.currentRoute.value.path
    const base = runtimeConfig.app.baseURL || '/'
    if (shouldDisableLenisForPath(path, base)) {
      if (lenis)
        detachLenis()
    }
    else {
      if (!lenis)
        attachLenis()
    }
  }

  syncLenisForCurrentRoute()
  router.afterEach(() => {
    syncLenisForCurrentRoute()
  })

  return {
    provide: {
      lenis: lenisRef,
    },
  }
})
