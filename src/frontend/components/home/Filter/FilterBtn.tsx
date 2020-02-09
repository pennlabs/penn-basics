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

// TODO this is duplicate code

class FilterBtn extends Component {
  constructor(props) {
    super(props)

    this.focusRef = React.createRef()

    this.areOptions = this.areOptions.bind(this)
    this.areActiveOptions = this.areActiveOptions.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOptionKeyPress = this.handleOptionKeyPress.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  componentDidMount() {
    const { initialize, options } = this.props
    initialize(options.length)
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

  areActiveOptions() {
    const { activeOptions, options } = this.props
    return Boolean(activeOptions && activeOptions.length < options.length)
  }

  renderModal() {
    const {
      onClick,
      onClickOption,
      active,
      options,
      activeOptions = [],
    } = this.props

    if (!this.areOptions() || !active) return null
    const { offsetLeft } = this.focusRef.current

    return (
      <>
        <OptionsModalBacking onClick={onClick} />

        <OptionsModalWrapper
          onClick={e => e.stopPropagation()}
          left={offsetLeft}
        >
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
    )
  }

  render() {
    const { text, onClick, options, active, activeOptions = [] } = this.props

    const areOptions = options && options.length
    const areActiveOptions = this.areActiveOptions()
    let btnText = text

    if (areOptions && activeOptions && activeOptions.length < options.length) {
      btnText = 'Customized'
    }

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
          {btnText}
        </FilterBtnWrapper>
        {this.renderModal()}
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
  initialize: PropTypes.func.isRequired,
  active: PropTypes.bool,
  activeOptions: PropTypes.arrayOf(PropTypes.number),
}

export default FilterBtn
