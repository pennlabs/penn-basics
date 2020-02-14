const { GOOGLE_MAPS_API_KEY } = process.env

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('Missing GOOGLE_MAPS_API_KEY in env')
}

// Frontend
export const HOME_ROUTE = '/'
export const PROFILE_ROUTE = '/profile'
export const DINING_ROUTE = '/dining'

export const STUDYSPACES_ROUTE = '/studyspaces'
export const STUDYSPACE_ROUTE = (id: string): string =>
  `${STUDYSPACES_ROUTE}/${id}`
export const STUDYSPACE_QUERY_ROUTE = (id: string): string =>
  `${STUDYSPACES_ROUTE}?id=${id}`

export const FOODTRUCKS_ROUTE = '/foodtrucks'
export const FOODTRUCK_ROUTE = (id: string): string =>
  `${FOODTRUCKS_ROUTE}/${id}`
export const FOODTRUCK_QUERY_ROUTE = (id: string): string =>
  `${FOODTRUCKS_ROUTE}?id=${id}`

export const LAUNDRY_HALLS_ROUTE = '/laundry'
export const LAUNDRY_HALL_ROUTE = (id: string): string =>
  `${LAUNDRY_HALLS_ROUTE}/${id}`
export const LAUNDRY_HALL_QUERY_ROUTE = (id: string): string =>
  `${LAUNDRY_HALLS_ROUTE}?id=${id}`

// Backend
export const API_AUTH_ROUTE = '/api/auth/authenticate'
export const getApiAuthRouteWithRedirectParams = (pathname: string): string =>
  `${API_AUTH_ROUTE}?successRedirect=${pathname}&failureRedirect=${pathname}`

// External
export const GOOGLE_MAPS_API_ROUTE = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
export const PENN_DINING_BASE_URL =
  'https://university-of-pennsylvania.cafebonappetit.com/cafe'
export const FEEDBACK_LINK = 'https://airtable.com/shrE9ZdgiSY0DfDxV'
export const PENN_DINING_URL = (slug: string): string =>
  `${PENN_DINING_BASE_URL}/${slug}`
