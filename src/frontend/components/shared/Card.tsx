import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
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

interface ICard {
  background?: string
  padding?: string
  shade?: string
  marginBottom?: string
  selected?: boolean
  hoverable?: boolean
}

export const Card = styled.div<ICard>(
  ({
    background,
    padding,
    shade,
    marginBottom,
    selected,
    hoverable,
  }): FlattenSimpleInterpolation => css`
    background: ${background || WHITE};
    padding: ${padding || '1rem'};
    box-shadow: ${shade ? `0 0 14px 0 ${SHADOW}` : 'none'};
    opacity: 1;
    margin-bottom: ${marginBottom || '0'};

    ${selected && `border-left: 6px solid ${PURPLE}`}

    ${hoverable &&
      `
    &:hover {
      background: ${FOCUS_GRAY};
    }
  `}
  `
)

export const BorderedCard = styled(Card)`
  border: 1px solid ${BORDER};
  border-radius: 4px;
  margin-bottom: 1rem;
`

interface INavHeaderCardProps {
  title: string
}

export const NavHeaderCard: React.FC<INavHeaderCardProps> = ({ title }) => (
  <Card background={BABY_BLUE} padding="0">
    <NavHeader className="title is-5">{title}</NavHeader>
    <Line />
  </Card>
)

NavHeaderCard.propTypes = { title: PropTypes.string.isRequired }
