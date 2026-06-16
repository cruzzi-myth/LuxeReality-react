import { useEffect, useRef, useState } from 'react'

export default function Counter({ target, suffix = '+', className }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true
            runCount()
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  function runCount() {
    const duration = 2000
    const step = 16
    const increment = target / (duration / step)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setValue(current)
    }, step)
  }

  const display = Number.isInteger(target)
    ? Math.floor(value).toLocaleString()
    : value.toFixed(1)

  return (
    <div ref={ref} className={className}>
      {display}{suffix}
    </div>
  )
}
