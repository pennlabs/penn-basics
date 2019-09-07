import React from 'react'
import s from 'styled-components'

import { BORDER } from '../../styles/colors'
import { maxWidth, PHONE, TABLET, minWidth } from '../../styles/sizes'

const percent = numCols => (numCols / 12) * 100 + '%'

export const Row = s.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  overflow-y: ${({ overflowY }) => overflowY || 'hidden'};

  ${({ margin }) =>
    margin &&
    `
    margin-left: -${margin};
    margin-right: -${margin};
    width: calc(100% + ${margin} + ${margin});
  `}

  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}

  ${maxWidth(PHONE)} {
    display: block;
  }
`

const ColWrapper = s.div`
  flex: ${({ width }) => (width ? 'none' : 1)};
  width: ${({ width }) => width || 'auto'};
  padding: ${({ padding }) => padding || 0};
  
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ height }) => height && `height: ${height};`}

  ${({ flex }) => flex && `display: flex;`}
  ${({ backgroundImage }) =>
    backgroundImage &&
    `
    background-image: url(${backgroundImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}
  
  background: ${({ background }) => background || ''};
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  overflow-y: ${({ overflowY }) => overflowY || 'hidden'};
  overflow-x: ${({ overflowX }) => overflowX || 'visible'};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || 0};
  border-right: ${({ borderRight }) => borderRight && `1px solid ${BORDER}`};

  ${({ sm }) =>
    sm &&
    `
    width: ${percent(sm)};
    flex: none;
  `}

  ${({ offsetSm }) => offsetSm && `margin-left: ${percent(offsetSm)};`}

  ${minWidth(PHONE)} {
    ${({ md }) =>
      md &&
      `
      width: ${percent(md)}
      flex: none;
    `}

    ${({ offsetMd }) => offsetMd && `margin-left: ${percent(offsetMd)};`}
  }

  ${minWidth(TABLET)} {
    ${({ lg }) =>
      lg &&
      `
      width: ${percent(lg)}
      flex: none;
    `}

    ${({ offsetLg }) =>
      offsetLg &&
      `
      margin-left: ${percent(offsetLg)};
    `}
  }
`

const ColContainer = s.div`
  ${({ margin }) =>
    margin &&
    `
    margin-left: ${margin};
    margin-right: ${margin};
  `}
`

export const Col = ({ margin, children, ...other }) => (
  <ColWrapper {...other}>
    {margin ? (
      <ColContainer margin={margin}>{children}</ColContainer>
    ) : (
      children
    )}
  </ColWrapper>
)

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
