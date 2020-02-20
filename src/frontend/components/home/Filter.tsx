import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'

import {
  filterHomeCustomize,
  toggleHomeCustomize,
  initializeFilterHome,
} from '../../actions/home_actions'

import {
  FilterBtnWrapper,
  Circle,
  OptionText,
} from '../shared/Option'
import Modal from '../shared/Modal'

import { IHomeReducerState } from '../../../types/home'

interface IFilterProps {
  dispatchFilterHomeCustomize: (filter: number) => void
  dispatchToggleHomeCustomize: () => void
  dispatchInitializeFilterHome: (optionsLength: number) => void
  filterCustomizeActive: boolean
  filterList?: number[]
}

const Filter = ({
  dispatchFilterHomeCustomize,
  dispatchToggleHomeCustomize,
  dispatchInitializeFilterHome,
  filterCustomizeActive,
  filterList,
}: IFilterProps) => {

  const onClick = dispatchToggleHomeCustomize
  const onClickOption = dispatchFilterHomeCustomize
  const options = ['Weather', 'Events', 'News', 'Laundry', 'Dining', 'Quotes']
  const activeOptions = filterList
  const initialize = dispatchInitializeFilterHome

  const areActiveOptions = () => {
    return Boolean(activeOptions && activeOptions.length < options.length)
  }

  useEffect(() => {
    initialize(options.length)
  }, [])

  const focusRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (filterCustomizeActive) {
      const { current } = focusRef
      if (current) {
        current.focus()
      }
    }
  }, [filterCustomizeActive])

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const ESCAPE_KEY_CODE = 27

    if (
      (event.keyCode === ESCAPE_KEY_CODE ||
        event.key.toLowerCase() === 'escape') &&
      filterCustomizeActive
    ) {
      onClick()
    }
  }

  const handleOptionKeyPress = (event: React.KeyboardEvent, idx: number) => {
    const SPACE_KEY_CODE = 32

    if (event.keyCode === SPACE_KEY_CODE || event.key === ' ') {
      onClickOption(idx)
    }
  }

  const ModalOption = s.div`
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    margin-left: 1rem;
    margin-right: 1rem;

    :active,
    :hover,
  `

  return (
    <>
      <FilterBtnWrapper
        tabIndex={0}
        active={filterCustomizeActive || areActiveOptions()}
        onClick={onClick}
        ref={React.createRef()}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyPress}
      >
        Customize this page
      </FilterBtnWrapper>

      <Modal show={filterCustomizeActive} toggle={onClick} isHome={true}>
        {options.map((o, idx) => {
          const isActiveOption = Boolean(
            activeOptions && activeOptions.includes(idx)
          )

          return (
            <ModalOption
              key={o}
              onClick={() => onClickOption(idx)}
              role="option"
              tabIndex={0}
              aria-selected={isActiveOption}
              onKeyPress={e => handleOptionKeyPress(e, idx)}
            >
              <Circle active={isActiveOption} />
              <OptionText>{o}</OptionText>
            </ModalOption>
          )
        })}
      </Modal>
    </>
  )
}

const mapStateToProps = ({ home }: { home: IHomeReducerState }) => home

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchFilterHomeCustomize: (filter: number) => dispatch(filterHomeCustomize(filter)),
  dispatchToggleHomeCustomize: () => dispatch(toggleHomeCustomize()),
  dispatchInitializeFilterHome: (optionsLength: number) =>
    dispatch(initializeFilterHome(optionsLength)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
