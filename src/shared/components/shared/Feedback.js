import React from 'react'
import s from 'styled-components'

import { WHITE, BLUE, DARK_BLUE } from '../../styles/colors'

const DIAMETER = '3rem'
const OFFSET = '18px'
const AIRTABLE_LINK = 'https://airtable.com/shrE9ZdgiSY0DfDxV'

const FeedbackLink = s.a`
  display: inline-block;
  width: ${DIAMETER};
  height: ${DIAMETER};
  border-radius: 3rem;
  background-color: ${BLUE};
  position: fixed;
  bottom: ${OFFSET};
  right: ${OFFSET};
  text-align: center;
  box-shadow: 0 2px 8px rgba(25, 89, 130, .4);
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${DARK_BLUE};
  }
`

const Icon = s.i`
  fontSize: 24px;
  color: ${WHITE};
  line-height: ${DIAMETER};
`

export default () => (
  <FeedbackLink
    href={AIRTABLE_LINK}
    title="Feedback"
    target="_blank"
    onClick={() => logEvent('feedback', 'clicked')}
  >
    <Icon className="fa-comment far fa-lg" />
  </FeedbackLink>
)
