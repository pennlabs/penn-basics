export const NAV_HEIGHT = '58px'
export const MAX_BODY_HEIGHT = `calc(100vh - ${NAV_HEIGHT})`

export const FILTER_HEIGHT = '59px'
export const MOBILE_FILTER_HEIGHT = '46px'

export const DESKTOP = '1248px'
export const TABLET = '992px'
export const PHONE = '584px'

export const BORDER_RADIUS = '4px'

export const minWidth = (w: string): string =>
  `@media screen and (min-width: ${w})`
export const maxWidth = (w: string): string =>
  `@media screen and (max-width: ${w})`

export const LONG_ANIMATION_DURATION = '400ms'
export const SHORT_ANIMATION_DURATION = '200ms'

export const Z_INDEX = 1300
