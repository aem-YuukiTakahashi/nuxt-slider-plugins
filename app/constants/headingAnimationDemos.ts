/**
 * 見出し GSAP アニメーションの種別
 */
export type HeadingAnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'clip-reveal'
  | 'blur-in'
  | 'scale-in'
  | 'char-stagger'
  | 'word-stagger'
  | 'underline-reveal'
  | 'slide-left'
  | 'slide-right'
  | 'rotate-in'
  | 'flip-up'
  | 'line-stagger'
  | 'line-mask'
  | 'char-random'
  | 'elastic-in'
  | 'skew-in'
  | 'clip-horizontal'
  | 'bounce-up'
  | 'tracking-expand'
  | 'scramble-text'
  | 'accent-bar'
  | 'bracket-reveal'
  | 'char-wave'
  | 'glitch-rich'

/** クリップ用ラッパーが必要なバリアント */
export const headingVariantsWithClip = ['clip-reveal', 'clip-horizontal'] as const

/** 下線要素が必要なバリアント */
export const headingVariantsWithUnderline = ['underline-reveal'] as const

/** 左アクセントバーが必要なバリアント */
export const headingVariantsWithAccent = ['accent-bar'] as const

/** 括弧装飾が必要なバリアント */
export const headingVariantsWithBrackets = ['bracket-reveal'] as const

/** RGB ゴーストレイヤーが必要なバリアント */
export const headingVariantsWithGlitchStack = ['glitch-rich'] as const

/** 改行複数行デモ */
export const headingVariantsMultiline = ['line-stagger', 'line-mask'] as const

/**
 * デモページ用の見出しアニメーション定義
 */
export interface HeadingAnimationDemo {
  id: string
  variant: HeadingAnimationVariant
  /** デモ番号・パターン名 */
  label: string
  /** アニメーション対象の見出しテキスト */
  title: string
  /** パターンの説明 */
  description: string
}

export const headingAnimationDemos: HeadingAnimationDemo[] = [
  {
    id: 'fade-up',
    variant: 'fade-up',
    label: '01 — Fade Up',
    title: 'Fade Up',
    description: '下からフェードイン。汎用的なセクション見出し向け。',
  },
  {
    id: 'fade-down',
    variant: 'fade-down',
    label: '02 — Fade Down',
    title: 'Fade Down',
    description: '上から落ちるように表示。ヒーロー直下の見出しなどに。',
  },
  {
    id: 'clip-reveal',
    variant: 'clip-reveal',
    label: '03 — Clip Reveal',
    title: 'Clip Reveal',
    description: 'マスク内で下からスライド。エディトリアルな見出し向け。',
  },
  {
    id: 'blur-in',
    variant: 'blur-in',
    label: '04 — Blur In',
    title: 'Blur In',
    description: 'ぼかしからくっきり。柔らかい印象の導入に。',
  },
  {
    id: 'scale-in',
    variant: 'scale-in',
    label: '05 — Scale In',
    title: 'Scale In',
    description: '少し縮小した状態から拡大。インパクトのある見出しに。',
  },
  {
    id: 'char-stagger',
    variant: 'char-stagger',
    label: '06 — Char Stagger',
    title: 'Character',
    description: '1文字ずつ順に表示（SplitText）。',
  },
  {
    id: 'word-stagger',
    variant: 'word-stagger',
    label: '07 — Word Stagger',
    title: 'Word By Word',
    description: '単語単位で順に表示（SplitText）。',
  },
  {
    id: 'underline-reveal',
    variant: 'underline-reveal',
    label: '08 — Underline Reveal',
    title: 'Underline',
    description: '見出し表示後に下線が左から伸びる。',
  },
  {
    id: 'slide-left',
    variant: 'slide-left',
    label: '09 — Slide Left',
    title: 'Slide Left',
    description: '左の外からスライドイン。',
  },
  {
    id: 'slide-right',
    variant: 'slide-right',
    label: '10 — Slide Right',
    title: 'Slide Right',
    description: '右の外からスライドイン。',
  },
  {
    id: 'rotate-in',
    variant: 'rotate-in',
    label: '11 — Rotate In',
    title: 'Rotate In',
    description: 'わずかに回転しながら登場。左下を軸にした動き。',
  },
  {
    id: 'flip-up',
    variant: 'flip-up',
    label: '12 — Flip Up',
    title: 'Flip Up',
    description: '3D フリップ（rotateX）でめくるように表示。',
  },
  {
    id: 'line-stagger',
    variant: 'line-stagger',
    label: '13 — Line Stagger',
    title: 'Line Stagger',
    description:
      '各行がフェード＋下から浮かび上がる（13）。行全体が薄くなりながら現れる動き。',
  },
  {
    id: 'line-mask',
    variant: 'line-mask',
    label: '14 — Line Mask',
    title: 'Line Mask',
    description:
      '各行が「横長の枠（マスク）」の中から下からスライドして現れる（14）。切り抜き感・シャッター感。',
  },
  {
    id: 'char-random',
    variant: 'char-random',
    label: '15 — Char Random',
    title: 'Random',
    description: '文字がランダム順で飛び込む（SplitText）。',
  },
  {
    id: 'elastic-in',
    variant: 'elastic-in',
    label: '16 — Elastic In',
    title: 'Elastic',
    description: '弾むようなスケールで強調。',
  },
  {
    id: 'skew-in',
    variant: 'skew-in',
    label: '17 — Skew In',
    title: 'Skew In',
    description: '斜めから真っ直ぐに。スピード感のある見出しに。',
  },
  {
    id: 'clip-horizontal',
    variant: 'clip-horizontal',
    label: '18 — Clip Horizontal',
    title: 'Wipe',
    description: '左から clip-path でワイプ表示。',
  },
  {
    id: 'bounce-up',
    variant: 'bounce-up',
    label: '19 — Bounce Up',
    title: 'Bounce Up',
    description: 'バウンスイージングで下から跳ねるように。',
  },
  {
    id: 'tracking-expand',
    variant: 'tracking-expand',
    label: '20 — Tracking Expand',
    title: 'Tracking',
    description: '字間が広い状態から通常へ。ロゴ・キャッチコピー向け。',
  },
  {
    id: 'scramble-text',
    variant: 'scramble-text',
    label: '21 — Scramble Text',
    title: 'Scramble',
    description: 'ランダム文字から本文へ復元（ScrambleText）。',
  },
  {
    id: 'accent-bar',
    variant: 'accent-bar',
    label: '22 — Accent Bar',
    title: 'Accent Bar',
    description: '左の縦線が伸びてから見出しがフェードイン。',
  },
  {
    id: 'bracket-reveal',
    variant: 'bracket-reveal',
    label: '23 — Bracket Reveal',
    title: 'Bracket',
    description: '括弧が開いてから見出しが表示される。',
  },
  {
    id: 'char-wave',
    variant: 'char-wave',
    label: '24 — Char Wave',
    title: 'Make Your Heading Wave',
    description: '文字が左から順に、波のように浮き上がる。文字数が少ないと効果が分かりにくい。',
  },
  {
    id: 'glitch-rich',
    variant: 'glitch-rich',
    label: '25 — Glitch',
    title: 'Glitch',
    description: 'Canvas なし。GSAP + DOM で flowLine / shiftLine / RGB / scat を近似（CodePen 参考）。',
  },
]
