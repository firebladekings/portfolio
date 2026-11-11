import { useEffect, useRef, useState } from 'react'

/** Fades and lifts its children in the first time they scroll into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const ref = useRef()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? 'is-shown' : ''} ${className}`}>
      {children}
    </Tag>
  )
}
