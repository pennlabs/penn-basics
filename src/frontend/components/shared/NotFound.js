import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import s from 'styled-components'

import { Title, Text, StyledLink } from './Typography'
import { Button } from './Button'
import PennLabsCredit from './PennLabsCredit'
import { NAV_HEIGHT } from '../../styles/sizes'

const Wrapper = s.div`
  padding-top: calc(1rem + 2.5vh);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - ${NAV_HEIGHT});
`

const Image = s.img`
  max-width: 100%;
  width: 400px;
  margin-bottom: 2rem;
`

// TODO remove imgur jawn
const NotFound = ({
  message = 'It seems like the content you are looking for was either moved or does not exist.',
  title = '404: Content Not Found!',
  url = '/',
  urlText = 'Back to home',
}) => (
  <Wrapper>
    <Image src="https://i.imgur.com/PMJ4fDJ.png" alt="not found" />

    <Title>{title}</Title>

    <Text>{message}</Text>

    <Link href={url}>
      <StyledLink>
        <Button style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          {urlText}
        </Button>
      </StyledLink>
    </Link>

    <PennLabsCredit padding="0 0 1rem 0" />
  </Wrapper>
)

NotFound.defaultProps = {
  title: '404: Content not found',
  message:
    'It seems like the content you are looking for was either moved or does not exist.',
  urlText: 'Back to home',
  url: '/',
}

NotFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  url: PropTypes.string,
  urlText: PropTypes.string,
}

export default NotFound
