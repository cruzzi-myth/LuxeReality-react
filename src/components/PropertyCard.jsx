import { useState, useMemo } from 'react'
import {
  formatPrice,
  formatDate,
  daysAgoLabel,
  daysSince,
  buildTitle,
  pickListingImage,
} from '../utils/format'
import PropertyModal from './PropertyModal'

export default function PropertyCard({ property, index }) {
  const [liked, setLiked]       = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const img = useMemo(() => pickListingImage(property.propertyType), [property.propertyType])

  const address =
    property.formattedAddress || `${property.addressLine1}, ${property.city}, ${property.state}`

  const isNew      = property.listedDate && daysSince(property.listedDate) <= 14
  const isFeatured = !isNew && index < 2

  return (
    <>
      <div
        className="prop-card"
        style={{ animationDelay: `${index * 0.06}s` }}
        onClick={() => setModalOpen(true)}
      >
        <div className="prop-card-img">
          {!imgFailed ? (
            <img
              src={img}
              alt={buildTitle(property)}
              className="prop-real-img"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="prop-img-fallback" style={{ display: 'flex' }}>🏠</div>
          )}

          {isNew      && <span className="prop-badge badge-new">New</span>}
          {isFeatured && <span className="prop-badge badge-featured">⭐ Featured</span>}
          {!isNew && !isFeatured && <span className="prop-badge badge-sale">For Sale</span>}

          <button
            className={liked ? 'prop-fav liked' : 'prop-fav'}
            onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            title={liked ? 'Remove from saved' : 'Save property'}
          >
            <i className={liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
          </button>
        </div>

        <div className="prop-card-body">
          <div className="prop-price">{formatPrice(property.price)}</div>
          <div className="prop-title">{buildTitle(property)}</div>
          <div className="prop-loc">
            <i className="fa-solid fa-location-dot" />
            {address}
          </div>

          <div className="prop-divider" />

          <div className="prop-feats">
            <span className="prop-feat">
              <i className="fa-solid fa-bed" /> {property.bedrooms ?? '—'} Bed
              {property.bedrooms !== 1 ? 's' : ''}
            </span>
            <span className="prop-feat">
              <i className="fa-solid fa-bath" /> {property.bathrooms ?? '—'} Bath
              {property.bathrooms !== 1 ? 's' : ''}
            </span>
            <span className="prop-feat">
              <i className="fa-solid fa-ruler-combined" />{' '}
              {property.squareFootage ? property.squareFootage.toLocaleString() : '—'} sqft
            </span>
          </div>

          {property.listedDate && (
            <div className="prop-date">
              <i className="fa-regular fa-calendar" /> Listed {daysAgoLabel(property.listedDate)} ·{' '}
              {formatDate(property.listedDate)}
              {property.daysOnMarket !== undefined && ` · ${property.daysOnMarket}d on market`}
            </div>
          )}

          <div className="prop-card-hint">
            <i className="fa-solid fa-expand" /> Click for details
          </div>
        </div>
      </div>

      {modalOpen && (
        <PropertyModal
          property={property}
          img={img}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
