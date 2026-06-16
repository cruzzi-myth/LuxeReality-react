import { useEffect } from 'react'
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

  const handleHeroSearch = (query) => {
    if (query.trim()) {
      searchCity(query)
    }
  }

  useEffect(() => {
    document.title = 'LuxeRealty | Find Your Dream Home'
  }, [])

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
