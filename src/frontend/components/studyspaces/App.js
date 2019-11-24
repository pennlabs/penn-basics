/* global document */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MobileToggleView from './MobileToggleView'
import SpaceCard from './SpaceCard'
import {
  Map,
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
import { getAllSpacesData, setActiveSpace } from '../../actions/spaces_actions'

import Filter from './Filter'
import SpaceModal from './SpaceModal'
import PennLabsCredit from '../shared/PennLabsCredit'
import { SNOW } from '../../styles/colors'

// TODO ghost loaders
// TODO port this over to hooks
// TODO map height on mobile

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { googleMapError: null, isListViewMobile: true }
    this.toggleView = this.toggleView.bind(this)
  }

  componentDidMount() {
    const { getAllSpacesDataDispatch } = this.props
    getAllSpacesDataDispatch()
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (apiKey) {
      const tag = document.createElement('script')
      tag.setAttribute(
        'src',
        `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      )
      document.getElementsByTagName('body')[0].appendChild(tag)
    } else {
      this.setState({ googleMapError: 'Sorry, Google Map cannot be shown' })
    }
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
      spacesData: currentSpacesData,
      getAllSpacesDataDispatch,
    } = this.props
    const { spacesData: prevSpacesData } = prevProps
    if (!currentSpacesData && prevSpacesData) {
      getAllSpacesDataDispatch()
    }
  }

  toggleView() {
    const { isListViewMobile } = this.state
    this.setState({ isListViewMobile: !isListViewMobile })
  }

  render() {
    const {
      filteredSpacesData,
      error,
      pending,
      hoveredSpace,
      setActiveSpaceDispatch,
    } = this.props

    const { googleMapError, isListViewMobile } = this.state

    // TODO loading spinner
    if (pending || !filteredSpacesData) {
      return <Filter />
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

            {!Object.keys(filteredSpacesData).length && (
              <NoDataScroll
                image="/img/studyspace-empty-state.svg"
                imageAlt="Empty Studyspaces"
                text="No study spaces match your criteria"
              />
            )}

            {Object.keys(filteredSpacesData).map(spaceId => {
              const space = filteredSpacesData[spaceId]
              return (
                <div key={spaceId}>
                  <SpaceCard spaceId={spaceId} {...space} />
                  <Line />
                </div>
              )
            })}

            <PennLabsCredit />
          </Scrollbar>
          <Col sm={12} md={6} lg={8} hideOnMobile={isListViewMobile}>
            <ErrorMessage message={googleMapError} />
            {!googleMapError && (
              <Map
                mapId="map"
                height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
                mobileHeight={`calc(100vh - ${NAV_HEIGHT} - ${MOBILE_FILTER_HEIGHT})`}
                markers={filteredSpacesData}
                handleClickMarker={setActiveSpaceDispatch}
                activeMarker={hoveredSpace}
              />
            )}
          </Col>
        </Row>

        <SpaceModal />
      </>
    )
  }
}

const SpacesDataPropType = PropTypes.objectOf(
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
  hoveredSpace: null,
  pending: false,
  filteredSpacesData: null,
  spacesData: null,
}

App.propTypes = {
  getAllSpacesDataDispatch: PropTypes.func.isRequired,
  setActiveSpaceDispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  hoveredSpace: PropTypes.string,
  pending: PropTypes.bool,
  filteredSpacesData: SpacesDataPropType,
  spacesData: SpacesDataPropType,
}

const mapStateToProps = ({ spaces }) => spaces

const mapDispatchToProps = dispatch => ({
  getAllSpacesDataDispatch: id => dispatch(getAllSpacesData(id)),
  setActiveSpaceDispatch: id => dispatch(setActiveSpace(id)),
})

// Redux config
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
