import React from 'react'
import PropTypes from 'prop-types'

import WrappedLink from '../WrappedLink'

const LinkItem = ({ name, url }) => (
  <li>
    <WrappedLink to={`${url}`} className="link">
      {name}
    </WrappedLink>
  </li>
)

LinkItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default LinkItem
