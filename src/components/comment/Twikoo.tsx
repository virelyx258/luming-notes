import { useEffect, useRef } from 'react'

export function Twikoo({ envId }: { envId: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    import('twikoo').then(({ init }) => {
      init({
        envId,
        el: ref.current,
      })
    })
  }, [envId])

  return <div ref={ref}></div>
}
