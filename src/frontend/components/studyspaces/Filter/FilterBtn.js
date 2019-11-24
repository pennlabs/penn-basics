import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  FilterBtnWrapper,
  OptionsModalBacking,
  OptionsModalWrapper,
  Option,
  Circle,
  OptionText,
} from '../../shared/Option'

const ESCAPE_KEY_CODE = 27
const ESCAPE = 'escape'
const SPACE_KEY_CODE = 32
const SPACE = ' '

class FilterBtn extends Component {
  constructor(props) {
    super(props)

    this.focusRef = React.createRef()

    this.areOptions = this.areOptions.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOptionKeyPress = this.handleOptionKeyPress.bind(this)
    this.areActiveOptions = this.areActiveOptions.bind(this)
    this.getBtnText = this.getBtnText.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props

    // If we are showing the modal, focus on it
    if (active && !prevProps.active) {
      this.focusRef.current.focus()
    }
  }

  getBtnText() {
    const { text, options, activeOptions = [] } = this.props

    if (!this.areOptions() || !this.areActiveOptions()) {
      return text
    }

    // If the user is filtering by some attributes, set the text of the button
    // to be the "active" attributes separated by commas
    const activeOptionsArr = options.filter((_, idx) =>
      activeOptions.includes(idx)
    )

    // if (activeOptionsArr && activeOptionsArr.length) {
    return activeOptionsArr.join(', ')
    // }

    // return text
  }

  handleKeyPress(event) {
    const { active } = this.props
    if (!active) return

    const { key, keyCode } = event
    const isEscapeEvent =
      keyCode === ESCAPE_KEY_CODE || key.toLowerCase() === ESCAPE

    if (isEscapeEvent) {
      const { onClick } = this.props
      onClick()
    }
  }

  handleOptionKeyPress(event, idx) {
    const { onClickOption } = this.props

    if (event.keyCode === SPACE_KEY_CODE || event.key === SPACE) {
      onClickOption(idx)
    }
  }

  areOptions() {
    const { options } = this.props
    return Boolean(options && options.length)
  }

  areActiveOptions() {
    const { activeOptions = [] } = this.props
    return Boolean(activeOptions && activeOptions.length)
  }

  render() {
    const {
      options,
      onClick,
      onClickOption,
      active,
      activeOptions = [],
    } = this.props

    const areOptions = this.areOptions()
    const areActiveOptions = this.areActiveOptions()

    return (
      <>
        <FilterBtnWrapper
          tabIndex={0}
          active={active || areActiveOptions}
          options={areOptions}
          onClick={onClick}
          ref={this.focusRef}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyPress}
        >
          {this.getBtnText()}
        </FilterBtnWrapper>
        {areOptions && active && (
          <>
            <OptionsModalBacking onClick={onClick} />

            <OptionsModalWrapper onClick={e => e.stopPropagation()}>
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
      </>
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
