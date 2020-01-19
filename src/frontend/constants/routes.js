// Frontend
export const HOME_ROUTE = '/'
export const DINING_ROUTE = '/dining'
export const STUDYSPACES_ROUTE = '/studyspaces'
export const STUDYSPACE_ROUTE = id => `${STUDYSPACES_ROUTE}/${id}`
export const STUDYSPACE_QUERY_ROUTE = id => `${STUDYSPACES_ROUTE}?id=${id}`
export const FOODTRUCKS_ROUTE = '/foodtrucks'
export const FOODTRUCK_ROUTE = id => `${FOODTRUCKS_ROUTE}/${id}`
export const FOODTRUCK_QUERY_ROUTE = id => `${FOODTRUCKS_ROUTE}?id=${id}`
export const LAUNDRY_ROUTE = '/laundry'
export const PROFILE_ROUTE = '/profile'

// Backend
export const API_AUTH_ROUTE = `/api/auth/authenticate`
export const getApiAuthRouteWithRedirectParams = pathname =>
  `${API_AUTH_ROUTE}?successRedirect=${pathname}&failureRedirect=${pathname}`

// External
const { GOOGLE_MAPS_API_KEY: apiKey } = process.env
export const GOOGLE_MAPS_API_ROUTE = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
