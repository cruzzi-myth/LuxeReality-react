import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LINKS = [
  { id: 'about',    label: 'About' },
  { id: 'listings', label: 'Listings' },
  { id: 'reviews',  label: 'Reviews' },
  { id: 'realtors', label: 'Our Team' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
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
          <li><Link to="/">Home</Link></li>
          {LINKS.map((link) => (
            <li key={link.id}>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact Us</a>
          </li>
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
          <i className="fa-solid fa-xmark" />
        </button>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        {LINKS.map((link) => (
          <a key={link.id} href="#" onClick={(e) => { e.preventDefault(); scrollTo(link.id); setMenuOpen(false) }}>
            {link.label}
          </a>
        ))}
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('contact'); setMenuOpen(false) }}>Contact</a>
      </div>
    </>
  )
}
