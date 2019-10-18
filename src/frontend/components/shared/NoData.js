import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from './Flex'
import { NAV_HEIGHT, FILTER_HEIGHT } from '../../styles/sizes'

export const NoData = ({ image, imageAlt, text }) => (
  <div
    className="columns is-vcentered"
    style={{ height: `calc(100% - ${NAV_HEIGHT}` }}
  >
    <Row>
      <Col sm={12} offsetMd={2} md={8} offsetLg={3} lg={6}>
        <img src={image} alt={imageAlt} />
        <p style={{ opacity: 0.5, fontSize: '150%', textAlign: 'center' }}>
          {text}
        </p>
      </Col>
    </Row>
  </div>
)

export const NoDataHome = ({ image, imageAlt, text }) => (
  <div
    className="columns is-vcentered"
    style={{ height: `calc(100% - ${NAV_HEIGHT}` }}
  >
    <Row>
      <Col sm={12} offsetMd={2} md={8} offsetLg={3} lg={6}>
        <img
          src={image}
          alt={imageAlt}
          style={{ maxWidth: '60%', marginLeft: '5em' }}
        />
        <p
          style={{
            opacity: 0.5,
            fontSize: '150%',
            textAlign: 'center',
            marginTop: '1em',
            marginBottom: '0.5em',
          }}
        >
          {text}
        </p>
      </Col>
    </Row>
  </div>
)

export const NoDataScroll = ({ image, imageAlt, text }) => (
  <div
    className="columns is-vcentered"
    style={{ height: `calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})` }}
  >
    <Row>
      <Col sm={12} offsetMd={2} md={8} offsetLg={3} lg={6}>
        <img src={image} alt={imageAlt} />
        <p
          style={{
            opacity: 0.5,
            fontSize: '150%',
            textAlign: 'center',
            marginTop: '1.5rem',
          }}
        >
          {text}
        </p>
      </Col>
    </Row>
  </div>
)

NoData.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

NoDataHome.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

NoDataScroll.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
