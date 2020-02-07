import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  WHITE,
  SHADOW,
  FOCUS_GRAY,
  BORDER,
  PURPLE,
  BABY_BLUE,
} from '../../styles/colors'
import { NavHeader } from './Typography'
import { Line } from './Line'

export const Card = styled.div`
  background: ${({ background }) => background || WHITE};
  padding: ${({ padding }) => padding || '1rem'};
  box-shadow: ${({ shade }) => (shade ? `0 0 14px 0 ${SHADOW}` : 'none')};
  opacity: 1;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};

  ${({ selected }) => selected && `border-left: 6px solid ${PURPLE}`}

  ${({ hoverable }) =>
    hoverable &&
    `
    &:hover {
      background: ${FOCUS_GRAY};
    }
  `}
`

export const BorderedCard = styled(Card)`
  border: 1px solid ${BORDER};
  border-radius: 4px;
  margin-bottom: 1rem;
`

export const NavHeaderCard = ({ title }) => (
  <Card background={BABY_BLUE} padding="0">
    <NavHeader className="title is-5">{title}</NavHeader>
    <Line />
  </Card>
)

NavHeaderCard.propTypes = { title: PropTypes.string.isRequired }
