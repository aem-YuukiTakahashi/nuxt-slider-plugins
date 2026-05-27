import type { CardListItem } from '~/components/CardList.vue'
import type { TextListItem } from '~/components/TextList.vue'

/**
 * LP セクション定義
 */
export interface LpSection {
  id: string
  navLabel: string
  title: string
  lead: string
  textItems: TextListItem[]
  cardItems: CardListItem[]
  /** YouTube 埋め込み用 video ID */
  youtubeId: string
  videoCaption: string
}

/** LP バーガーメニュー・フッター用ナビ（ページ内スクロール） */
export const lpNavItems = [
  { id: 'section-hero', label: 'Top' },
  { id: 'section-vision', label: 'Vision' },
  { id: 'section-works', label: 'Works' },
  { id: 'section-studio', label: 'Studio' },
] as const

/** LP 各セクションのコンテンツ */
export const lpSections: LpSection[] = [
  {
    id: 'section-vision',
    navLabel: 'Vision',
    title: 'Vision',
    lead: 'GSAP と ScrollTrigger で、スクロールに合わせてコンテンツが立ち上がる体験を設計します。',
    textItems: [
      {
        id: 'v1',
        title: 'Scroll-driven storytelling',
        description: 'セクションごとにテキスト・カード・動画が順番に現れるリズムを作り、読み進める動機を高めます。',
        meta: '01 · Concept',
      },
      {
        id: 'v2',
        title: 'Performance-first motion',
        description: 'transform / opacity を中心にしたアニメーションで、滑らかさと軽さを両立します。',
        meta: '02 · Performance',
      },
      {
        id: 'v3',
        title: 'Accessible by default',
        description: 'prefers-reduced-motion を考慮し、動きを抑えた閲覧にも対応できる構成にします。',
        meta: '03 · A11y',
      },
    ],
    cardItems: [
      {
        id: 'vc1',
        src: 'https://picsum.photos/seed/lp-vision-1/800/600',
        alt: 'Abstract light',
        title: 'Light Field',
        description: 'ヒーローからの視線誘導を意識したラディアルグラデーション。',
        meta: 'Visual · 01',
      },
      {
        id: 'vc2',
        src: 'https://picsum.photos/seed/lp-vision-2/800/600',
        alt: 'Minimal architecture',
        title: 'Quiet Structure',
        description: '余白とタイポグラフィでメッセージを際立たせるレイアウト。',
        meta: 'Visual · 02',
      },
      {
        id: 'vc3',
        src: 'https://picsum.photos/seed/lp-vision-3/800/600',
        alt: 'Urban texture',
        title: 'Urban Texture',
        description: 'スクロール連動のパララックスで奥行きを付与。',
        meta: 'Visual · 03',
      },
    ],
    youtubeId: 'aqz-KE-bpKQ',
    videoCaption: 'Big Buck Bunny（Blender Foundation / クリエイティブ・コモンズ）',
  },
  {
    id: 'section-works',
    navLabel: 'Works',
    title: 'Works',
    lead: 'テキストリストとカードグリッドを組み合わせ、実績や機能を段階的に伝えるセクションです。',
    textItems: [
      {
        id: 'w1',
        title: 'Campaign microsites',
        description: '期間限定の訴求に合わせ、FV・導線・CTA を一貫したモーションで統一。',
        meta: 'Case · Campaign',
      },
      {
        id: 'w2',
        title: 'Product launch pages',
        description: '機能紹介をスクロールシーケンス化し、理解の順序をデザインします。',
        meta: 'Case · Product',
      },
      {
        id: 'w3',
        title: 'Brand guidelines in motion',
        description: 'トーン＆マナーを動きのルールとしてドキュメント化。',
        meta: 'Case · Brand',
      },
      {
        id: 'w4',
        title: 'Editorial layouts',
        description: '長文でも離脱しにくい、リズムのあるタイポグラフィと演出。',
        meta: 'Case · Editorial',
      },
    ],
    cardItems: [
      {
        id: 'wc1',
        src: 'https://picsum.photos/seed/lp-works-1/800/600',
        alt: 'Workspace',
        title: 'Workspace UI',
        description: 'カードホバーは CSS、登場は GSAP の stagger。',
        meta: 'UI · Dashboard',
      },
      {
        id: 'wc2',
        src: 'https://picsum.photos/seed/lp-works-2/800/600',
        alt: 'Mobile app',
        title: 'Mobile Flow',
        description: 'デバイスモックと連動したスクロール演出。',
        meta: 'UI · Mobile',
      },
      {
        id: 'wc3',
        src: 'https://picsum.photos/seed/lp-works-3/800/600',
        alt: 'E-commerce',
        title: 'Commerce LP',
        description: '商品カードの視線誘導と CTA の強調。',
        meta: 'UI · EC',
      },
      {
        id: 'wc4',
        src: 'https://picsum.photos/seed/lp-works-4/800/600',
        alt: 'Event site',
        title: 'Event Microsite',
        description: 'タイムライン表示とカウントダウン連動。',
        meta: 'UI · Event',
      },
    ],
    youtubeId: 'jNQXAC9IVRw',
    videoCaption: 'Me at the zoo（YouTube 初投稿動画 / パブリックドメイン相当の記録映像）',
  },
  {
    id: 'section-studio',
    navLabel: 'Studio',
    title: 'Studio',
    lead: 'チーム・プロセス・問い合わせ導線まで、LP の締めくくりとして情報を集約します。',
    textItems: [
      {
        id: 's1',
        title: 'Design × Engineering',
        description: 'Figma から実装まで一気通貫。モーション仕様を早期に共有します。',
        meta: 'Team',
      },
      {
        id: 's2',
        title: 'Prototype in browser',
        description: '本番に近い環境で GSAP を検証し、手戻りを減らします。',
        meta: 'Process',
      },
      {
        id: 's3',
        title: 'Handoff with context',
        description: 'ScrollTrigger のトリガー位置や scrub 値までドキュメント化。',
        meta: 'Deliverable',
      },
    ],
    cardItems: [
      {
        id: 'sc1',
        src: 'https://picsum.photos/seed/lp-studio-1/800/600',
        alt: 'Team collaboration',
        title: 'Collaboration',
        description: 'ペアでのアニメーション調整セッション。',
        meta: 'Culture',
      },
      {
        id: 'sc2',
        src: 'https://picsum.photos/seed/lp-studio-2/800/600',
        alt: 'Office',
        title: 'Studio Space',
        description: '集中と共有のバランスを取ったオープンスペース。',
        meta: 'Culture',
      },
      {
        id: 'sc3',
        src: 'https://picsum.photos/seed/lp-studio-3/800/600',
        alt: 'Workshop',
        title: 'Motion Workshop',
        description: '社内勉強会で easing と stagger を共同研究。',
        meta: 'Culture',
      },
    ],
    youtubeId: '9bZkp7q19f0',
    videoCaption: 'GANGNAM STYLE（公式 MV / 埋め込みデモ用）',
  },
]
