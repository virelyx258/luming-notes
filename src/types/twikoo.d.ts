declare module 'twikoo' {
  export function init(options: {
    envId: string
    el: string | HTMLElement | null
    onCommentLoaded?: () => void
  }): void
}
