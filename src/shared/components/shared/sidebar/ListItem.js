import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ListItem = ({ venueID, isOpen, name }) => (
  <Link to={`/dining/${venueID}`}>
    <li>
      <span className={isOpen ? 'open' : 'closed'} />
      {name}
    </li>
  </Link>
)

ListItem.propTypes = {
  venueID: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}

export default ListItem
