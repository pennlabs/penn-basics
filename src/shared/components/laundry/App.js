import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLaundryHalls, getFavorites } from '../../actions/laundry_actions';

import {
  Card,
  Row,
  Col,
  Scrollbar,
  NavSectionHeader,
  Line,
} from '../shared';
import {
  BABY_BLUE,
  WHITE,
} from '../../styles/colors'
import PennLabsCredit from '../shared/PennLabsCredit'
import { NAV_HEIGHT } from '../../styles/sizes';
import LaundryCard from './LaundryCard';
import LaundryVenue from './LaundryVenue';
import Favorites from './Favorites';

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatchGetLaundryHalls, dispatchGetFavorites } = this.props;

    dispatchGetLaundryHalls();
    dispatchGetFavorites();
  }

  render() {
    const {
      laundryHalls, //eslint-disable-line
      match,
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
            && laundryHalls.map(locationObject => <LaundryCard locationObject={locationObject} hallURLId={match.params.id} />) // eslint-disable-line
          }
          <PennLabsCredit />
        </Scrollbar>

        <Col
          width="80%"
          overflowY="scroll"
        >
          <LaundryVenue hallURLId={match.params.id} />
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
    dispatchGetLaundryHalls: () => dispatch(getLaundryHalls()),
    dispatchGetFavorites: () => dispatch(getFavorites()),
  };
};

App.defaultProps = {
  laundryHalls: null,
}

App.propTypes = {
  laundryHalls: PropTypes.object, // eslint-disable-line
  match: PropTypes.object.isRequired, // eslint-disable-line
  dispatchGetFavorites: PropTypes.func.isRequired,
  dispatchGetLaundryHalls: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
