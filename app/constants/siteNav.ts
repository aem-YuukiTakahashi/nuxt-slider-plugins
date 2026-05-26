/**
 * サイト内デモページのナビゲーション定義（レイアウトフッターで共通利用）
 */
export interface SiteNavLink {
  to: string
  label: string
}

export const siteNavLinks: SiteNavLink[] = [
  { to: '/', label: 'トップ' },
  { to: '/swiper', label: 'SWIPER BANNER' },
  { to: '/splide', label: 'SPLIDE BANNER' },
  { to: '/embla', label: 'EMBLA CAROUSEL' },
  { to: '/fv-scroll', label: 'FV SCROLL (SPLIDE + GSAP)' },
  { to: '/parallax', label: 'Parallax Thumbnail' },
  { to: '/heading-animations', label: 'Heading Animations (GSAP)' },
  { to: '/cards', label: 'Card List' },
  { to: '/list', label: 'Text List' },
]
