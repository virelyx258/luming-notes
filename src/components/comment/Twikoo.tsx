import { useEffect, useRef } from 'react'
import 'twikoo/dist/twikoo.css'

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
