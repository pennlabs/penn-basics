import React from 'react'
import s from 'styled-components'
import { minWidth, maxWidth, TABLET } from '../../styles/sizes'

export const withHideAboveTablet = component => s(component)`
  ${minWidth(TABLET)} {
    display: none;
  }
`

export const HiddenAboveTablet = withHideAboveTablet(s.span``)

export const withHideOnTablet = component => s(component)`
  ${maxWidth(TABLET)} {
    display: none;
  }
`

export const HiddenOnTablet = withHideOnTablet(s.span``)
