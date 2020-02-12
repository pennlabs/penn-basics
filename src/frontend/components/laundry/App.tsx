import React, { useEffect, Dispatch } from 'react'
import { connect } from 'react-redux'

import {
  getLaundryHalls,
  getFavorites,
  checkBrowserCompatability,
} from '../../actions/laundry_actions'
import { Card, Row, Col, Scrollbar, NavHeader, Line } from '../shared'
import Loading from '../shared/Loading'
import { BABY_BLUE } from '../../styles/colors'
import PennLabsCredit from '../shared/PennLabsCredit'
import Favorites from '../shared/favorites/Favorites'
import LaundryCard from './LaundryCard'
import LaundryVenue from './LaundryVenue'
import FavoriteCard from './FavoriteCard'
import { ILaundryHallProps } from '../../types'
import { Action } from 'redux'

interface ILaundryHallInfo {
  locationName: string
  hallId: number
}

interface IAppProps {
  dispatchGetLaundryHalls: () => void
  dispatchGetFavorites: () => void
  dispatchCheckBrowser: () => void
  laundryHalls: ILaundryHallProps
  id: undefined | string
  favorites: ILaundryHallInfo[]
}

const App = ({
  dispatchGetLaundryHalls,
  dispatchGetFavorites,
  dispatchCheckBrowser,
  laundryHalls,
  id,
  favorites,
}: IAppProps): React.ReactElement => {
  useEffect(() => {
    dispatchGetLaundryHalls()
    dispatchGetFavorites()
    dispatchCheckBrowser()
  }, [])

  const parsedHallId = Number.isNaN(Number(id)) ? null : Number(id)
  const isActiveHall =
    parsedHallId !== null &&
    parsedHallId !== undefined &&
    !Number.isNaN(parsedHallId)

  return (
    <Row fullHeight>
      <Scrollbar
        padding="0 0 .5rem 0"
        sm={12}
        md={3}
        borderRight
        fullHeight
        hideOnMobile={isActiveHall}
      >
        <Favorites
          favorites={favorites}
          FavoriteCard={FavoriteCard}
          inputName="favorite"
          keyAttributeName="hallId"
        />

        <Card background={BABY_BLUE} padding="0">
          <NavHeader className="title is-5">Laundry Halls</NavHeader>
          <Line />
        </Card>

        {laundryHalls ? (
          laundryHalls.map(locationObject => (
            <LaundryCard
              selectedHallId={parsedHallId}
              locationObject={locationObject}
              key={locationObject.location}
            />
          ))
        ) : (
          <Loading padding="40vh 0" />
        )}

        <PennLabsCredit />
      </Scrollbar>

      <Col
        sm={12}
        md={9}
        overflowY="auto"
        fullHeight
        hideOnMobile={!isActiveHall}
      >
        <LaundryVenue hallURLId={parsedHallId} />
      </Col>
    </Row>
  )
}

const mapStateToProps = ({ laundry }) => {
  const { laundryHalls, favorites } = laundry
  return { laundryHalls, favorites }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  dispatchGetLaundryHalls: () => dispatch(getLaundryHalls()),
  dispatchGetFavorites: () => dispatch(getFavorites()),
  dispatchCheckBrowser: () => dispatch(checkBrowserCompatability()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
