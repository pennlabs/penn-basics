import s, { StyledComponent } from 'styled-components'
import { minWidth, maxWidth, TABLET } from '../../styles/sizes'

export const withHideAboveTablet = (component: StyledComponent<any, any>) => s(
  component
)`
  ${minWidth(TABLET)} {
    display: none;
  }
`

export const HiddenAboveTablet = withHideAboveTablet(s.span``)

export const withHideOnTablet = (component: StyledComponent<any, any>) => s(
  component
)`
  ${maxWidth(TABLET)} {
    display: none;
  }
`

export const HiddenOnTablet = withHideOnTablet(s.span``)
