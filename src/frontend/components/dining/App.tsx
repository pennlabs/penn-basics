import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from '../shared'
import { NAV_HEIGHT } from '../../styles/sizes'
import Nav from './Nav'
import DiningVenue from './DiningVenue'
import { getFavorites, getVenueHours } from '../../actions/dining_actions'
import { IDiningReducerState, IFavorite, TVenueHours } from '../../../types/dining'


interface IAppStateProps {
  favorites: IFavorite[]
  venueHours: TVenueHours
  venueHoursPending: boolean
}

interface IAppDispatchProps {
  dispatchGetFavorites: () => void
  dispatchGetVenueHours: () => void
}

interface IAppOwnProps {
  id: string
}

type IAppProps = IAppOwnProps & IAppStateProps & IAppDispatchProps

const App: React.FC<IAppProps> = ({
  dispatchGetFavorites,
  dispatchGetVenueHours,
  id,
  favorites,
  venueHours,
  venueHoursPending,
}) => {
  useEffect(() => {
    dispatchGetFavorites()
    dispatchGetVenueHours()
  }, [dispatchGetFavorites, dispatchGetVenueHours])

  return (
    <Row fullHeightDesktop>
      <Nav
        selectedVenueId={id}
        favorites={favorites}
        venueHours={venueHours}
        pending={venueHoursPending}
      />

      <Col
        sm={12}
        md={8}
        overflowY="scroll"
        maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
        hideOnMobile={Boolean(!id)}
      >
        <DiningVenue venueId={id} />
      </Col>
    </Row>
  )
}

const mapStateToProps = ({ dining }: { dining: IDiningReducerState }): IAppStateProps => {
  const { favorites, venueHours, venueHoursPending } = dining

  return {
    favorites,
    venueHours,
    venueHoursPending,
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any): IAppDispatchProps => ({
  dispatchGetFavorites: (): void => dispatch(getFavorites()),
  dispatchGetVenueHours: (): void => dispatch(getVenueHours()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
