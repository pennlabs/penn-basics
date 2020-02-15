import React from 'react'
import s, { css } from 'styled-components'

import { Z_INDEX, minWidth, PHONE } from '../../styles/sizes'
import {
  BORDER,
  BLUE,
  WHITE,
  DARK_GRAY,
  BABY_BLUE,
  LIGHTER_BLUE,
} from '../../styles/colors'

const BORDER_RADIUS = '8px'

const ToggleViewWrapper = s.div`
  position: fixed;
  z-index: ${Z_INDEX + 1};
  top: 12px;
  margin-left: 50vw;
  transform: translateX(-50%);

  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 0.6rem 0;
    text-align: center;
    display: inline-block;
    width: 2.25rem;
    border: 1px solid ${BORDER};

    :first-child {
      border-right-width: 0.5px;
      border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
    }

    :last-child {
      border-left-width: 0.5px;
      border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
    }
  }

  ${minWidth(PHONE)} {
    display: none;
  }
`

interface IButtonProps {
  active?: boolean
}

const Button = s.button<IButtonProps>(
  ({ active }) => css`
    cursor: pointer;
    background: ${WHITE};

    :hover {
      background: ${BABY_BLUE};
    }

    :focus {
      outline: 0 !important;
      box-shadow: 0 0 0 2px ${LIGHTER_BLUE};
    }

    i {
      color: ${DARK_GRAY};
      opacity: 0.9;
    }

    ${active &&
      `
      background: ${BLUE};

      &:hover {
        background: ${BLUE};
      }

      i {
        color: ${WHITE};
      }
    `}
  `
)

// TODO move away from font awesome (we should have no "fa-anythings")
interface IIconProps {
  name?: string
}

const Icon = ({ name }: IIconProps) => (
  <i className={`fa fa-${name} fa-fw fa-lg`} />
)

// TODO make this more accessible
const noop = () => {}

interface IMobileToggleViewProps {
  isListView?: boolean
  toggle?: () => void
}

const MobileToggleView = ({ isListView, toggle }: IMobileToggleViewProps) => (
  <ToggleViewWrapper>
    <Button
      type="button"
      role="link"
      tabIndex={0}
      active={isListView}
      onClick={isListView ? noop : toggle}
      onKeyPress={() => 'TODO'}
    >
      <Icon name="list" />
    </Button>
    <Button
      type="button"
      role="link"
      tabIndex={0}
      active={!isListView}
      onClick={isListView ? toggle : noop}
      onKeyPress={() => 'TODO'}
    >
      <Icon name="map-pin" />
    </Button>
  </ToggleViewWrapper>
)

export default MobileToggleView
