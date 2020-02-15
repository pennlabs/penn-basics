import React from 'react'

import {
  FilterBtnWrapper,
  OptionsModalBacking,
  OptionsModalWrapper,
  Option,
  Circle,
  OptionText,
} from '../Option'
import { noop } from '../../../../utils/helperFunctions'

const ESCAPE_KEY_CODE = 27
const ESCAPE = 'escape'
const SPACE_KEY_CODE = 32
const SPACE = ' '

interface IFilterBtnProps {
  text: string
  active: boolean
  onClick: () => void
  options?: string[] // if there are more than a boolean number of options
  onClickOption?: (optionIdx: number) => void
  activeOptions?: number[]
}

class FilterBtn extends React.Component<IFilterBtnProps, {}> {
  private focusRef: React.RefObject<HTMLAnchorElement>

  constructor(props: IFilterBtnProps) {
    super(props)

    this.focusRef = React.createRef()

    this.areOptions = this.areOptions.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOptionKeyPress = this.handleOptionKeyPress.bind(this)
    this.areActiveOptions = this.areActiveOptions.bind(this)
    this.getBtnText = this.getBtnText.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  componentDidUpdate(prevProps: IFilterBtnProps) {
    const { active } = this.props

    // If we are showing the modal, focus on it
    if (active && !prevProps.active) {
      const { current } = this.focusRef
      if (current) {
        current.focus()
      }
    }
  }

  getBtnText() {
    const { text, options, activeOptions = [] } = this.props

    if (!this.areOptions() || !this.areActiveOptions()) {
      return text
    }

    // If the user is filtering by some attributes, set the text of the button
    // to be the "active" attributes separated by commas
    return (
      options &&
      options.filter((_, idx) => activeOptions.includes(idx)).join(', ')
    )
  }

  handleKeyPress(event: React.KeyboardEvent) {
    const { active } = this.props
    if (!active) {return}

    const { key, keyCode } = event
    const isEscapeEvent =
      keyCode === ESCAPE_KEY_CODE || key.toLowerCase() === ESCAPE

    if (isEscapeEvent) {
      const { onClick } = this.props
      onClick()
    }
  }

  handleOptionKeyPress(event: React.KeyboardEvent, idx: number) {
    const { onClickOption } = this.props

    if (event.keyCode === SPACE_KEY_CODE || event.key === SPACE) {
      onClickOption && onClickOption(idx)
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

  renderModal() {
    const {
      onClick,
      active,
      options,
      onClickOption,
      activeOptions = [],
    } = this.props

    if (!this.areOptions() || !active) {return null}
    const { offsetLeft = 0 } = this.focusRef.current || {}

    return (
      <>
        <OptionsModalBacking onClick={onClick} />

        <OptionsModalWrapper
          onClick={e => e.stopPropagation()}
          left={offsetLeft}
        >
          {options &&
            options.map((o, idx) => {
              const isActiveOption =
                activeOptions && activeOptions.includes(idx)

              return (
                <Option
                  key={o}
                  onClick={() => (onClickOption ? onClickOption(idx) : noop)}
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
    const { onClick, active } = this.props

    const areActiveOptions = this.areActiveOptions()

    return (
      <>
        <FilterBtnWrapper
          tabIndex={0}
          active={active || areActiveOptions}
          onClick={onClick}
          ref={this.focusRef}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyPress}
        >
          {this.getBtnText()}
        </FilterBtnWrapper>
        {this.renderModal()}
      </>
    )
  }
}

export default FilterBtn
