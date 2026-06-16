import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  formatPrice,
  formatDate,
  daysAgoLabel,
  buildTitle,
} from '../utils/format'

export default function PropertyModal({ property, img, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const address =
    property.formattedAddress ||
    `${property.addressLine1}, ${property.city}, ${property.state}`

  const agent  = property.listingAgent
  const office = property.listingOffice

  const mapUrl =
    property.latitude && property.longitude
      ? `https://www.google.com/maps?q=${property.latitude},${property.longitude}`
      : null

  return createPortal(
    <div className="prop-modal-overlay" onClick={onClose}>
      <div className="prop-modal" onClick={(e) => e.stopPropagation()}>
        {/* Hero image + price */}
        <div className="prop-modal-img-wrap">
          <button className="prop-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
          <img src={img} alt={buildTitle(property)} className="prop-modal-img" />
          <div className="prop-modal-img-overlay" />
          <div className="prop-modal-price-tag">
            <span className="prop-modal-price">{formatPrice(property.price)}</span>
            {property.status && (
              <span className="prop-modal-status">{property.status}</span>
            )}
          </div>
        </div>

        <div className="prop-modal-body">
          {/* Title + address */}
          <h2 className="prop-modal-title">{buildTitle(property)}</h2>
          <p className="prop-modal-addr">
            <i className="fa-solid fa-location-dot" />
            {address}
          </p>

          {property.propertyType && (
            <span className="prop-modal-type-badge">{property.propertyType}</span>
          )}

          {/* Stats row */}
          <div className="prop-modal-stats">
            {property.bedrooms != null && (
              <div className="pms-item">
                <i className="fa-solid fa-bed" />
                <span className="pms-val">{property.bedrooms}</span>
                <span className="pms-lbl">Beds</span>
              </div>
            )}
            {property.bathrooms != null && (
              <div className="pms-item">
                <i className="fa-solid fa-bath" />
                <span className="pms-val">{property.bathrooms}</span>
                <span className="pms-lbl">Baths</span>
              </div>
            )}
            {property.squareFootage && (
              <div className="pms-item">
                <i className="fa-solid fa-ruler-combined" />
                <span className="pms-val">{property.squareFootage.toLocaleString()}</span>
                <span className="pms-lbl">Sq Ft</span>
              </div>
            )}
            {property.lotSize && (
              <div className="pms-item">
                <i className="fa-solid fa-seedling" />
                <span className="pms-val">{property.lotSize.toLocaleString()}</span>
                <span className="pms-lbl">Lot Sq Ft</span>
              </div>
            )}
            {property.yearBuilt && (
              <div className="pms-item">
                <i className="fa-solid fa-calendar-check" />
                <span className="pms-val">{property.yearBuilt}</span>
                <span className="pms-lbl">Year Built</span>
              </div>
            )}
          </div>

          {/* Detail rows */}
          <div className="prop-modal-details">
            {property.daysOnMarket != null && (
              <div className="pmd-row">
                <span className="pmd-key">Days on Market</span>
                <span className="pmd-val">{property.daysOnMarket} days</span>
              </div>
            )}
            {property.listedDate && (
              <div className="pmd-row">
                <span className="pmd-key">Listed</span>
                <span className="pmd-val">
                  {daysAgoLabel(property.listedDate)} · {formatDate(property.listedDate)}
                </span>
              </div>
            )}
            {property.listingType && (
              <div className="pmd-row">
                <span className="pmd-key">Listing Type</span>
                <span className="pmd-val">{property.listingType}</span>
              </div>
            )}
            {property.mlsNumber && (
              <div className="pmd-row">
                <span className="pmd-key">MLS #</span>
                <span className="pmd-val">
                  {property.mlsNumber}
                  {property.mlsName ? ` · ${property.mlsName}` : ''}
                </span>
              </div>
            )}
            {agent?.name && (
              <div className="pmd-row">
                <span className="pmd-key">Listing Agent</span>
                <span className="pmd-val">
                  {agent.name}
                  {agent.phone ? ` · ${agent.phone}` : ''}
                </span>
              </div>
            )}
            {office?.name && (
              <div className="pmd-row">
                <span className="pmd-key">Office</span>
                <span className="pmd-val">{office.name}</span>
              </div>
            )}
            {property.zipCode && (
              <div className="pmd-row">
                <span className="pmd-key">ZIP Code</span>
                <span className="pmd-val">{property.zipCode}</span>
              </div>
            )}
            {property.county && (
              <div className="pmd-row">
                <span className="pmd-key">County</span>
                <span className="pmd-val">{property.county}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="prop-modal-actions">
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="prop-modal-map-btn"
              >
                <i className="fa-solid fa-map-location-dot" /> View on Map
              </a>
            )}
            <a href="/explore" className="prop-modal-explore-btn">
              Browse All Listings <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
