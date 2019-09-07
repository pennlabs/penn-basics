import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Card, Scrollbar, Line, NavSectionHeader } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import DiningCard from './DiningCard'
import { WHITE, BABY_BLUE } from '../../styles/colors'
import { NAV_HEIGHT } from '../../styles/sizes'

import venueData from '../../../server/database/venue_info.json'

import { retailLocations } from './constants'

const Nav = ({ children }) => {
  const keys = Object.keys(venueData)
  const diningKeys = keys.filter(key => !retailLocations.includes(key))
  const retailKeys = keys.filter(key => retailLocations.includes(key))

  return (
    <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
      <Scrollbar
        padding="0 0 .5rem 0"
        background={WHITE}
        overflowY="scroll"
        width="30%"
        borderRight
        height={`calc(100vh - ${NAV_HEIGHT})`}
      >
        <Card background={BABY_BLUE} padding="0">
          <NavSectionHeader className="title is-5">Dining</NavSectionHeader>
          <Line />
        </Card>

        {diningKeys.map(key => {
          const { name, image } = venueData[key]
          return (
            <DiningCard key={key} venueId={key} name={name} image={image} />
          )
        })}

        <Card background={BABY_BLUE} padding="0">
          <NavSectionHeader className="title is-5">Retail</NavSectionHeader>
          <Line />
        </Card>

        {retailKeys.map(key => {
          const { name, image } = venueData[key]
          return (
            <DiningCard key={key} venueId={key} name={name} image={image} />
          )
        })}

        <PennLabsCredit />
      </Scrollbar>
      <Col width="70%" overflowY="scroll">
        {children}
      </Col>
    </Row>
  )
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Nav
