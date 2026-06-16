import { useState } from 'react'
import Counter from './Counter'

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero">
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>
      <div className="hero-blob hero-blob-3"></div>

      <div className="hero-inner container">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="dot"></span>
            #1 Real Estate Platform in 2024
          </div>

          <h1 className="hero-title">
            Find Your <span className="highlight">Dream Home</span> Today
          </h1>

          <p className="hero-subtitle">
            Discover thousands of premium listings curated by our expert agents.
            From luxury penthouses to cozy family homes — your perfect property
            is just a search away.
          </p>

          <div className="hero-search-box">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search by city, neighborhood, or type…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="hero-search-btn" onClick={handleSearch}>
              <i className="fa-solid fa-arrow-right" /> &nbsp;Search
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <Counter target={1500} className="hero-stat-value" />
              <div className="hero-stat-label">Properties Listed</div>
            </div>
            <div>
              <Counter target={950} className="hero-stat-value" />
              <div className="hero-stat-label">Happy Clients</div>
            </div>
            <div>
              <Counter target={18} className="hero-stat-value" />
              <div className="hero-stat-label">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-prop-card">
            <div className="hero-prop-icon">🏡</div>
            <div>
              <div className="hero-prop-label">Featured Listing</div>
              <div className="hero-prop-value">Modern Hillside Villa</div>
              <div className="hero-prop-sub">Beverly Hills, CA &nbsp;·&nbsp; $2,850,000</div>
            </div>
          </div>
          <div className="hero-prop-card">
            <div className="hero-prop-icon">🏙️</div>
            <div>
              <div className="hero-prop-label">Just Listed</div>
              <div className="hero-prop-value">Downtown Penthouse</div>
              <div className="hero-prop-sub">Manhattan, NY &nbsp;·&nbsp; $4,200,000</div>
            </div>
          </div>
          <div className="hero-prop-card">
            <div className="hero-prop-icon">🌊</div>
            <div>
              <div className="hero-prop-label">Price Reduced</div>
              <div className="hero-prop-value">Beachfront Estate</div>
              <div className="hero-prop-sub">Malibu, CA &nbsp;·&nbsp; $6,500,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
