import s from 'styled-components'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  BORDER,
  FOCUS_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
} from '../../../styles/colors'
import SearchIcon from '../../../../../public/img/search.svg'
import { maxWidth, PHONE } from '../../../styles/sizes'

const Label = s.label`
  margin-right: ${({ showInput }) => (showInput ? '1rem' : '0.5rem')};
  max-height: 29px;
  display: inline-block;
  padding: 0;
  margin-bottom: 0;
  min-width: 24px;

  ${maxWidth(PHONE)} {
    font-size: 80%;
    line-height: 1;
    margin-right: 0.5rem;
  }
`

const SearchComponent = s.input`
  font-size: 1rem;
  font-weight: 400;
  border-width: 0 0 2px 0;
  background: transparent;
  border-bottom-color: ${FOCUS_GRAY};
  margin-left: 0.2rem;
  line-height: 1;
  color: ${MEDIUM_GRAY};
  border-radius: 0;
  padding-left: 28px;
  padding-right: 4px;
  padding-bottom: 4px;

  :focus {
    outline: none;
    color: ${DARK_GRAY};
    border-bottom-color: ${BORDER};
  }
`

const SearchIconStyled = s(SearchIcon)`
  top: 16px;
  transform: scale(0.8);
  position: absolute;

  ${maxWidth(PHONE)} {
    top: 10px;
  }
`

const INPUT_ID = 'search-line'

const Search = ({ filterFunction, filterString }) => {
  const [showInput, setInput] = useState(false)
  return (
    <Label htmlFor={INPUT_ID} showInput={showInput}>
      <SearchIconStyled
        className="fas fa-search"
        onClick={() => setInput(!showInput)}
        cursor="pointer"
      />
      {showInput && (
        <SearchComponent
          id={INPUT_ID}
          onChange={e => filterFunction(e.target.value)}
          value={filterString}
        />
      )}
    </Label>
  )
}

Search.propTypes = {
  filterFunction: PropTypes.func.isRequired,
  filterString: PropTypes.string.isRequired,
}

export default Search
