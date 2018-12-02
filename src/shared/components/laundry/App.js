import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLaundryHalls } from '../../actions/laundry_actions';

import {
  Row,
  Col,
} from '../shared';
import { WHITE } from '../../styles/colors';
import { NAV_HEIGHT } from '../../styles/sizes';
import LaundryCard from './LaundryCard';
import LaundryVenue from './LaundryVenue';

class App extends Component {
  constructor(props) {
    super(props);
    const {
      getLaundryHalls,
    } = this.props;

    getLaundryHalls();
  }

  render() {
    const {
      laundryHalls,
    } = this.props;
    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Col
          padding="0 0 .5rem 0"
          background={WHITE}
          overflowY="scroll"
          width="30%"
        >
          {
            laundryHalls && laundryHalls.map(locationObject => <LaundryCard locationObject={locationObject} />)
          }
        </Col>
        <Col
          width="70%"  
        >
          <LaundryVenue/>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ laundry }) => {
  const { laundryHalls } = laundry;
  return {
    laundryHalls,
  };
};

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    getLaundryHalls: () => dispatch(getLaundryHalls()),
    getLaundryHallInfo: laundryHallId => dispatch(getLaundryHall(laundryHallId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
