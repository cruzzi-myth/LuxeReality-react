import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LINKS = [
  { href: '#about',    label: 'About' },
  { href: '#listings', label: 'Listings' },
  { href: '#reviews',  label: 'Reviews' },
  { href: '#realtors', label: 'Our Team' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

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
          <li><a href="#">Home</a></li>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta">Contact Us</a>
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
        <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </>
  )
}
