import { useState } from 'react'

const MIN_BOUND = 400000
const MAX_BOUND = 7000000

function formatSliderPrice(val) {
  if (val >= 1000000) {
    const m = val / 1000000
    return '$' + (Number.isInteger(m) ? m : m.toFixed(1)) + 'M'
  }
  return '$' + (val / 1000).toFixed(0) + 'K'
}

export default function PriceRange({ min, max, onChange }) {
  const [dragging, setDragging] = useState(null) // 'min' | 'max' | null

  const handleMin = (e) => {
    let val = parseInt(e.target.value)
    if (val > max - 50000) val = max - 50000
    onChange(val, max)
  }

  const handleMax = (e) => {
    let val = parseInt(e.target.value)
    if (val < min + 50000) val = min + 50000
    onChange(min, val)
  }

  const leftPct = ((min - MIN_BOUND) / (MAX_BOUND - MIN_BOUND)) * 100
  const rightPct = ((max - MIN_BOUND) / (MAX_BOUND - MIN_BOUND)) * 100

  return (
    <div className="price-range-row">
      <div className="price-range-header">
        <span className="price-range-lbl">
          <i className="fa-solid fa-sliders" /> Price Range
        </span>
        <div className="price-range-vals">
          <span>{formatSliderPrice(min)}</span>
          <span className="pr-sep">—</span>
          <span>{formatSliderPrice(max)}</span>
        </div>
      </div>

      <div className="dual-range-wrap">
        <div className="range-track-bg"></div>
        <div
          className="range-track-fill"
          style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
        ></div>
        <input
          type="range"
          min={MIN_BOUND}
          max={MAX_BOUND}
          step={50000}
          value={min}
          onChange={handleMin}
          onMouseDown={() => setDragging('min')}
        />
        <input
          type="range"
          min={MIN_BOUND}
          max={MAX_BOUND}
          step={50000}
          value={max}
          onChange={handleMax}
          onMouseDown={() => setDragging('max')}
        />
      </div>

      <div className="price-ticks">
        <span className="price-tick">$400K</span>
        <span className="price-tick">$1.75M</span>
        <span className="price-tick">$3.5M</span>
        <span className="price-tick">$5.25M</span>
        <span className="price-tick">$7M+</span>
      </div>
    </div>
  )
}
