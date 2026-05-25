import type { Ref } from 'vue'
import type { Context } from 'gsap/gsap-core'

type GsapContextCallback = (self: Context) => void

/**
 * `gsap.context()` 内でアニメーションを定義し、コンポーネント破棄時に `revert()` する。
 * 初回表示・ScrollTrigger 連動の演出はこの composable 経由で実装する。
 *
 * @param scope - アニメーションのスコープ要素（template ref）
 * @param setup - context 内で実行する GSAP の設定
 *
 * @example
 * ```ts
 * const root = ref<HTMLElement | null>(null)
 * const { gsap } = useGsap()
 *
 * useGsapContext(root, () => {
 *   gsap.from('.js-gsap-title', { y: 40, opacity: 0, duration: 0.8 })
 * })
 * ```
 */
export function useGsapContext(
  scope: Ref<HTMLElement | null | undefined>,
  setup: GsapContextCallback,
) {
  const { gsap } = useGsap()

  onMounted(async () => {
    await nextTick()
    if (!scope.value || !gsap) return

    const ctx = gsap.context(setup, scope.value)

    onUnmounted(() => {
      ctx.revert()
    })
  })
}
