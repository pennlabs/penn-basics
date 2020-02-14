import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

import MobileToggleView from '../studyspaces/MobileToggleView'
import FoodtruckCard from './FoodtruckCard'
import {
  FoodtruckMap,
  Row,
  Col,
  Scrollbar,
  Line,
  ErrorMessage,
  NoDataScroll,
} from '../shared'
import {
  NAV_HEIGHT,
  FILTER_HEIGHT,
  MOBILE_FILTER_HEIGHT,
} from '../../styles/sizes'
import { getAllFoodtrucksData } from '../../actions/foodtrucks_action'
import Filter from './Filter'
import FoodtruckModal from './FoodtruckModal'
import PennLabsCredit from '../shared/PennLabsCredit'
import { FOODTRUCK_ROUTE, FOODTRUCK_QUERY_ROUTE } from '../../constants/routes'
import { SNOW } from '../../styles/colors'
import { IFoodTrucksReducerState, IFormattedFoodtruck } from '../../../types'

// TODO ghost loaders

interface IAppProps {
  dispatchGetAllFoodtrucks: () => void
  filteredFoodtrucksData: Record<string, IFormattedFoodtruck>
  pending: boolean
  error: string
  hoveredFoodtruck: string
  id: string
}

const App = ({
  dispatchGetAllFoodtrucks,
  filteredFoodtrucksData,
  error,
  pending,
  hoveredFoodtruck,
  id,
}: IAppProps): React.ReactElement => {
  const [googleMapError] = useState('')
  const [isListViewMobile, setListView] = useState(true)

  const toggleView = () => {
    setListView(!isListViewMobile)
  }

  useEffect(() => {
    dispatchGetAllFoodtrucks()
  }, [dispatchGetAllFoodtrucks])

  if (pending || !filteredFoodtrucksData) {
    return <React.Fragment />
  }

  return (
    <>
      <MobileToggleView isListView={isListViewMobile} toggle={toggleView}/>

      <Filter />

      <Row
        maxHeight={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
        style={{ background: SNOW }}
      >
        <Scrollbar
          padding="0 0 .5rem 0"
          sm={12}
          md={6}
          lg={4}
          height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
          hideOnMobile={!isListViewMobile}
        >
          <ErrorMessage message={error} />

          {!Object.keys(filteredFoodtrucksData).length && (
            <NoDataScroll
              image="/img/empty-foodtruck.svg"
              imageAlt="Empty Foodtrucks"
              text="No foodtruck matches the criteria"
            />
          )}

          {Object.keys(filteredFoodtrucksData).map(foodtruckId => {
            const foodtruck = filteredFoodtrucksData[foodtruckId]
            const { name, open, hours, overallRating, image } = foodtruck
            return (
              <div key={foodtruckId}>
                <FoodtruckCard
                  foodtruckId={foodtruckId}
                  name={name}
                  open={open}
                  hours={hours}
                  overallRating={overallRating}
                  image={image}
                />
                <Line />
              </div>
            )
          })}

          <PennLabsCredit />
        </Scrollbar>
        <Col sm={12} md={6} lg={8} hideOnMobile={isListViewMobile}>
          <ErrorMessage message={googleMapError} />
          {!googleMapError && (
            <FoodtruckMap
              mapId="map"
              height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
              mobileHeight={`calc(100vh - ${NAV_HEIGHT} - ${MOBILE_FILTER_HEIGHT})`}
              markers={filteredFoodtrucksData}
              activeMarker={hoveredFoodtruck}
              handleClickMarker={truckId =>
                Router.push(
                  FOODTRUCK_QUERY_ROUTE(`${truckId}`),
                  FOODTRUCK_ROUTE(`${truckId}`)
                )
              }
            />
          )}
        </Col>
      </Row>

      <FoodtruckModal foodtruckId={id} />
    </>
  )
}

const mapStateToProps = ({ foodtrucks }: { foodtrucks: IFoodTrucksReducerState } ) => {
  const { filteredFoodtrucksData, pending, error, hoveredFoodtruck } = foodtrucks

  return {
    filteredFoodtrucksData,
    pending,
    error,
    hoveredFoodtruck
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchGetAllFoodtrucks: () => dispatch(getAllFoodtrucksData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
