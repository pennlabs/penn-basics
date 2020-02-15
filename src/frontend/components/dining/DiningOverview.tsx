import React from 'react'

import { PENN_DINING_URL } from '../../constants/routes'
import { BorderedCard, AnchorButton, Text } from '../shared'
import HoursVisualization from './HoursVisualization'
import data from '../../../server/resources/dining/venue_info.json'
import ExternalLinkIcon from '../../../../public/img/external-link.svg'
import { TVenueData } from '../../../types/dining'

const venueData = data as TVenueData

const DiningOverview = ({ id }: { id: string }) => {
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

export default DiningOverview
