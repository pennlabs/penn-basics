import React from 'react'
import s from 'styled-components'

import { Row, Col } from './Flex'
import {
  maxWidth,
  NAV_HEIGHT,
  FILTER_HEIGHT,
  TABLET,
  MOBILE_FILTER_HEIGHT,
} from '../../styles/sizes'

const Text = s.p`
  opacity: 0.5;
  font-size: 150%;
  text-align: center;
  line-height: 1.15;
`

interface INoDataProps {
  image: string
  imageAlt: string
  text: string
}

export const NoData = ({
  image,
  imageAlt,
  text,
}: INoDataProps): React.ReactElement => (
  <div
    className="columns is-vcentered"
    style={{ height: `calc(100% - ${NAV_HEIGHT}` }}
  >
    <Row>
      <Col sm={12} offsetMd={2} md={8} offsetLg={3} lg={6}>
        <img src={image} alt={imageAlt} />
        <Text>{text}</Text>
      </Col>
    </Row>
  </div>
)

export const NoDataHome = ({
  image,
  imageAlt,
  text,
}: INoDataProps): React.ReactElement => (
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
        <Text>{text}</Text>
      </Col>
    </Row>
  </div>
)

const NoDataScrollWrapper = s.div`
  height: calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT});
  margin-bottom: 0;

  ${maxWidth(TABLET)} {
    height: calc(100vh - ${NAV_HEIGHT} - ${MOBILE_FILTER_HEIGHT});
  }
`

export const NoDataScroll = ({ image, imageAlt, text }: INoDataProps) => (
  <NoDataScrollWrapper className="columns is-vcentered">
    <Row className="column" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Col offsetSm={1} sm={10} offsetMd={2} md={8} offsetLg={3} lg={6}>
        <img style={{ marginBottom: '0.5rem' }} src={image} alt={imageAlt} />
        <Text>{text}</Text>
      </Col>
    </Row>
  </NoDataScrollWrapper>
)
