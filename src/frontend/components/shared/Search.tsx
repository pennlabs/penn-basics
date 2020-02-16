import React, { useState } from 'react'
import s, { css } from 'styled-components'

import {
  BORDER,
  FOCUS_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
  LIGHTER_BLUE,
  BLACK_ALPHA,
  WHITE,
} from '../../styles/colors'
import SearchIcon from '../../../../public/img/search.svg'
import { maxWidth, PHONE } from '../../styles/sizes'

const HEIGHT = 42
const MOBILE_HEIGHT = 29.2
const MOBILE_WIDTH = 100

interface ILabel {
  showInput?: boolean
  active?: boolean
}

const Label = s.label(
  ({ showInput, active }: ILabel) => css`
    margin-right: 1rem;
    padding: 0 8px;
    height: ${HEIGHT}px;
    min-width: ${HEIGHT}px;
    background: ${WHITE};
    display: inline-block;
    margin-bottom: 0;
    border: 1px solid ${BORDER};
    border-radius: ${HEIGHT / 2}px;
    box-shadow: 0 1px 4px ${BLACK_ALPHA(0.3)};
    cursor: pointer;

    ${showInput &&
      `box-shadow: none; background: ${FOCUS_GRAY}; border-color: transparent;`}

    ${active && `box-shadow: 0 0 0 2px ${LIGHTER_BLUE};`}

    ${maxWidth(PHONE)} {
      font-size: 80%;
      line-height: 1;
      margin-right: 0.5rem;
      height: ${MOBILE_HEIGHT}px;
      min-width: ${MOBILE_HEIGHT}px;
      border-radius: ${MOBILE_HEIGHT / 2}px;
      padding: 0 2px;
      padding-right: ${active ? MOBILE_WIDTH : 0}px;
    }
  `
)

const SearchComponent = s.input`
  font-size: 1rem;
  font-weight: 400;
  background: transparent;
  line-height: ${HEIGHT}px;
  height: ${HEIGHT}px;
  color: ${MEDIUM_GRAY};
  border: 0;
  border-color: transparent;
  border-radius: 0;
  margin: 0;
  padding-left: 28px;
  padding-right: 4px;
  padding-bottom: 4px;

  :focus {
    outline: none;
    color: ${DARK_GRAY};
    border-bottom-color: ${BORDER};
  }

  ${maxWidth(PHONE)} {
    line-height: ${MOBILE_HEIGHT}px;
    height: ${MOBILE_HEIGHT}px;
    width: ${MOBILE_WIDTH}px;
  }
`

const SearchIconStyled = s(SearchIcon)`
  top: 16px;
  transform: scale(0.8);
  position: absolute;

  ${maxWidth(PHONE)} {
    top: 10px;
    transform: scale(0.64);
  }
`

const INPUT_ID = 'search-line'

interface ISearchProps {
  filterFunction: (value: any) => void
  filterString?: string
}

export const Search = ({
  filterFunction,
  filterString,
}: ISearchProps): React.ReactElement => {
  const [showInput, setShowInput] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <Label
      htmlFor={INPUT_ID}
      showInput={showInput}
      active={active}
      onClick={(): void => {
        if (!showInput) {
          setShowInput(true)
        }
      }}
    >
      {/* TODO port this over to styled components */}
      <SearchIconStyled
        className="fas fa-search"
        onClick={(e: React.MouseEvent<Element, MouseEvent>): void => {
          e.stopPropagation()
          setShowInput(!showInput)
        }}
        style={{ cursor: 'pointer' }}
      />
      {showInput && (
        <SearchComponent
          id={INPUT_ID}
          onFocus={(): void => setActive(true)}
          onBlur={(): void => setActive(false)}
          onChange={(e): void => filterFunction(e.target.value)}
          value={filterString}
        />
      )}
    </Label>
  )
}
