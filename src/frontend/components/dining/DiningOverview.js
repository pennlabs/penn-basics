import React from 'react'
import PropTypes from 'prop-types'

import { BorderedCard } from '../shared'
import HoursVisualization from './HoursVisualization'
import venueData from '../../../server/resources/dining/venue_info.json'
import { AnchorButton } from '../shared/Button'
import { PENN_DINING_BASE_URL } from '../../constants/routes'

const DiningOverview = ({ id }) => {
  const { description, pennDiningSlug } = venueData[id]

  return (
    <>
      <BorderedCard>
        {description && <p style={{ marginBottom: '1rem' }}>{description}</p>}
        <HoursVisualization venueId={id} />
      </BorderedCard>

      {pennDiningSlug && (
        <div style={{ textAlign: 'center' }}>
          <AnchorButton
            href={`${PENN_DINING_BASE_URL}${pennDiningSlug}`}
            target="_BLANK"
            lg
          >
            View Menu Details
          </AnchorButton>
        </div>
      )}
    </>
  )
}

DiningOverview.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DiningOverview
