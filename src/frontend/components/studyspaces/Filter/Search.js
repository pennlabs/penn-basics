import s from 'styled-components'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { BORDER, FOCUS_GRAY, MEDIUM_GRAY, DARK_GRAY } from '../../../styles/colors'

const SearchComponent = s.input`
  font-size: 16px;
  font-weight: 400;
  border-width: 0 0 1px;
  background: transparent;
  border-bottom-color: ${FOCUS_GRAY};
  margin-right: 1em;
  color: ${MEDIUM_GRAY};
  
  :focus {
    outline: none;
    color: ${DARK_GRAY};
    border-bottom-color: ${BORDER};
  }
`

const SearchIcon = s.i`
  cursor: pointer;
  ${({ active }) => (active ? 'margin-right: 0.3em' : 'margin-right: 1em')}
`

const Search = ({ filterFunction }) => {
  const [showInput, setInput] = useState(false)
  return (
    <span>
      <SearchIcon className="fas fa-search" onClick={() => setInput(!showInput)} active={showInput} /*eslint-disable-line*/ />
      {showInput && (
        <SearchComponent onChange={e => filterFunction(e.target.value)} />
      )}
    </span>
  )
}

Search.propTypes = {
  filterFunction: PropTypes.func.isRequired,
}

export default Search
