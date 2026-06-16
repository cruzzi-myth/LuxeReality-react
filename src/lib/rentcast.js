import axios from 'axios'

export const rentcast = axios.create({
  baseURL: 'https://api.rentcast.io/v1',
  headers: {
    'X-Api-Key': import.meta.env.VITE_RENTCAST_KEY,
  },
})
