import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, as = 'div', className = '', delay = 0, style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const Tag = as
  const delayClass = delay ? `delay-${delay}` : ''
  const classes = `reveal ${delayClass} ${visible ? 'visible' : ''} ${className}`.trim()

  return (
    <Tag ref={ref} className={classes} style={style}>
      {children}
    </Tag>
  )
}
