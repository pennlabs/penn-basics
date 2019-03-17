import React, { Component } from 'react'
import { connect } from 'react-redux'

import SpaceCard from './SpaceCard'
import {
  Map,
  Row,
  Col,
  Scrollbar,
  Line,
} from '../shared'
import ErrorMessage from '../shared/ErrorMessage'
import { NAV_HEIGHT, FILTER_HEIGHT } from '../../styles/sizes'
import { getAllSpacesData } from '../../actions/spaces_actions'

import Filter from './Filter'
import SpaceModal from './SpaceModal'
import PennLabsCredit from '../shared/PennLabsCredit'

// TODO ghost loaders

class App extends Component {
  componentDidMount() {
    const { getAllSpacesDataDispatch } = this.props;
    getAllSpacesDataDispatch();
  }

  render() {
    const {
      filteredSpacesData,
      error,
      pending,
      hoveredSpace,
    } = this.props;

    if (pending || !filteredSpacesData || !Object.keys(filteredSpacesData).length) {
      return (<Filter />);
    }

    return (
      <div>
        <SpaceModal />

        <Filter />

        <Row maxHeight={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}>
          <Scrollbar
            padding="0 0 .5rem 0"
            overflowY="scroll"
            width="40%"
          >
            <ErrorMessage message={error} />

            {Object.keys(filteredSpacesData).map((spaceId) => {
              const space = filteredSpacesData[spaceId];
              return (
                <div key={spaceId}>
                  <SpaceCard
                    spaceId={spaceId}
                    {...space}
                  />
                  <Line />
                </div>
              );
            })}

            <PennLabsCredit />
          </Scrollbar>
          <Col>
            <Map
              mapId="map"
              height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
              markers={filteredSpacesData}
              activeMarker={hoveredSpace}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ spaces }) => spaces;

const mapDispatchToProps = dispatch => ({
  getAllSpacesDataDispatch: venueId => dispatch(getAllSpacesData(venueId)),
});

// Redux config
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
