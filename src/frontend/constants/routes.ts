// Frontend
export const HOME_ROUTE = '/'
export const PROFILE_ROUTE = '/profile'
export const DINING_ROUTE = '/dining'

export const STUDYSPACES_ROUTE = '/studyspaces'
export const STUDYSPACE_ROUTE = id => `${STUDYSPACES_ROUTE}/${id}`
export const STUDYSPACE_QUERY_ROUTE = id => `${STUDYSPACES_ROUTE}?id=${id}`

export const FOODTRUCKS_ROUTE = '/foodtrucks'
export const FOODTRUCK_ROUTE = id => `${FOODTRUCKS_ROUTE}/${id}`
export const FOODTRUCK_QUERY_ROUTE = id => `${FOODTRUCKS_ROUTE}?id=${id}`

export const LAUNDRY_HALLS_ROUTE = '/laundry'
export const LAUNDRY_HALL_ROUTE = id => `${LAUNDRY_HALLS_ROUTE}/${id}`
export const LAUNDRY_HALL_QUERY_ROUTE = id => `${LAUNDRY_HALLS_ROUTE}?id=${id}`

// Backend
export const API_AUTH_ROUTE = `/api/auth/authenticate`
export const getApiAuthRouteWithRedirectParams = pathname =>
  `${API_AUTH_ROUTE}?successRedirect=${pathname}&failureRedirect=${pathname}`

// External
const { GOOGLE_MAPS_API_KEY: apiKey } = process.env
export const GOOGLE_MAPS_API_ROUTE = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
export const PENN_DINING_BASE_URL =
  'https://university-of-pennsylvania.cafebonappetit.com/cafe'
export const FEEDBACK_LINK = 'https://airtable.com/shrE9ZdgiSY0DfDxV'
export const PENN_DINING_URL = (slug: string): string =>
  `${PENN_DINING_BASE_URL}/${slug}`
