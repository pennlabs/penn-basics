import React from 'react'
import PropTypes from 'prop-types'
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

const Button = s.button(
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

const Icon = ({ name }) => <i className={`fa fa-${name} fa-fw fa-lg`} />

Icon.propTypes = { name: PropTypes.string.isRequired }

// TODO make this more accessible
const noop = () => {}

const MobileToggleView = ({ isListView, toggle }) => (
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

MobileToggleView.propTypes = {
  isListView: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default MobileToggleView
