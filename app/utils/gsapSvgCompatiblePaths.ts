/**
 * GSAP の attr.d 補間用に、同一コマンド構造（M + N×L + Z）の SVG パスを生成する。
 * 円は等角度サンプリング、多角形は周長に沿った等間隔サンプリング（非凸の星でも輪郭が崩れない）。
 */

/** ビューボックス中心 X */
export const GSAP_SVG_SHAPE_CX = 160

/** ビューボックス中心 Y */
export const GSAP_SVG_SHAPE_CY = 160

/**
 * 全シェイプ共通の頂点数。
 * GSAP の attr.d 補間は M + N×L + Z の構造一致が必須のため、
 * 円の見た目を滑らかにするにはサンプル数を多くする（10 だと正十角形に見える）。
 */
export const GSAP_SVG_SHAPE_VERTEX_COUNT = 48

interface SvgPoint {
  x: number
  y: number
}

/**
 * 数値を SVG 出力用に丸める
 */
function roundCoord(value: number, digits = 2): number {
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
 * ポリゴン周上の距離（時計回り）から座標を求める
 */
function pointAtPerimeterDistance(
  vertices: SvgPoint[],
  edgeLengths: number[],
  distance: number,
  perimeter: number,
): SvgPoint {
  let remaining = distance % perimeter

  for (let i = 0; i < vertices.length; i++) {
    const edgeLength = edgeLengths[i]
    if (remaining > edgeLength && i < vertices.length - 1) {
      remaining -= edgeLength
      continue
    }

    const a = vertices[i]
    const b = vertices[(i + 1) % vertices.length]
    const t = edgeLength === 0 ? 0 : remaining / edgeLength

    return {
      x: roundCoord(a.x + (b.x - a.x) * t),
      y: roundCoord(a.y + (b.y - a.y) * t),
    }
  }

  return vertices[0]
}

/**
 * 最上端の頂点を周上の起点（モーフ時の index 0 を揃える）とする距離を返す
 */
function findTopPerimeterOffset(vertices: SvgPoint[], edgeLengths: number[]): number {
  let bestY = Infinity
  let bestX = Infinity
  let bestOffset = 0
  let walked = 0

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i]
    if (vertex.y < bestY || (vertex.y === bestY && vertex.x < bestX)) {
      bestY = vertex.y
      bestX = vertex.x
      bestOffset = walked
    }
    walked += edgeLengths[i]
  }

  return bestOffset
}

/**
 * ポリゴン周長を等分割して頂点を生成（稜線に沿って順に結ぶ）
 */
function samplePolygonPerimeter(
  vertices: SvgPoint[],
  count: number = GSAP_SVG_SHAPE_VERTEX_COUNT,
): SvgPoint[] {
  const edgeLengths = vertices.map((start, index) => {
    const end = vertices[(index + 1) % vertices.length]
    return Math.hypot(end.x - start.x, end.y - start.y)
  })
  const perimeter = edgeLengths.reduce((sum, length) => sum + length, 0)
  const step = perimeter / count
  const startOffset = findTopPerimeterOffset(vertices, edgeLengths)

  return Array.from({ length: count }, (_, index) => {
    const distance = (startOffset + index * step) % perimeter
    return pointAtPerimeterDistance(vertices, edgeLengths, distance, perimeter)
  })
}

/**
 * 円形パス（半径一定の等角度サンプリング）
 */
export function buildCirclePath(radius = 100): string {
  return pointsToPathD(segmentAngles().map(angle => polar(angle, radius)))
}

/**
 * 5角星の稜線（外5 + 内5、上端の外頂点から時計回り）
 */
function fivePointStarOutline(outerRadius: number, innerRadius: number): SvgPoint[] {
  return segmentAngles(10).map((angle, index) =>
    polar(angle, index % 2 === 0 ? outerRadius : innerRadius),
  )
}

/**
 * 本物の5角星（周長等分割サンプリング）
 */
export function buildFivePointStarPath(outerRadius = 100, innerRadius = 42): string {
  return pointsToPathD(samplePolygonPerimeter(fivePointStarOutline(outerRadius, innerRadius)))
}

/**
 * 正方形の角（上辺中央から時計回り）
 */
function squareVertices(halfSize: number): SvgPoint[] {
  return [
    { x: GSAP_SVG_SHAPE_CX, y: GSAP_SVG_SHAPE_CY - halfSize },
    { x: GSAP_SVG_SHAPE_CX + halfSize, y: GSAP_SVG_SHAPE_CY },
    { x: GSAP_SVG_SHAPE_CX, y: GSAP_SVG_SHAPE_CY + halfSize },
    { x: GSAP_SVG_SHAPE_CX - halfSize, y: GSAP_SVG_SHAPE_CY },
  ]
}

/**
 * 正方形パス（周長等分割サンプリング）
 */
export function buildSquarePath(halfSize = 100): string {
  return pointsToPathD(samplePolygonPerimeter(squareVertices(halfSize)))
}

/** 正三角形（上向き、上頂点から時計回り） */
const TRIANGLE_VERTICES: SvgPoint[] = [
  { x: 160, y: 55 },
  { x: 265, y: 255 },
  { x: 55, y: 255 },
]

/**
 * 正三角形パス（周長等分割サンプリング）
 */
export function buildTrianglePath(): string {
  return pointsToPathD(samplePolygonPerimeter(TRIANGLE_VERTICES))
}

/**
 * 全シェイプの d が同一構造か簡易検証（開発・テスト用）
 */
export function assertCompatiblePathStructure(paths: string[]): boolean {
  const lineCount = GSAP_SVG_SHAPE_VERTEX_COUNT - 1
  const commandPattern = new RegExp(`^M[\\d.,]+(?:L[\\d.,]+){${lineCount}}Z$`)
  return paths.every(path => commandPattern.test(path))
}
