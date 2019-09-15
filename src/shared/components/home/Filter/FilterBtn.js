import React, { Component } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

// TODO merge this with the other component

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
} from '../../../styles/colors'

const FilterBtnWrapper = s.a`
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

const noop = e => e.stopPropagation()

const OptionsModalBacking = s.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${SNOW_ALPHA};
  z-index: 1299;
`

const OptionsModalWrapper = s.div`
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

const Option = s.div`
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

const Circle = s.span`
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

const OptionText = s.span`
  color: ${DARK_GRAY};
`

class FilterBtn extends Component {
  constructor(props) {
    super(props)

    this.focusRef = React.createRef()

    this.areOptions = this.areOptions.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOptionKeyPress = this.handleOptionKeyPress.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props

    // If we are showing the modal, focus on it
    if (active && !prevProps.active) {
      this.focusRef.current.focus()
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('homeFilter')) {
      const { onClickOption, options } = this.props
      options.forEach((option, index) => {
        onClickOption(index)
      })
    }
  }

  handleKeyPress(event) {
    const ESCAPE_KEY_CODE = 27
    const { active } = this.props

    if (
      (event.keyCode === ESCAPE_KEY_CODE ||
        event.key.toLowerCase() === 'escape') &&
      active
    ) {
      const { onClick } = this.props

      onClick()
    }
  }

  handleOptionKeyPress(event, idx) {
    const SPACE_KEY_CODE = 32
    const { onClickOption } = this.props

    if (event.keyCode === SPACE_KEY_CODE || event.key === ' ') {
      onClickOption(idx)
    }
  }

  areOptions() {
    const { options } = this.props
    return Boolean(options && options.length)
  }

  render() {
    const {
      text,
      options,
      onClick,
      onClickOption,
      active,
      activeOptions = [],
    } = this.props

    const areOptions = options && options.length
    const areActiveOptions =
      activeOptions && activeOptions.length < options.length
    let btnText = text

    if (areOptions && activeOptions && activeOptions.length < options.length) {
      btnText = 'Customized'
    }

    return (
      <FilterBtnWrapper
        tabIndex={0}
        active={active || areActiveOptions}
        options={areOptions}
        onClick={onClick}
        ref={this.focusRef}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyPress}
      >
        {btnText}

        {areOptions && active && (
          <>
            <OptionsModalBacking />

            <OptionsModalWrapper onClick={noop}>
              {options.map((o, idx) => {
                const isActiveOption = Boolean(
                  activeOptions && activeOptions.includes(idx)
                )

                return (
                  <Option
                    key={o}
                    onClick={() => onClickOption(idx)}
                    role="option"
                    tabIndex={0}
                    aria-selected={isActiveOption}
                    onKeyPress={e => this.handleOptionKeyPress(e, idx)}
                  >
                    <Circle active={isActiveOption} />
                    <OptionText active={isActiveOption}>{o}</OptionText>
                  </Option>
                )
              })}
            </OptionsModalWrapper>
          </>
        )}
      </FilterBtnWrapper>
    )
  }
}

FilterBtn.defaultProps = {
  options: null,
  onClick: () => {},
  onClickOption: () => {},
  active: false,
  activeOptions: [],
}

FilterBtn.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onClickOption: PropTypes.func,
  active: PropTypes.bool,
  activeOptions: PropTypes.arrayOf(PropTypes.number),
}

export default FilterBtn
