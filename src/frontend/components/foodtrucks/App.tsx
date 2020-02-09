import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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

// TODO ghost loaders

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { googleMapError: null, isListViewMobile: true }
    this.toggleView = this.toggleView.bind(this)
  }

  componentDidMount() {
    const { dispatchGetAllFoodtrucks } = this.props
    dispatchGetAllFoodtrucks()
  }

  componentDidUpdate(prevProps) {
    /**
     * Handle when the user re-navigates to this page, in which case the component updates
     * and the props are wiped BUT the component does not re-mounts
     *
     * We solve this by checking if the new props lack necessary data, but the old props
     * did have that data. If this is the case, we request the data again.
     */
    const {
      foodtrucksData: currentFoodtrucksData,
      dispatchGetAllFoodtrucks,
    } = this.props
    const { foodtrucksData: prevFoodtrucksData } = prevProps
    if (!currentFoodtrucksData && prevFoodtrucksData) {
      dispatchGetAllFoodtrucks()
    }
  }

  toggleView() {
    const { isListViewMobile } = this.state
    this.setState({ isListViewMobile: !isListViewMobile })
  }

  render() {
    const {
      filteredFoodtrucksData,
      error,
      pending,
      hoveredFoodtruck,
      id,
    } = this.props

    const parsedFoodtruckId = Number.isNaN(id) ? null : id

    const { googleMapError, isListViewMobile } = this.state

    if (pending || !filteredFoodtrucksData) {
      return null
    }

    return (
      <>
        <MobileToggleView
          isListView={isListViewMobile}
          toggle={this.toggleView}
        />

        <Filter />

        <Row
          maxHeight={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
          style={{ backgroup: SNOW }}
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
              return (
                <div key={foodtruckId}>
                  <FoodtruckCard foodtruckId={foodtruckId} {...foodtruck} />
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
                    FOODTRUCK_QUERY_ROUTE(truckId),
                    FOODTRUCK_ROUTE(truckId)
                  )
                }
              />
            )}
          </Col>
        </Row>

        <FoodtruckModal foodtruckId={parsedFoodtruckId} />
      </>
    )
  }
}

const FoodtrucksDataPropType = PropTypes.objectOf(
  PropTypes.shape({
    address: PropTypes.string,
    description: PropTypes.string,
    end: PropTypes.arrayOf(PropTypes.number),
    groups: PropTypes.number,
    hours: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    open: PropTypes.bool,
    outlets: PropTypes.number,
    quiet: PropTypes.number,
    start: PropTypes.arrayOf(PropTypes.number),
    tags: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  })
)

App.defaultProps = {
  error: null,
  hoveredFoodtruck: null,
  pending: false,
  filteredFoodtrucksData: null,
  foodtrucksData: null,
  id: '',
}

App.propTypes = {
  id: PropTypes.string,
  dispatchGetAllFoodtrucks: PropTypes.func.isRequired,
  error: PropTypes.string,
  hoveredFoodtruck: PropTypes.string,
  pending: PropTypes.bool,
  filteredFoodtrucksData: FoodtrucksDataPropType,
  foodtrucksData: FoodtrucksDataPropType,
}

const mapStateToProps = ({ foodtrucks }) => foodtrucks

const mapDispatchToProps = dispatch => ({
  dispatchGetAllFoodtrucks: () => dispatch(getAllFoodtrucksData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)