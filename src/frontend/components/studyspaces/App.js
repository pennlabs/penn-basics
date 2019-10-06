import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
import { NAV_HEIGHT, FILTER_HEIGHT } from '../../styles/sizes'
import { getAllSpacesData, setActiveSpace } from '../../actions/spaces_actions'

import Filter from './Filter'
import SpaceModal from './SpaceModal'
import PennLabsCredit from '../shared/PennLabsCredit'

// TODO ghost loaders

class App extends Component {
  componentDidMount() {
    const { getAllSpacesDataDispatch } = this.props
    getAllSpacesDataDispatch()
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

  render() {
    const {
      filteredSpacesData,
      error,
      pending,
      hoveredSpace,
      setActiveSpaceDispatch,
    } = this.props

    if (pending || !filteredSpacesData) {
      return <Filter />
    }

    return (
      <>
        <Filter />

        <Row maxHeight={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}>
          <Scrollbar
            padding="0 0 .5rem 0"
            overflowY="scroll"
            width="40%"
            height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
          >
            <ErrorMessage message={error} />

            {!Object.keys(filteredSpacesData).length && (
              <NoDataScroll
                image="/img/studyspace-empty-state.svg"
                imageAlt="Empty Studyspaces"
                text="No study space matches the criteria"
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
          <Col>
            <Map
              mapId="map"
              height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
              markers={filteredSpacesData}
              handleClickMarker={setActiveSpaceDispatch}
              activeMarker={hoveredSpace}
            />
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
