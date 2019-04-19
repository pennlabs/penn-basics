import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uuid from 'uuid';
import { connect } from 'react-redux'
import s from 'styled-components'

import {
  Card,
  Text,
  Row,
  Col,
  Line,
} from '../shared'
import { DARK_GRAY } from '../../styles/colors'
import LaundryCardHeader from './LaundryCardHeader'


const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`


class LaundryCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }


  componentDidMount() {
    const {
      locationObject: { halls },
    } = this.props

    const { hallURLId } = this.props

    halls.map(({ id }) => { //eslint-disable-line
      if (hallURLId && id === Number(hallURLId)) {
        this.setState({ expanded: true })
      }
    })
  }


  onLaundryLocationClick() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded,
    })
  }


  render() {
    const {
      locationObject: {
        halls,
        location,
      },
    } = this.props
    const { expanded } = this.state

    // Check if the hall has only one location object
    if (halls.length === 1) {
      return (
        <StyledLink to={`/laundry/${halls[0].id}`} key={uuid()}>
          <LaundryCardHeader title={location} />
          <Line />
        </StyledLink>
      )
    }

    return (
      <div>
        <div key={uuid()} onClick={() => this.onLaundryLocationClick()}> {/*eslint-disable-line*/}
          <LaundryCardHeader title={location} />
        </div>

        {expanded && halls.map(({ hall_name: hallName, id }) => (
          <StyledLink to={`/laundry/${id}`} key={uuid()}>
            <Card padding="0.5rem 1rem" hoverable>
              <Row>
                <Col padding="0 0 0 1rem">
                  <Text marginBottom="0">{hallName}</Text>
                </Col>
              </Row>
            </Card>
          </StyledLink>
        ))}

        <Line />
      </div>
    )
  }
}


const mapStateToProps = ({ laundry }) => {
  const { laundryHalls, laundryHallInfo } = laundry
  return { laundryHalls, laundryHallInfo }
}


LaundryCard.defaultProps = {
  hallURLId: null,
}


LaundryCard.propTypes = {
  hallURLId: PropTypes.string,
  locationObject: PropTypes.shape({
    location: PropTypes.string,
    halls: PropTypes.arrayOf(PropTypes.shape({
      hall_name: PropTypes.string,
      id: PropTypes.number,
      location: PropTypes.string,
    })),
  }).isRequired,
}


export default connect(mapStateToProps, null)(LaundryCard)
