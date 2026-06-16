import { useState, useMemo } from 'react'
import FilterBar from './FilterBar'
import PropertyCard from './PropertyCard'
import SkeletonCard from './SkeletonCard'
import Reveal from './Reveal'

const DEFAULT_FILTERS = {
  search: '',
  sortPrice: '',
  sortDate: '',
  type: '',
  beds: '',
  minPrice: 400000,
  maxPrice: 7000000,
}

export default function Listings({ listings, loading, error }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [view, setView] = useState('grid')

  const filtered = useMemo(() => {
    let data = [...listings]

    if (filters.search) {
      const term = filters.search.toLowerCase()
      data = data.filter(
        (p) =>
          (p.formattedAddress || '').toLowerCase().includes(term) ||
          (p.city || '').toLowerCase().includes(term) ||
          (p.propertyType || '').toLowerCase().includes(term)
      )
    }

    data = data.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)

    if (filters.type) {
      data = data.filter((p) => p.propertyType === filters.type)
    }

    if (filters.beds) {
      const beds = parseInt(filters.beds)
      data = data.filter((p) => (beds >= 5 ? p.bedrooms >= 5 : p.bedrooms === beds))
    }

    if (filters.sortPrice === 'price-high') data.sort((a, b) => b.price - a.price)
    else if (filters.sortPrice === 'price-low') data.sort((a, b) => a.price - b.price)
    else if (filters.sortDate === 'date-new')
      data.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate))
    else if (filters.sortDate === 'date-old')
      data.sort((a, b) => new Date(a.listedDate) - new Date(b.listedDate))

    return data
  }, [listings, filters])

  const handleReset = () => setFilters(DEFAULT_FILTERS)

  return (
    <section id="listings">
      <div className="container">
        <div className="listings-top">
          <div>
            <Reveal as="span" className="section-label">
              <i className="fa-solid fa-list" /> Properties
            </Reveal>
            <Reveal as="h2" className="section-title" delay={1}>
              Browse <span>Latest Listings</span>
            </Reveal>
          </div>
          <Reveal
            as="p"
            className="section-subtitle"
            delay={2}
            style={{ maxWidth: 360, textAlign: 'right' }}
          >
            Use the filters below to narrow your search and find the perfect match.
          </Reveal>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} onReset={handleReset} />

        <div className="results-bar">
          <p className="results-count">
            Showing <strong>{loading ? '—' : filtered.length}</strong> properties
          </p>
          <div className="view-toggle">
            <button
              className={view === 'grid' ? 'view-btn active' : 'view-btn'}
              onClick={() => setView('grid')}
              title="Grid view"
            >
              <i className="fa-solid fa-grip" />
            </button>
            <button
              className={view === 'list' ? 'view-btn active' : 'view-btn'}
              onClick={() => setView('list')}
              title="List view"
            >
              <i className="fa-solid fa-list" />
            </button>
          </div>
        </div>

        <div className={view === 'list' ? 'listings-grid list-view' : 'listings-grid'}>
          {loading &&
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && error && (
            <div className="no-results">
              <i className="fa-solid fa-triangle-exclamation" />
              <h3>Couldn't Load Listings</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="no-results">
              <i className="fa-solid fa-house-circle-xmark" />
              <h3>No Properties Found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}

          {!loading &&
            !error &&
            filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
        </div>
      </div>
    </section>
  )
}
