import React from 'react'
import uuid from 'uuid'

import { Scrollbar, NavHeaderCard } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import DiningCard from './DiningCard'
import { WHITE } from '../../styles/colors'
import { NAV_HEIGHT } from '../../styles/sizes'

import venueDataJSON from '../../../server/resources/dining/venue_info.json'
import {
  TVenueData,
  IVenueData,
  TVenueHours,
  IFavorite
} from '../../../types/dining'
import Loading from '../shared/Loading'

/**
 * Data cleanup which should run once (not at every component build)
 */
const diningKeys: string[] = []
const retailKeys: string[] = []

const venueData = venueDataJSON as TVenueData
const keys = Object.keys(venueData)

keys.forEach(key => {
  const data: IVenueData = venueData[key]
  if (data.isRetail) {
    retailKeys.push(key)
  } else {
    diningKeys.push(key)
  }
})

diningKeys.sort((keyA, keyB) => {
  const { name: nameA } = venueData[keyA]
  const { name: nameB } = venueData[keyB]
  return nameA.localeCompare(nameB)
})

interface INav {
  favorites: IFavorite[]
  selectedVenueId: string
  venueHours: TVenueHours
  pending: boolean
}

const Nav = ({
  favorites,
  selectedVenueId,
  venueHours,
  pending
}: INav): React.ReactElement => {
  // If a venue is selected, hide the scrollbar on mobile
  const hideOnMobile =
    selectedVenueId !== undefined &&
    selectedVenueId !== null &&
    selectedVenueId !== ''

  if (pending) {return <Loading padding="40vh 0" />}

  return (
    <Scrollbar
      padding="0 0 .5rem 0"
      background={WHITE}
      overflowY="scroll"
      sm={12}
      md={4}
      borderRight
      height={`calc(100vh - ${NAV_HEIGHT})`}
      hideOnMobile={hideOnMobile}
    >
      <NavHeaderCard title="Favorites" />

      {favorites && favorites.map((key: string) => (
          <DiningCard
            key={uuid()}
            venueId={key}
            selected={selectedVenueId === key}
            isFavorited={false}
            venueHours={venueHours}
          />
        ))}

      <NavHeaderCard title="Dining" />

      {diningKeys.map(key => (
          <DiningCard
            key={uuid()}
            venueId={key}
            selected={selectedVenueId === key}
            isFavorited={favorites.includes(key)}
            venueHours={venueHours}
          />
        ))}

      <NavHeaderCard title="Retail" />

      {retailKeys.map(key => (
        <DiningCard
          key={uuid()}
          venueId={key}
          selected={selectedVenueId === key}
          isFavorited={favorites.includes(key)}
          venueHours={venueHours}
        />
      ))}

      <PennLabsCredit />
    </Scrollbar>
  )
}

export default Nav
