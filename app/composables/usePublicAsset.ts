/**
 * `public/` 配下のアセット URL を返す。
 * GitHub Pages など app.baseURL 付きのサブパスデプロイでも正しく解決される。
 *
 * @param path - `/images/foo.png` のように先頭スラッシュ付きで指定
 */
export function usePublicAsset(path: string): string {
  const baseURL = useRuntimeConfig().app.baseURL
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${baseURL}${normalized}`
}
