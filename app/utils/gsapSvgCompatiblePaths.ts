/**
 * GSAP の attr.d 補間用に、同一コマンド構造（M + N×L + Z）の SVG パスを生成する。
 * 中心から等角度にレイを飛ばし、各シェイプの境界との交点を頂点とする。
 */

/** ビューボックス中心 X */
export const GSAP_SVG_SHAPE_CX = 160

/** ビューボックス中心 Y */
export const GSAP_SVG_SHAPE_CY = 160

/** 全シェイプ共通の頂点数（5角星 = 外5 + 内5） */
export const GSAP_SVG_SHAPE_VERTEX_COUNT = 10

interface SvgPoint {
  x: number
  y: number
}

/**
 * 数値を SVG 出力用に丸める
 */
function roundCoord(value: number, digits = 1): number {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

/**
 * 極座標 → 直交座標（中心はビューボックス中央）
 */
function polar(angle: number, radius: number): SvgPoint {
  return {
    x: roundCoord(GSAP_SVG_SHAPE_CX + radius * Math.cos(angle)),
    y: roundCoord(GSAP_SVG_SHAPE_CY + radius * Math.sin(angle)),
  }
}

/**
 * 上端を起点に、時計回りの等分割角度リストを返す
 */
export function segmentAngles(count: number = GSAP_SVG_SHAPE_VERTEX_COUNT): number[] {
  return Array.from({ length: count }, (_, index) => {
    return -Math.PI / 2 + (index * 2 * Math.PI) / count
  })
}

/**
 * 頂点配列を M + L×n + Z 形式の d 属性へ変換
 */
export function pointsToPathD(points: SvgPoint[]): string {
  const [first, ...rest] = points
  const format = (point: SvgPoint) => `${point.x},${point.y}`
  return `M${format(first)}${rest.map(p => `L${format(p)}`).join('')}Z`
}

/**
 * 円形パス（半径一定の等角度サンプリング）
 */
export function buildCirclePath(radius = 100): string {
  return pointsToPathD(segmentAngles().map(angle => polar(angle, radius)))
}

/**
 * 本物の5角星（外径・内径を交互に配置した10頂点）
 */
export function buildFivePointStarPath(outerRadius = 100, innerRadius = 42): string {
  return pointsToPathD(
    segmentAngles().map((angle, index) =>
      polar(angle, index % 2 === 0 ? outerRadius : innerRadius),
    ),
  )
}

/**
 * 正方形パス（中心からのレイと正方形辺の交点）
 */
export function buildSquarePath(halfSize = 100): string {
  return pointsToPathD(
    segmentAngles().map((angle) => {
      const dx = Math.cos(angle)
      const dy = Math.sin(angle)
      const scale = halfSize / Math.max(Math.abs(dx), Math.abs(dy))
      return {
        x: roundCoord(GSAP_SVG_SHAPE_CX + dx * scale),
        y: roundCoord(GSAP_SVG_SHAPE_CY + dy * scale),
      }
    }),
  )
}

/** 正三角形（上向き）の頂点 */
const TRIANGLE_VERTICES: SvgPoint[] = [
  { x: 160, y: 55 },
  { x: 265, y: 255 },
  { x: 55, y: 255 },
]

/**
 * レイと線分の交差距離 t を求める（t >= 0 のみ有効）
 */
function raySegmentHit(
  originX: number,
  originY: number,
  dirX: number,
  dirY: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number | null {
  const segX = bx - ax
  const segY = by - ay
  const denom = dirX * segY - dirY * segX
  if (Math.abs(denom) < 1e-10) return null

  const t = ((ax - originX) * segY - (ay - originY) * segX) / denom
  const u = ((ax - originX) * dirY - (ay - originY) * dirX) / denom

  if (t >= 0 && u >= 0 && u <= 1) return t
  return null
}

/**
 * 正三角形パス（レイと各辺の交点のうち最遠を採用）
 */
export function buildTrianglePath(): string {
  const points = segmentAngles().map((angle) => {
    const dirX = Math.cos(angle)
    const dirY = Math.sin(angle)
    let maxDistance = 0

    for (let i = 0; i < TRIANGLE_VERTICES.length; i++) {
      const a = TRIANGLE_VERTICES[i]
      const b = TRIANGLE_VERTICES[(i + 1) % TRIANGLE_VERTICES.length]
      const hit = raySegmentHit(
        GSAP_SVG_SHAPE_CX,
        GSAP_SVG_SHAPE_CY,
        dirX,
        dirY,
        a.x,
        a.y,
        b.x,
        b.y,
      )
      if (hit !== null && hit > maxDistance) maxDistance = hit
    }

    return {
      x: roundCoord(GSAP_SVG_SHAPE_CX + dirX * maxDistance),
      y: roundCoord(GSAP_SVG_SHAPE_CY + dirY * maxDistance),
    }
  })

  return pointsToPathD(points)
}

/**
 * 全シェイプの d が同一構造か簡易検証（開発・テスト用）
 */
export function assertCompatiblePathStructure(paths: string[]): boolean {
  const commandPattern = /^M[\d.,]+(?:L[\d.,]+){9}Z$/
  return paths.every(path => commandPattern.test(path))
}
