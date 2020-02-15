/* global window */
import ReactGA from 'react-ga'

const trackingID = 'UA-21029575-16'

export const initGA = (): void => {
  ReactGA.initialize(trackingID)
}

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = ''): void => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false): void => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
