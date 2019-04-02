import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import uuid from 'uuid';
import { getLaundryHall } from '../../actions/laundry_actions';
import s from 'styled-components'

import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
  Line
} from '../shared';

// TODO hours for the day?

import {
  WHITE,
  DARK_GRAY,
  BABY_BLUE,
} from '../../styles/colors'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`

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
    const { hallId } = this.props;
    return (
      <StyledLink to={`/laundry/${hallId}`} key={uuid()}>
        <Card padding="0.5rem 1rem" hoverable onClick={() => this.onClick()}>
          <Row>
            <Col padding="0">
              <Subtext> {this.props.locationName} </Subtext>
            </Col>
          </Row>
        </Card>
      </StyledLink>
    );
  }
}

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    getLaundryHall: hallId => dispatch(getLaundryHall(hallId)),
  };
};

export default connect(null, mapDispatchToProps)(FavoriteCard);
