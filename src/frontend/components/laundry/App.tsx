import React, { useEffect } from 'react'
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
import LaundryCard from './LaundryCard'
import LaundryVenue from './LaundryVenue'
import FavoriteCard from './FavoriteCard'
import { ILaundryReducerState, IFavorite, ILaundryHall } from '../../../types/laundry'

interface IAppStateProps {
  laundryHalls: ILaundryHall[]
  favorites: IFavorite[]
}

interface IAppDispatchProps {
  dispatchGetLaundryHalls: () => void
  dispatchGetFavorites: () => void
  dispatchCheckBrowser: () => void
}

interface IAppOwnProps {
  id: undefined | string
}

type IAppProps = IAppStateProps & IAppDispatchProps & IAppOwnProps

const App: React.FC<IAppProps> = ({
  dispatchGetLaundryHalls,
  dispatchGetFavorites,
  dispatchCheckBrowser,
  laundryHalls,
  id,
  favorites = [],
}) => {
  useEffect(() => {
    dispatchGetLaundryHalls()
    dispatchGetFavorites()
    dispatchCheckBrowser()
  }, [dispatchCheckBrowser, dispatchGetFavorites, dispatchGetLaundryHalls])

  const parsedHallId = Number.isNaN(Number(id)) ? -1 : Number(id)
  const isActiveHall =
    parsedHallId !== null &&
    parsedHallId !== undefined &&
    !Number.isNaN(parsedHallId)

  console.log('favorites')
  console.log(favorites)

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

        {favorites && favorites.length && (
          <>
            <Card background={BABY_BLUE} padding="0">
              <NavHeader className="title is-5">Favorites</NavHeader>
              <Line />
            </Card>

            {favorites.map((favorite, idx) => (
              <FavoriteCard key={`favorite-dining-card-${idx}`} favorite={favorite} />
              )
            )}
          </>
        )}

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

const mapStateToProps = ({ laundry }: { laundry: ILaundryReducerState }): IAppStateProps  => {
  const { laundryHalls, favorites } = laundry
  return { laundryHalls, favorites }
}

const mapDispatchToProps = (dispatch: (action: any) => any): IAppDispatchProps => ({
  dispatchGetLaundryHalls: (): void => dispatch(getLaundryHalls()),
  dispatchGetFavorites: (): void => dispatch(getFavorites()),
  dispatchCheckBrowser: (): void => dispatch(checkBrowserCompatability()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
