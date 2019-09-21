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

  componentDidMount() {
    const { initialize } = this.props
    initialize()
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
    const { onClickOption, activeOptions } = this.props

    if (event.keyCode === SPACE_KEY_CODE || event.key === ' ') {
      onClickOption(activeOptions, idx)
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

            <OptionsModalWrapper onClick={e => e.stopPropagation()}>
              {options.map((o, idx) => {
                const isActiveOption = Boolean(
                  activeOptions && activeOptions.includes(idx)
                )

                return (
                  <Option
                    key={o}
                    onClick={() => onClickOption(activeOptions, idx)}
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
  initialize: PropTypes.func.isRequired,
  active: PropTypes.bool,
  activeOptions: PropTypes.arrayOf(PropTypes.number),
}

export default FilterBtn
