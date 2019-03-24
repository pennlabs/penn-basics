import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLaundryHall } from '../../actions/laundry_actions'
import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
} from '../shared'


class LaundryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  onLaundryLocationClick() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded,
    })
  }

  onLaundryHallClick(hallId) {
    const { dispatchGetLaundryHall } = this.props
    dispatchGetLaundryHall(hallId)
  }

  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.toggleModal()
    }
  }

  render() {
    const {
      locationObject: {
        halls,
        location,
      },
    } = this.props
    const { expanded } = this.state

    // check if the hall has only one location object
    if (halls.length === 1) {
      const { id, hall_name: hallName } = halls[0]

      return (
        <Card
          padding="0.5rem 1rem"
          hoverable
          onClick={() => this.onLaundryHallClick(id)}
          key={`${hallName}-${id}`}
        >
          <Row>
            <Col padding="0">
              <Subtitle marginBottom="0">
                {location}
              </Subtitle>
            </Col>
          </Row>
        </Card>
      )
    }

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

        {expanded && halls.length >= 2 && halls.map(({ hall_name: hallName, id }) => (
          <Card
            padding="0.5rem 1rem"
            hoverable
            onClick={() => this.onLaundryHallClick(id)}
            key={`${hallName}-${id}`}
          >
            <Row>
              <Col padding="0">
                <Subtext>{hallName}</Subtext>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    )
  }
}


const mapStateToProps = ({ laundry }) => {
  const { laundryHalls, laundryHallInfo } = laundry
  return { laundryHalls, laundryHallInfo }
}


const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    dispatchGetLaundryHall: hallId => dispatch(getLaundryHall(hallId)),
  }
}


// TODO why is this called locationObject???


LaundryCard.propTypes = {
  dispatchGetLaundryHall: PropTypes.func.isRequired,
  locationObject: PropTypes.shape({
    location: PropTypes.string,
    halls: PropTypes.arrayOf(PropTypes.shape({
      hall_name: PropTypes.string,
      id: PropTypes.number,
      location: PropTypes.string,
    })),
  }).isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaundryCard)
