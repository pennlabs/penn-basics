import React from 'react'
import PropTypes from 'prop-types'
import s, { css } from 'styled-components'

import { BORDER } from '../../styles/colors'
import {
  maxWidth,
  PHONE,
  TABLET,
  minWidth,
  MAX_BODY_HEIGHT,
} from '../../styles/sizes'

const percent = numCols => `${(numCols / 12) * 100}%`

export const Row = s.div(
  ({ maxHeight, overflowY, margin, justifyContent, fullHeight }) => css`
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
    max-height: none !important;
    overflow-y: visible;
  }
  
  // Allow scrolling on mobile
  ${minWidth(TABLET)} {
    ${fullHeight && `height: ${MAX_BODY_HEIGHT};`}
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
    fullHeight,
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
    hideOnMobile,
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

  ${sm && `width: ${percent(sm)}; flex: none;`}

  ${offsetSm && `margin-left: ${percent(offsetSm)};`}

  ${minWidth(PHONE)} {
    ${md && `width: ${percent(md)}; flex: none;`}
    ${offsetMd && `margin-left: ${percent(offsetMd)};`}

    // Only show border right when the column is not full width
    // On mobile the col will always be full width so this would look odd
    border-right: ${borderRight && `1px solid ${BORDER}`};
  }

  ${minWidth(TABLET)} {
    ${lg && `width: ${percent(lg)}; flex: none;`}
    ${offsetLg && `margin-left: ${percent(offsetLg)};`}
    ${fullHeight && `height: ${MAX_BODY_HEIGHT};`}
  }
  
  ${maxWidth(PHONE)} {
    ${hideOnMobile && 'display: none !important;'}
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
