import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'

import {
  GREEN,
  MUSTARD,
  MEDIUM_GRAY,
  FOCUS_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
} from '../../styles/colors'

const colorMap = {
  'Ready to start': [GREEN, LIGHT_GREEN],
  Available: [GREEN, LIGHT_GREEN],
  'In use': [MUSTARD, LIGHT_YELLOW],
  'End of cycle': [GREEN, LIGHT_GREEN],
  'Not online': [MEDIUM_GRAY, FOCUS_GRAY],
}

const Pill = s.span`
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
`

const StatusPill = ({ status }) => {
  const [color, background] = colorMap[status] || colorMap['Not online']
  return (
    <Pill background={background} color={color}>
      {status}
    </Pill>
  )
}

StatusPill.propTypes = {
  status: PropTypes.string.isRequired,
}

export default StatusPill
