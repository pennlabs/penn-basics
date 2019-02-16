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
} from '../shared';

// TODO hours for the day?

class LaundryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  onLaundryLocationClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  onLaundryHallClick(hallId) {
    const { getLaundryHall } = this.props;
    getLaundryHall(hallId);
  }

  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.toggleModal();
    }
  }

  render() {
    const {
      locationObject,
    } = this.props;
    const {
      halls,
      location,
    } = locationObject;

    const { expanded } = this.state;
    return (
      <div>
        <Card padding="0.5rem 1rem" hoverable onClick={() => this.onLaundryLocationClick()}>
          <Row>
            <Col padding="0">
              <Subtitle marginBottom="0">
                {location}
              </Subtitle>
            </Col>
          </Row>
        </Card>
        {
          expanded && halls && halls.map(({hall_name: hallName, id}) => (//eslint-disable-line
            <Card padding="0.5rem 1rem" hoverable onClick={() => this.onLaundryHallClick(id)} key={uuid()}>
              <Row>
                <Col padding="0">
                  <Subtext>{hallName}</Subtext>
                </Col>
              </Row>
            </Card>
          ))
        }
      </div>
    );
  }
}


const mapStateToProps = ({ laundry }) => {
  const { laundryHalls, laundryHallInfo } = laundry;
  return { laundryHalls, laundryHallInfo };
};

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    getLaundryHall: hallId => dispatch(getLaundryHall(hallId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaundryCard);
