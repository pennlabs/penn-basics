import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { getLaundryHall } from '../../actions/laundry_actions';

import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
  Line
} from '../shared';

// TODO hours for the day?

class FavoriteCard extends Component {

  onClick() {
    const { hallId, getLaundryHall } = this.props;
    getLaundryHall(hallId);
  }

  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.toggleModal();
    }
  }

  render() {
    return (
      <Card padding="0.5rem 1rem" hoverable onClick={() => this.onClick()}>
        <Row>
          <Col padding="0">
            <Subtext> {this.props.locationName} </Subtext>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    getLaundryHall: hallId => dispatch(getLaundryHall(hallId)),
  };
};

export default connect(null, mapDispatchToProps)(FavoriteCard);
