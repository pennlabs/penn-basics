import React, { Component } from 'react'

import {
  FilterBtnWrapper,
  OptionsModalBacking,
  OptionsModalWrapper,
  Option,
  Circle,
  OptionText,
} from '../../shared/Option'

// TODO this is duplicate code

interface IFilterBtnProps {
  text: string
  active: boolean
  onClick: () => void
  options: string[] // if there are more than a boolean number of options
  onClickOption: (optionIdx: number) => void
  activeOptions?: number[]
  initialize: (optionsLength: number) => void
}

class FilterBtn extends Component<IFilterBtnProps> {
  private focusRef: React.RefObject<HTMLAnchorElement>

  constructor(props: IFilterBtnProps) {
    super(props)

    this.focusRef = React.createRef()

    this.areOptions = this.areOptions.bind(this)
    this.areActiveOptions = this.areActiveOptions.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOptionKeyPress = this.handleOptionKeyPress.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  componentDidMount(): void {
    const { initialize, options } = this.props
    initialize(options.length)
  }

  componentDidUpdate(prevProps: IFilterBtnProps): void {
    const { active } = this.props

    // If we are showing the modal, focus on it
    if (active && !prevProps.active) {
      const { current } = this.focusRef
      if (current) {
        current.focus()
      }
    }
  }

  handleKeyPress = (event: React.KeyboardEvent): void => {
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

  handleOptionKeyPress = (event: React.KeyboardEvent, idx: number): void => {
    const SPACE_KEY_CODE = 32
    const { onClickOption } = this.props

    if (event.keyCode === SPACE_KEY_CODE || event.key === ' ') {
      onClickOption(idx)
    }
  }

  areOptions = (): boolean => {
    const { options } = this.props
    return Boolean(options && options.length)
  }

  areActiveOptions = (): boolean => {
    const { activeOptions, options } = this.props
    return Boolean(activeOptions && activeOptions.length < options.length)
  }

  renderModal = (): JSX.Element | null => {
    const {
      onClick,
      onClickOption,
      active,
      options,
      activeOptions = [],
    } = this.props

    if (!this.areOptions() || !active) {
      return null
    }
    const { offsetLeft } = this.focusRef.current || {}

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
                <OptionText>{o}</OptionText>
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
          // options={areOptions}
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

export default FilterBtn
