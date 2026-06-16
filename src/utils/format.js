export function formatPrice(price) {
  if (!price) return '—'
  if (price >= 1000000) {
    const m = price / 1000000
    return '$' + (Number.isInteger(m) ? m : m.toFixed(2)) + 'M'
  }
  return '$' + price.toLocaleString('en-US')
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function daysSince(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

export function daysAgoLabel(dateStr) {
  const days = daysSince(dateStr)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} year(s) ago`
}

const TYPE_LABELS = {
  'Single Family': 'Single Family Home',
  Condo: 'Condo',
  Townhouse: 'Townhouse',
  'Multi-Family': 'Multi-Family Home',
  Manufactured: 'Manufactured Home',
  Apartment: 'Apartment',
  Land: 'Lot / Land',
}

export function buildTitle(property) {
  const type = property.propertyType || 'Property'
  const label = TYPE_LABELS[type] || type
  return property.city ? `${label} in ${property.city}` : label
}

const STOCK_IMAGES = {
  'Single Family': [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
  ],
  Condo: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
  ],
  Townhouse: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  ],
  'Multi-Family': [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800&q=80',
  ],
}

export function pickListingImage(propertyType) {
  const pool = STOCK_IMAGES[propertyType] || STOCK_IMAGES.default
  return pool[Math.floor(Math.random() * pool.length)]
}
