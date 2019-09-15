import React from 'react'
import { BorderedCard, Row, Col, ColSpace, Line } from '../shared'

const renderExternalLink = (pictureURL, websiteURL, productName) => {
  return (
    <BorderedCard>
      <Row>
        <Col width="20%">
          <a href={websiteURL} target="_blank" rel="noopener noreferrer">
            <img src={pictureURL} alt={productName} />
          </a>
        </Col>
        <ColSpace />
        <Col>
          <a href={websiteURL} target="_blank" rel="noopener noreferrer">
            {productName}
          </a>
        </Col>
      </Row>
    </BorderedCard>
  )
}

const renderUsefulLink = (websiteURL, description) => {
  return (
    <a href={websiteURL} target="_blank" rel="noopener noreferrer">
      {description}
    </a>
  )
}

const mapping = [
  {
    pictureURL:
      'https://raw.githubusercontent.com/pennlabs/clubs/master/static/img/peoplelogo.png',
    websiteURL: 'https://pennclubs.com/',
    productName: 'Penn Clubs',
  },
  {
    pictureURL:
      'https://raw.githubusercontent.com/pennlabs/pennlabs.org/master/static/img/PCR.png',
    websiteURL: 'https://penncoursereview.com/',
    productName: 'Penn Course Review',
  },
  // {
  //   "pictureURL": "https://raw.githubusercontent.com/pennlabs/pennlabs.org/master/static/img/PCA.png",
  //   "websiteURL": "https://penncoursealert.com/"
  // },
  // {
  //   "pictureURL": "https://raw.githubusercontent.com/pennlabs/pennlabs.org/master/static/img/PCS.png",
  //   "websiteURL": "https://penncoursesearch.com/"
  // }
]

const usefulLinks = [
  {
    websiteURL: 'https://pennlabs.org/',
    description: 'Penn Labs',
  },
  {
    websiteURL: 'https://www.upenn.edu/',
    description: 'Penn Homepage',
  },
  {
    websiteURL: 'https://prod.campusexpress.upenn.edu/',
    description: 'CampusExpress',
  },
  {
    websiteURL: 'https://canvas.upenn.edu',
    description: 'Canvas',
  },
  {
    PennInTouch: 'https://pennintouch.apps.upenn.edu/pennInTouch/jsp/fast2.do',
    description: 'PennInTouch',
  },
]

const ExternalLinks = () => (
  <BorderedCard>
    <h1 className="title is-4">More in the Penn Ecosystem</h1>
    {mapping.map(({ pictureURL, websiteURL, productName }) => {
      return renderExternalLink(pictureURL, websiteURL, productName)
    })}
    <Line />
    <br />
    {usefulLinks.map(({ websiteURL, description }, index) => {
      return (
        <>
          {renderUsefulLink(websiteURL, description)}
          {index === usefulLinks.length - 1 ? null : <br />}
        </>
      )
    })}
  </BorderedCard>
)

export default ExternalLinks
