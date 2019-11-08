import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'
import { Link } from 'react-router-dom'

import { BLACK } from '../../../styles/colors'
import Chevron from '../../../../../public/img/chevron-left.svg'
import { minWidth, TABLET } from '../../../styles/sizes'

const Wrapper = s.div`
  opacity: 0.5;
  padding-top: 1rem;
  padding-right: 0.75rem;
  margin-left: -0.5rem;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }

  ${minWidth(TABLET)} {
      display: none !important;
  }
`

const Back = ({ to = '/' }) => (
  <Wrapper>
    <Link to={to} style={{ color: BLACK }}>
      <Chevron style={{ transform: 'scale(1.4)' }} />
    </Link>
  </Wrapper>
)

Back.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Back
