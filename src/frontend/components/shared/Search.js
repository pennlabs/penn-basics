import s from 'styled-components'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { BORDER, FOCUS_GRAY, MEDIUM_GRAY, DARK_GRAY } from '../../styles/colors'
import SearchIcon from '../../../../public/img/search.svg'

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
const inputId = 'searchLine'

export const Search = ({ filterFunction, filterString }) => {
  const [showInput, setInput] = useState(false)
  return (
    <span>
      <label htmlFor={inputId} style={{ marginRight: showInput ? '0.3em' : '0.5em' }} /* eslint-disable-line */>
        <SearchIcon
          viewBox="0 0 30 30"
          transform="translate(0, 9)"
          onClick={() => setInput(!showInput)}
          cursor="pointer"
        />
      </label>
      {showInput && (
        <SearchComponent
          id={inputId}
          onChange={e => filterFunction(e.target.value)}
          value={filterString}
        />
      )}
    </span>
  )
}

Search.propTypes = {
  filterFunction: PropTypes.func.isRequired,
  filterString: PropTypes.string.isRequired,
}

export default Search
