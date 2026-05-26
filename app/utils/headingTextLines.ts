/**
 * 見出しテキストを HTML エスケープする
 */
export function escapeHeadingHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * 改行（\\n）を &lt;br&gt; に変換して見出し要素へ反映する。
 * SplitText の lines 分割でも確実に行として認識させる。
 */
export function setHeadingTextWithLineBreaks(heading: HTMLElement, text: string): void {
  heading.innerHTML = text
    .split('\n')
    .map(escapeHeadingHtml)
    .join('<br>')
}

/**
 * 見出し要素からプレーンテキストを取得（改行を \\n に保持）
 */
export function getHeadingPlainText(heading: HTMLElement): string {
  return heading.innerText.replace(/\r\n/g, '\n')
}
