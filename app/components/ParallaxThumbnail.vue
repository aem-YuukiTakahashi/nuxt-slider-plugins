<template>
  <article
    ref="root"
    class="parallax-thumbnail"
    :class="`parallax-thumbnail--ratio-${aspect}`"
  >
    <div class="parallax-thumbnail__frame">
      <div class="parallax-thumbnail__inner js-gsap-parallax-inner">
        <img
          class="parallax-thumbnail__img js-gsap-parallax-img"
          :src="src"
          :alt="alt"
          :style="{ '--overscan': overscan }"
          loading="lazy"
          decoding="async"
          @load="handleImageLoad"
        >
      </div>
    </div>
    <p
      v-if="caption"
      class="parallax-thumbnail__caption"
    >
      {{ caption }}
    </p>
  </article>
</template>

<script setup lang="ts">
/**
 * サムネイルのアスペクト比
 * - `4-3`: 横長（4:3）
 * - `3-4`: 縦長（3:4）
 */
export type ParallaxThumbnailAspect = '4-3' | '3-4'

const props = withDefaults(
  defineProps<{
    /** 画像URL */
    src: string
    /** 代替テキスト */
    alt?: string
    /** アスペクト比 */
    aspect: ParallaxThumbnailAspect
    /** キャプション（任意） */
    caption?: string
    /**
     * スクロール連動パララックスの移動量（%）
     * 画像の上下方向の移動幅。大きいほど動きが強くなる
     */
    parallax?: number
  }>(),
  {
    alt: '',
    parallax: 12,
  },
)

const root = ref<HTMLElement | null>(null)
const { gsap, ScrollTrigger } = useGsap()

/**
 * 枠より縦に大きくする量（%）。
 * parallax の移動量（±%）の約3倍を上下の余白として確保する
 */
const overscan = computed(() => `${props.parallax * 3}%`)

/**
 * 画像読み込み後に ScrollTrigger を再計算し、
 * レイアウト確定後のパララックス位置ずれを防ぐ
 */
function handleImageLoad() {
  ScrollTrigger?.refresh()
}

useGsapContext(root, () => {
  gsap.fromTo(
    '.js-gsap-parallax-img',
    { yPercent: -props.parallax },
    {
      yPercent: props.parallax,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top bottom',
        end: 'bottom top',
        /** fv-scroll と同じ（秒）。軽い追従ラグでスクロールとの同期を滑らかにする */
        scrub: 0.6,
      },
    },
  )
})
</script>

<style scoped>
.parallax-thumbnail {
  width: 100%;
}

.parallax-thumbnail__frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  /* 枠内カバー判定用（画像がはみ出さないと背景が見える） */
  background: #e4e4e7;
}

/* 横長 4:3 */
.parallax-thumbnail--ratio-4-3 .parallax-thumbnail__frame {
  aspect-ratio: 4 / 3;
}

/* 縦長 3:4 */
.parallax-thumbnail--ratio-3-4 .parallax-thumbnail__frame {
  aspect-ratio: 3 / 4;
}

.parallax-thumbnail__inner {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.parallax-thumbnail__img {
  position: absolute;
  left: 0;
  width: 100%;
  /* 枠(100%) + 上下余白(--overscan)。top で中央寄せ */
  height: calc(100% + var(--overscan));
  top: calc(var(--overscan) / -2);
  display: block;
  object-fit: cover;
  object-position: center center;
  will-change: transform;
}

.parallax-thumbnail__caption {
  margin: 0.75rem 0 0;
  font-size: 0.875rem;
  color: #52525b;
}
</style>
