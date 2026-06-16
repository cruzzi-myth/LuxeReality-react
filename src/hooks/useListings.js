import { useState, useEffect, useCallback } from 'react'
import { rentcast } from '../lib/rentcast'

const STARTER_CITIES = [
  { city: 'Los Angeles', state: 'CA' },
  { city: 'New York', state: 'NY' },
  { city: 'Miami', state: 'FL' },
  { city: 'Austin', state: 'TX' },
]

async function getListings(city, state, limit = 6) {
  const res = await rentcast.get('/listings/sale', {
    params: { city, state, status: 'Active', limit },
  })
  return res.data
}

export function useListings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDefaults = useCallback(async () => {
    setLoading(true)
    setError(null)

    const results = await Promise.allSettled(
      STARTER_CITIES.map(({ city, state }) => getListings(city, state))
    )

    const good = results
      .filter((r) => r.status === 'fulfilled')
      .flatMap((r) => r.value)
      .filter((p) => p.price && p.bedrooms)

    if (good.length === 0) {
      setError('no listings came back, double check the api key')
    }

    setListings(good)
    setLoading(false)
  }, [])

  const searchCity = useCallback(async (rawInput) => {
    if (!rawInput.trim()) return

    setLoading(true)
    setError(null)

    const [city, state] = rawInput.split(',').map((s) => s.trim())

    try {
      const data = await getListings(city, state || 'CA', 18)
      if (data.length) {
        setListings(data)
      } else {
        setError(`couldn't find anything in ${rawInput}`)
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDefaults()
  }, [loadDefaults])

  return { listings, loading, error, searchCity, reload: loadDefaults }
}
