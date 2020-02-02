import React from 'react'
import PropTypes from 'prop-types'

import { PENN_DINING_URL } from '../../constants/routes'
import { BorderedCard, AnchorButton, Text } from '../shared'
import HoursVisualization from './HoursVisualization'
import venueData from '../../../server/resources/dining/venue_info.json'
import ExternalLinkIcon from '../../../../public/img/external-link.svg'

const DiningOverview = ({ id }) => {
  const { description, pennDiningSlug } = venueData[id]

  return (
    <>
      <BorderedCard>
        {description && <Text>{description}</Text>}
        <HoursVisualization venueId={id} />
      </BorderedCard>

      {pennDiningSlug && (
        <div style={{ textAlign: 'center' }}>
          <AnchorButton
            href={PENN_DINING_URL(pennDiningSlug)}
            target="_BLANK"
            lg
          >
            View Menu Details
            <ExternalLinkIcon
              style={{ transform: 'scale(0.75)', marginLeft: '0.2rem' }}
            />
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
