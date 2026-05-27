/**
 * GSAP + SVG デモページのナビゲーション定義
 */
export interface GsapSvgNavLink {
  to: string
  label: string
  description: string
}

export const gsapSvgNavLinks: GsapSvgNavLink[] = [
  {
    to: '/gsap-svg/path-draw',
    label: 'Path Draw',
    description: 'strokeDashoffset による線の描画アニメーション',
  },
  {
    to: '/gsap-svg/morph',
    label: 'Path Morph',
    description: '同一構造のパス属性 d を補間して形をモーフィング',
  },
  {
    to: '/gsap-svg/shape-morph-scroll',
    label: 'Shape Morph on Scroll',
    description: 'セクション進入で丸・四角・三角・5角星へ SVG モーフ',
  },
  {
    to: '/gsap-svg/scroll-reveal',
    label: 'Scroll Reveal',
    description: 'ScrollTrigger + scrub でスクロール連動の描画',
  },
  {
    to: '/gsap-svg/mask-reveal',
    label: 'Mask Reveal',
    description: 'SVG マスクの半径拡大でコンテンツを露出',
  },
  {
    to: '/gsap-svg/orbit',
    label: 'Orbit',
    description: 'transformOrigin を中心にした回転・軌道アニメーション',
  },
]
