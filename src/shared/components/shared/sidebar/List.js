import React from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

const List = ({ links = [] }) => {
  const list = links.map(({ name, isOpen, venueID }) => (
    <ListItem name={name} isOpen={isOpen} venueID={venueID} key={venueID} />
  ))

  return <ul>{list}</ul>
}

List.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      isOpen: PropTypes.bool,
      venueID: PropTypes.number,
    })
  ).isRequired,
}

export default List
