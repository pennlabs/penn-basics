import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'

import { Card, Row, Col, Text } from '../shared'
import { DARK_GRAY, LIGHT_GRAY } from '../../styles/colors'

interface IChevronProps {
  expanded: boolean
}

const Chevron = s.span<IChevronProps>`
  position: absolute;
  right: 0;
  margin: 6px;
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  border-right: 2px solid ${LIGHT_GRAY};
  border-bottom: 2px solid ${LIGHT_GRAY};
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);

  ${({ expanded }) =>
    expanded &&
    `
    margin: 9px 6px 3px 6px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    `}
`

const LaundryCardHeader = ({ title, hasDropdown, expanded, selected }) => (
  <Card padding="0.5rem 1rem" hoverable selected={selected}>
    <Row>
      <Col padding="0" style={{ overflowX: 'visible' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflowX: 'visible',
          }}
        >
          <Text medium marginBottom="0" color={DARK_GRAY}>
            {title}
          </Text>
          {hasDropdown && <Chevron expanded={expanded} />}
        </div>
      </Col>
    </Row>
  </Card>
)

LaundryCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hasDropdown: PropTypes.bool,
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
}

LaundryCardHeader.defaultProps = {
  hasDropdown: false,
  expanded: false,
  selected: false,
}

export default LaundryCardHeader
