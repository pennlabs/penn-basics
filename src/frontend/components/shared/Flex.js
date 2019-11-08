import React from 'react'
import PropTypes from 'prop-types'
import s, { css } from 'styled-components'

import { BORDER } from '../../styles/colors'
import { maxWidth, PHONE, TABLET, minWidth } from '../../styles/sizes'

const percent = numCols => `${(numCols / 12) * 100}%`

export const Row = s.div(
  ({ maxHeight, overflowY, margin, justifyContent }) => css`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: ${maxHeight || 'none'};
  overflow-y: ${overflowY || 'hidden'};

  ${margin &&
    `
    margin-left: -${margin};
    margin-right: -${margin};
    width: calc(100% + ${margin} + ${margin});`}

  ${justifyContent && `justify-content: ${justifyContent};`}

  ${maxWidth(PHONE)} {
    display: block;
  }`
)

export const FlexRow = s(Row)`
  display: flex !important;
`

const ColWrapper = s.div(
  ({
    width,
    padding,
    maxHeight,
    minHeight,
    height,
    flex,
    backgroundImage,
    background,
    overflowY,
    overflowX,
    borderRadius,
    borderRight,
    sm,
    offsetSm,
    md,
    offsetMd,
    lg,
    offsetLg,
  }) => css`
  flex: ${width ? 'none' : 1};
  width: ${width || 'auto'};
  padding: ${padding || 0};
  
  ${maxHeight && `max-height: ${maxHeight};`}
  ${minHeight && `min-height: ${minHeight};`}
  ${height && `height: ${height};`}

  ${flex && `display: flex;`}
  ${backgroundImage &&
    `
    background-image: url(${backgroundImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}
  
  background: ${background || ''};
  max-height: ${maxHeight || 'none'};
  overflow-y: ${overflowY || 'hidden'};
  overflow-x: ${overflowX || 'visible'};
  box-sizing: border-box;
  border-radius: ${borderRadius || 0};
  border-right: ${borderRight && `1px solid ${BORDER}`};

  ${sm && `width: ${percent(sm)}; flex: none;`}

  ${offsetSm && `margin-left: ${percent(offsetSm)};`}

  ${minWidth(PHONE)} {
    ${md && `width: ${percent(md)}; flex: none;`}
    ${offsetMd && `margin-left: ${percent(offsetMd)};`}
  }

  ${minWidth(TABLET)} {
    ${lg && `width: ${percent(lg)}; flex: none;`}
    ${offsetLg && `margin-left: ${percent(offsetLg)};`}
  }`
)

const ColContainer = s.div(({ margin }) =>
  margin ? `margin-left: ${margin}; margin-right: ${margin};` : ``
)

export const Col = ({ margin, children, ...other }) => (
  <ColWrapper {...other}>
    {margin ? (
      <ColContainer margin={margin}>{children}</ColContainer>
    ) : (
      children
    )}
  </ColWrapper>
)

Col.defaultProps = {
  margin: null,
  children: null,
}

Col.propTypes = {
  margin: PropTypes.string,
  children: PropTypes.node,
}

export const ColSpace = s(Col)`
  flex: none;
  width: ${({ width }) => width || '1rem'};

  ${maxWidth(PHONE)} {
    display: none;
  }
`

export const Spacer = s.div`
  display: block;
  width: 100%;
  height: 1rem;
`
