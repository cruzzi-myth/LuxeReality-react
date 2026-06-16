import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/explore#about',    label: 'About' },
  { href: '/explore#listings', label: 'Listings' },
  { href: '/explore#reviews',  label: 'Reviews' },
  { href: '/explore#realtors', label: 'Our Team' },
]

const TYPE_CHIPS = ['All', 'Single Family', 'Condo', 'Townhouse', 'Multi-Family']

const QUICK_CITIES = [
  { label: 'Los Angeles', city: 'Los Angeles', state: 'CA' },
  { label: 'New York',    city: 'New York',    state: 'NY' },
  { label: 'Miami',       city: 'Miami',       state: 'FL' },
  { label: 'Austin',      city: 'Austin',      state: 'TX' },
  { label: 'Chicago',     city: 'Chicago',     state: 'IL' },
  { label: 'Seattle',     city: 'Seattle',     state: 'WA' },
]

function HomeNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="nav-logo">
          <div className="nav-logo-icon">
            <i className="fa-solid fa-building-columns" />
          </div>
          <span className="nav-logo-text">LuxeRealty</span>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
          <li><a href="/explore" className="nav-cta">Browse All</a></li>
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
          <i className="fa-solid fa-xmark" />
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
        ))}
        <a href="/explore" onClick={() => setMenuOpen(false)}>Browse All</a>
      </div>
    </>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [city, setCity]                 = useState('')
  const [state, setState]               = useState('')
  const [selectedType, setSelectedType] = useState('All')

  useEffect(() => {
    document.title = 'LuxeRealty | Find Your Dream Home'
  }, [])

  const goToResults = (searchCity, searchState, type) => {
    const c = searchCity.trim()
    const s = searchState.trim()
    if (!c || !s) return
    const params = new URLSearchParams({ city: c, state: s.toUpperCase() })
    if (type && type !== 'All') params.set('type', type)
    navigate(`/results?${params.toString()}`)
  }

  const handleSearch = () => goToResults(city, state, selectedType)

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch() }

  const handleQuickCity = (q) => {
    setCity(q.city)
    setState(q.state)
    goToResults(q.city, q.state, selectedType)
  }

  return (
    <>
      <HomeNav />

      <section id="home-hero">
        <div className="home-blob home-blob-1" />
        <div className="home-blob home-blob-2" />
        <div className="home-blob home-blob-3" />

        <div className="home-inner">
          <div className="home-badge">
            <span className="dot" />
            Live listings · Updated daily
          </div>

          <h1 className="home-title">
            Discover Your<br />
            <span className="home-highlight">Perfect Property</span>
          </h1>

          <p className="home-sub">
            Search thousands of active listings powered by real-time Rentcast data.
            Find homes, condos, and investment properties across the country.
          </p>

          <div className="home-search-wrap">
            <div className="home-search-box">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                className="home-input-city"
                type="text"
                placeholder="City — e.g. Miami"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="home-input-divider" />
              <input
                className="home-input-state"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={2}
              />
              <button className="home-search-btn" onClick={handleSearch}>
                <i className="fa-solid fa-arrow-right" />
                &nbsp;Search
              </button>
            </div>

            <div className="home-chips">
              {TYPE_CHIPS.map((t) => (
                <button
                  key={t}
                  className={selectedType === t ? 'home-chip active' : 'home-chip'}
                  onClick={() => setSelectedType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="home-quick">
              <span className="home-quick-label">Popular:</span>
              {QUICK_CITIES.map((c) => (
                <button key={c.label} className="home-quick-btn" onClick={() => handleQuickCity(c)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
