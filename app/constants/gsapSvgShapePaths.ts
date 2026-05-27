import {
  buildCirclePath,
  buildFivePointStarPath,
  buildSquarePath,
  buildTrianglePath,
} from '~/utils/gsapSvgCompatiblePaths'

/**
 * GSAP の attr.d 補間用シェイプ定義。
 * すべて M + 48×L + Z の同一構造（等角度レイキャスト）。
 */
export interface GsapSvgMorphShape {
  id: string
  label: string
  description: string
  /** SVG path の d 属性 */
  d: string
  /** 表示色（セクション識別用） */
  color: string
}

export const gsapSvgMorphShapes: GsapSvgMorphShape[] = [
  {
    id: 'circle',
    label: '丸',
    description: '円形（48頂点の等角度サンプリング）',
    d: buildCirclePath(100),
    color: '#5b3ea8',
  },
  {
    id: 'square',
    label: '四角',
    description: '正方形（レイと辺の交点）',
    d: buildSquarePath(100),
    color: '#1a6b4a',
  },
  {
    id: 'triangle',
    label: '三角',
    description: '正三角形（上向き・周長等分割）',
    d: buildTrianglePath(),
    color: '#c45c26',
  },
  {
    id: 'star',
    label: '星',
    description: '本物の5角星（外径100 / 内径42・周長等分割）',
    d: buildFivePointStarPath(100, 42),
    color: '#0984e3',
  },
]
