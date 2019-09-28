import s from 'styled-components'

import { WHITE } from '../../styles/colors'

export const AnchorButton = s.a`
    font-weight: 500;
    color: ${WHITE} !important;

    &:hover,
    &:visited,
    &:active,
    &:focus {
        color: ${WHITE} !important;
    }
`
