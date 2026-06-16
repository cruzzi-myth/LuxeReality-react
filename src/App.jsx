import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useListings } from './hooks/useListings'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Listings from './components/Listings'
import Advisor from './components/Advisor'
import Reviews from './components/Reviews'
import Realtors from './components/Realtors'
import Contact from './components/Contact'
import ScrollTopButton from './components/ScrollTopButton'

export default function App() {
  const { listings, loading, error, searchCity } = useListings()
  const location = useLocation()

  const handleHeroSearch = (query) => {
    if (query.trim()) {
      searchCity(query)
    }
  }

  useEffect(() => {
    document.title = 'LuxeRealty | Find Your Dream Home'
  }, [])

  useEffect(() => {
    const section = location.state?.scrollTo
    if (section) {
      const el = document.getElementById(section)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.state])

  return (
    <>
      <Navbar />
      <Hero onSearch={handleHeroSearch} />
      <About />
      <Listings listings={listings} loading={loading} error={error} />
      <Advisor listings={listings} />
      <Reviews />
      <Realtors />
      <Contact />
      <ScrollTopButton />
    </>
  )
}
