import React from 'react'

import { Col } from './Flex'
import { Subtext } from './Typography'

const AIRTABLE_LINK = 'https://airtable.com/shrE9ZdgiSY0DfDxV'

export default () => (
  <Col padding="0 1rem">
    <Subtext paddingTop="0.5rem" marginBottom="0">
      Made with &hearts; by&nbsp;
      <a href="https://pennlabs.org" target="_BLANK" rel="noopener noreferrer">
        Penn Labs.
      </a>{' '}
      <a href={AIRTABLE_LINK} taget="_BLANK" rel="noopener noreferrer">
        Feedback.
      </a>
    </Subtext>
  </Col>
)
