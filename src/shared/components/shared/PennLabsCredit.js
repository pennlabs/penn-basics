import React from 'react'

import { Col } from './Flex'
import { Subtext } from './Typography'

export default () => (
  <Col padding="0 1rem">
    <Subtext paddingTop="0.5rem" marginBottom="0">
      Made with &hearts; by&nbsp;
      <a href="https://pennlabs.org" target="_BLANK" rel="noopener noreferrer">
        Penn Labs.
      </a>
    </Subtext>
  </Col>
)
