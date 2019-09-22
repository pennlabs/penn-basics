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
    let areActiveOptions = activeOptions && activeOptions.length
    let btnText = text

    // If the user is filtering by some attributes, set the text of the button
    // to be the "active" attributes separated by commas
    if (areOptions && activeOptions && activeOptions.length) {
      const activeOptionsArr = options.filter((o, idx) =>
        activeOptions.includes(idx)
      )

      if (activeOptionsArr && activeOptionsArr.length) {
        areActiveOptions = true
        btnText = ''

        activeOptionsArr.forEach(o => {
          btnText += `${o}, `
        })

        // Strip off the last comma
        btnText = btnText.substring(0, btnText.length - 2)
      }
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
