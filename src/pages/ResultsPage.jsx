import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { rentcast } from '../lib/rentcast'
import PropertyCard from '../components/PropertyCard'
import SkeletonCard from '../components/SkeletonCard'

const NAV_LINKS = [
  { label: 'About',    to: '/explore' },
  { label: 'Listings', to: '/explore' },
  { label: 'Reviews',  to: '/explore' },
  { label: 'Our Team', to: '/explore' },
]

function ResultsNav() {
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
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">
            <i className="fa-solid fa-building-columns" />
          </div>
          <span className="nav-logo-text">LuxeRealty</span>
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
          <li><Link to="/explore" className="nav-cta">Browse All</Link></li>
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
          <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link to="/explore" onClick={() => setMenuOpen(false)}>Browse All</Link>
      </div>
    </>
  )
}

export default function ResultsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const city  = searchParams.get('city')  || ''
  const state = searchParams.get('state') || ''
  const type  = searchParams.get('type')  || 'All'

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    document.title = `LuxeRealty | ${city}, ${state} Results`
    if (!city || !state) { navigate('/'); return }

    let cancelled = false

    const fetchResults = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = { city, state, status: 'Active', limit: 6 }
        if (type && type !== 'All') params.propertyType = type

        const res = await rentcast.get('/listings/sale', { params })
        if (cancelled) return

        let data = res.data
        if (type && type !== 'All') {
          data = data.filter((p) => p.propertyType === type)
        }

        setResults(data)

        if (data.length === 0) {
          const typeLabel = type !== 'All' ? type.toLowerCase() + ' ' : ''
          setError(`No ${typeLabel}listings found in ${city}, ${state}.`)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Something went wrong. Try a different city.')
          setResults([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchResults()
    return () => { cancelled = true }
  }, [city, state, type])

  const label = `${city}, ${state}`

  return (
    <>
      <ResultsNav />

      <section id="results-hero">
        <div className="home-blob home-blob-1" style={{ opacity: 0.5 }} />
        <div className="home-blob home-blob-2" style={{ opacity: 0.4 }} />
        <div className="results-hero-inner">
          <Link to="/" className="results-back">
            <i className="fa-solid fa-arrow-left" /> New Search
          </Link>
          <h1 className="results-title">
            {loading
              ? 'Searching listings…'
              : error
              ? 'No Results Found'
              : <><span className="home-highlight">{results.length}</span> {results.length === 1 ? 'Property' : 'Properties'} in {label}</>
            }
          </h1>
          {type !== 'All' && (
            <div className="results-type-badge">{type}</div>
          )}
        </div>
      </section>

      <section id="home-results">
        <div className="container">
          <div className="listings-grid">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

            {!loading && error && (
              <div className="no-results">
                <i className="fa-solid fa-house-circle-xmark" />
                <h3>No Results Found</h3>
                <p>{error}</p>
                <Link to="/" className="results-back-link">
                  <i className="fa-solid fa-arrow-left" /> Back to search
                </Link>
              </div>
            )}

            {!loading && !error && results.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>

          {!loading && !error && results.length > 0 && (
            <div className="results-footer">
              <Link to="/" className="results-back-link">
                <i className="fa-solid fa-arrow-left" /> New Search
              </Link>
              <Link to="/explore" className="home-browse-all">
                Browse all listings <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
