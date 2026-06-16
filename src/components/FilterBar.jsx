import PriceRange from './PriceRange'

export default function FilterBar({ filters, setFilters, onReset }) {
  const update = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })

  return (
    <div className="filter-bar reveal visible">
      <div className="filter-row">
        <div className="filter-group search-group">
          <label className="filter-lbl">Search</label>
          <div style={{ position: 'relative' }}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)',
                fontSize: '.88rem',
                pointerEvents: 'none',
              }}
            />
            <input
              className="f-control"
              type="text"
              placeholder="City, neighborhood, or type…"
              style={{ paddingLeft: '2.65rem' }}
              value={filters.search}
              onChange={update('search')}
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-lbl">Sort by Price</label>
          <select className="f-control" value={filters.sortPrice} onChange={update('sortPrice')}>
            <option value="">Default</option>
            <option value="price-high">Price: High → Low</option>
            <option value="price-low">Price: Low → High</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-lbl">Listing Date</label>
          <select className="f-control" value={filters.sortDate} onChange={update('sortDate')}>
            <option value="">Default</option>
            <option value="date-new">Newest First</option>
            <option value="date-old">Oldest First</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-lbl">Property Type</label>
          <select className="f-control" value={filters.type} onChange={update('type')}>
            <option value="">All Types</option>
            <option value="Single Family">Single Family</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Multi-Family">Multi-Family</option>
            <option value="Manufactured">Manufactured</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-lbl">Bedrooms</label>
          <select className="f-control" value={filters.beds} onChange={update('beds')}>
            <option value="">Any</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4">4 Beds</option>
            <option value="5">5+ Beds</option>
          </select>
        </div>

        <button className="filter-reset" onClick={onReset}>
          <i className="fa-solid fa-rotate-left" /> Reset
        </button>
      </div>

      <PriceRange
        min={filters.minPrice}
        max={filters.maxPrice}
        onChange={(min, max) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
      />
    </div>
  )
}
