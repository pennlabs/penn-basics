import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uuid from 'uuid';
import { connect } from 'react-redux'
import s from 'styled-components'

import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
} from '../shared';

import {
  DARK_GRAY,
} from '../../styles/colors'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`

class LaundryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    const {
      locationObject: {
        halls,
      },
    } = this.props;

    const { hallURLId } = this.props;

    halls.map(hall => { //eslint-disable-line
      if (hall.id === Number(hallURLId)) {
        this.setState({ expanded: true });
      }
    })
  }

  onLaundryLocationClick() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded,
    })
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
      return (
        <div>
          <StyledLink to={`/laundry/${halls[0].id}`} key={uuid()}>
            <Card padding="0.5rem 1rem" hoverable>
              <Row>
                <Col padding="0">
                  <Subtitle marginBottom="0">
                    {location}
                  </Subtitle>
                </Col>
              </Row>
            </Card>
          </StyledLink>
        </div>
      )
    }

    return (
      <div>
        <Card padding="0.5rem 1rem" hoverable key={uuid()} onClick={() => this.onLaundryLocationClick()}>
          <Row>
            <Col padding="0">
              <Subtitle marginBottom="0">
                {location}
              </Subtitle>
            </Col>
          </Row>
        </Card>

        {
          expanded && halls.length >= 2 && halls.map(({ hall_name: hallName, id }) => (//eslint-disable-line
            <StyledLink to={`/laundry/${id}`} key={uuid()}>
              <Card padding="0.5rem 1rem" hoverable>
                <Row>
                  <Col padding="0">
                    <Subtext>{hallName}</Subtext>
                  </Col>
                </Row>
              </Card>
            </StyledLink>
          ))
        }
      </div>
    )
  }
}


const mapStateToProps = ({ laundry }) => {
  const { laundryHalls, laundryHallInfo } = laundry
  return { laundryHalls, laundryHallInfo }
}


// TODO why is this called locationObject???

LaundryCard.defaultProps = {
  hallURLId: null,
}

LaundryCard.propTypes = {
  hallURLId: PropTypes.number,
  locationObject: PropTypes.shape({
    location: PropTypes.string,
    halls: PropTypes.arrayOf(PropTypes.shape({
      hall_name: PropTypes.string,
      id: PropTypes.number,
      location: PropTypes.string,
    })),
  }).isRequired,
}


export default connect(mapStateToProps, null)(LaundryCard);
