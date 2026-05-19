/** 各スライダー demo で共通利用するバナー画像（public 配下） */
const BANNER_IMAGE_PATHS = [
  '/images/img1.png',
  '/images/img2.png',
  '/images/img3.png',
  '/images/img1.png',
  '/images/img2.png',
  '/images/img3.png',
] as const

/**
 * バナースライドのデータ一覧を返す。
 * 画像 URL は baseURL 付きで解決する（GitHub Pages 対応）。
 */
export function useBannerSlides() {
  return BANNER_IMAGE_PATHS.map((path, index) => ({
    id: index + 1,
    src: usePublicAsset(path),
    link: '/',
  }))
}
