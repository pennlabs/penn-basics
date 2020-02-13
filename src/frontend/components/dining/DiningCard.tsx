import React from 'react'
import s from 'styled-components'
import moment from 'moment'
import Link from 'next/link'

import { convertDate, pad } from '../../../utils/helperFunctions'
import {
  StyledLink,
  FlexRow,
  Col,
  Card,
  Subtitle,
  Subtext,
  Line,
  Circle,
} from '../shared'
import { IVenueHour, IDaypart, TVenueData } from '../../types'
import venueDataJSON from '../../../server/resources/dining/venue_info.json'

const venueData = venueDataJSON as TVenueData

const Content = s.div`
  width: 100%;
  position: relative;
  overflow-x: visible;
  padding-right: 0.5rem;
`

const getOpenHours = (venueHours: IDaypart[]) => {
  if (!venueHours) return null

  // get the array of hours that are opened today
  const date = new Date()
  const currTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  const openHours = venueHours.filter(hour => {
    return hour.starttime <= currTime && currTime <= hour.endtime
  })
  return openHours
}

type TVenueHours = Record<string, IVenueHour[]>

const CardSubtext = ({ venueId, venueHours }: { venueId: string, venueHours: IDaypart[] }) => {
  const showMealLabels = venueData[Number(venueId)].isRetail
    ? venueData[Number(venueId)].showMealLabels || false
    : true

  const openHours = getOpenHours(venueHours)

  if (openHours === null || openHours === undefined) {
    // TODO ghost loader?
    return (
      <>
        <Circle open={false} />
        <Subtext marginBottom="0" loading>
          Loading...
        </Subtext>
      </>
    )
  }

  if (openHours.length === 0) {
    return (
      <>
        <Subtext marginBottom="0">Closed</Subtext>
        <Circle open={false} />
      </>
    )
  }

  return (
    <>
      <Subtext marginBottom="0">
        {openHours.map(({ starttime, endtime, label }, index) => (
          <span key={`${starttime}-${endtime}-${label}`}>
            {`${convertDate(starttime)} - ${convertDate(endtime)}${
              showMealLabels ? ` • ${label}` : ''
            }`}
            {index === openHours.length - 1 ? null : <br />}
          </span>
        ))}
      </Subtext>
      <Circle open />
    </>
  )
}

const parseVenueHours = (venueId: string, venueHours: TVenueHours) => {
  if (!venueHours) return []

  let currDate = moment().format()
  currDate = currDate.substring(0, currDate.indexOf('T'))
  let venueHour = venueHours[venueId]
  venueHour = venueHour.filter(hour => hour.date === currDate)

  return venueHour[0].dayparts
}

interface IDiningCardProps {
  venueId: string
  selected: boolean
  isFavorited: boolean
  venueHours: TVenueHours
  showLine?: boolean
  style?: {}
}

const DiningCard = ({
  venueId,
  selected,
  isFavorited,
  venueHours,
  showLine,
  style,
}: IDiningCardProps) => {
  const parsedVenueHours = parseVenueHours(venueId, venueHours)
  const { name, image } = venueData[venueId]

  // Images are served through the public folder
  const img = `/img/venue_images/${image}`

  if (isFavorited) {
    return null
  }

  return (
    <Link href={`/dining?id=${venueId}`} as={`/dining/${venueId}`}>
      <StyledLink>
        <Card
          padding="0.5rem 1rem"
          hoverable
          key={venueId}
          selected={selected}
          style={style}
        >
          <FlexRow>
            {image && (
              <Col backgroundImage={img} width="30%" borderRadius="4px" />
            )}
            <Col padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}>
              <Content>
                <Subtitle marginBottom="0">{name}</Subtitle>
                <CardSubtext venueId={venueId} venueHours={parsedVenueHours} />
              </Content>
            </Col>
          </FlexRow>
        </Card>
        {showLine && <Line />}
      </StyledLink>
    </Link>
  )
}

export default DiningCard
