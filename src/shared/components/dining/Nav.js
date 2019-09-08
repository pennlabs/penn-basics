import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Card, Scrollbar, Line, NavSectionHeader } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import DiningCard from './DiningCard'
import { WHITE, BABY_BLUE } from '../../styles/colors'
import { NAV_HEIGHT } from '../../styles/sizes'

import venueData from '../../../server/database/venue_info.json'

const Nav = ({ children }) => {
  const keys = Object.keys(venueData)
  const diningKeys = []
  const retailKeys = []
  keys.forEach(key => {
    const data = venueData[key]
    if (data.isRetail) {
      retailKeys.push(key)
    } else {
      diningKeys.push(key)
    }
  })

  diningKeys.sort((keyA, keyB) => {
    const { name: nameA } = venueData[keyA]
    const { name: nameB } = venueData[keyB]
    return nameA.localeCompare(nameB)
  })

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
            <DiningCard
              key={`${key}-${name}`}
              venueId={key}
              name={name}
              image={image}
              showMealLabels
            />
          )
        })}

        <Card background={BABY_BLUE} padding="0">
          <NavSectionHeader className="title is-5">Retail</NavSectionHeader>
          <Line />
        </Card>

        {retailKeys.map(key => {
          const { name, image, showMealLabels } = venueData[key]
          return (
            <DiningCard
              key={key}
              venueId={key}
              name={name}
              image={image}
              showMealLabels={showMealLabels || false}
            />
          )
        })}

        <PennLabsCredit />
      </Scrollbar>
      <Col
        width="70%"
        overflowY="scroll"
        maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
      >
        {children}
      </Col>
    </Row>
  )
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Nav
