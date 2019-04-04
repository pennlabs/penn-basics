import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import uuid from 'uuid';
import s from 'styled-components'
import { getLaundryHall } from '../../actions/laundry_actions';

import {
  Card,
  Subtext,
  Row,
  Col,
} from '../shared';

// TODO hours for the day?

import {
  DARK_GRAY,
} from '../../styles/colors'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`

class FavoriteCard extends Component {
  onClick() {
    const { hallId, dispatchGetLaundryHall } = this.props;
    dispatchGetLaundryHall(hallId);
  }

  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.toggleModal();
    }
  }

  render() {
    const { hallId, locationName } = this.props;
    return (
      <StyledLink to={`/laundry/${hallId}`} key={uuid()}>
        <Card padding="0.5rem 1rem" hoverable onClick={() => this.onClick()}>
          <Row>
            <Col padding="0">
              <Subtext>
                {locationName}
              </Subtext>
            </Col>
          </Row>
        </Card>
      </StyledLink>
    );
  }
}

FavoriteCard.defaultProps = {
  hallId: null,
  locationName: null,
}

FavoriteCard.propTypes = {
  hallId: PropTypes.number,
  locationName: PropTypes.string,
  dispatchGetLaundryHall: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    dispatchGetLaundryHall: hallId => dispatch(getLaundryHall(hallId)),
  };
};

export default connect(null, mapDispatchToProps)(FavoriteCard);
