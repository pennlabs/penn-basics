import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { getLaundryHalls, getFavorites } from '../../actions/laundry_actions';

import {
  Card,
  Row,
  Col,
  Scrollbar,
  NavSectionHeader,
  Line
} from '../shared';
import {
  BABY_BLUE,
} from '../../styles/colors'
import PennLabsCredit from '../shared/PennLabsCredit'
import { WHITE } from '../../styles/colors';
import { NAV_HEIGHT } from '../../styles/sizes';
import LaundryCard from './LaundryCard';
import LaundryVenue from './LaundryVenue';
import Favorites from './Favorites';

class App extends Component {
  constructor(props) {
    super(props);
    const { getLaundryHalls, getFavorites } = this.props;

    getLaundryHalls();
    getFavorites();
  }

  render() {
    const {
      laundryHalls, //eslint-disable-line
    } = this.props;

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Scrollbar
          padding="0 0 .5rem 0"
          background={WHITE}
          overflowY="scroll"
          width="20%"
          borderRight
        >
          <Favorites />
          <Card background={BABY_BLUE} padding="0">
            <NavSectionHeader className="title is-5"> Laundry Halls </NavSectionHeader>
            <Line />
          </Card>

          {
            laundryHalls
            && laundryHalls.map(locationObject => <LaundryCard locationObject={locationObject} key={uuid()} />)
          }
          <PennLabsCredit />
        </Scrollbar>

        <Col
          width="80%"
          overflowY="scroll"
        >
          <LaundryVenue />
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
    getFavorites: () => dispatch(getFavorites()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
