import s from 'styled-components'

import {
  WHITE,
  ALLBIRDS_GRAY,
  DARK_GRAY,
  BLUE,
  DARK_BLUE,
  BORDER,
  SNOW_ALPHA,
  MEDIUM_GRAY,
  BABY_BLUE,
} from '../../styles/colors'

export const FilterBtnWrapper = s.a`
  margin-right: 1rem;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 4px;

  padding: 0.5rem 0.75rem;
  border-color: ${BORDER};
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  color: ${MEDIUM_GRAY} !important;

  :hover {
    background: ${ALLBIRDS_GRAY};
  }
  
  :focus {
    outline: 0 !important;
    box-shadow: 0 0 0 2px ${DARK_BLUE};
  }

  ${({ active }) =>
    active &&
    `
    background: ${BLUE} !important;
    color: ${WHITE} !important;

    :hover,
    :focus {
      background: ${DARK_BLUE} !important;
    }
  `}
`

export const OptionsModalBacking = s.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${SNOW_ALPHA};
  z-index: 1299;
`

export const OptionsModalWrapper = s.div`
  position: absolute;
  z-index: 1300;
  background: ${WHITE};
  border-radius: 4px;
  transform: translate(-0.75rem, calc(1rem + 1px));
  padding: 1rem calc(1rem + 0.125%);
  border: 1px solid ${BORDER};
  cursor: default;
  box-shadow: 0 0 8px ${BORDER};

  div {
    margin-bottom: 0.2rem;
    outline: 0 !important; // TODO

    color: ${MEDIUM_GRAY};

    :active,
    :focus,
    :hover {
      color: ${DARK_GRAY};
    }

    :last-child {
      margin-bottom: 0;
    }
  }
`

export const Option = s.div`
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
  margin-left: -0.4rem;
  margin-right: -0.4rem;

  :active,
  :hover,
  :focus {
    background: ${BABY_BLUE};
  }
`

export const Circle = s.span`
  height: 1rem;
  width: 1rem;
  transform: translateY(0.1rem);
  border-radius: 50%;
  border: 2px solid ${BORDER};
  display: inline-block;
  margin-right: 0.5rem;

  ${({ active }) =>
    active &&
    `
    background: ${BLUE};
    border: 2px solid ${DARK_BLUE};
  `}
`

export const OptionText = s.span`
  color: ${DARK_GRAY};
`