import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import axios from 'axios'

import { maxWidth, PHONE } from '../../styles/sizes'
import {
  BorderedCard,
  ImageZoom,
  Col,
  Text,
  Row,
  Title,
  Subtext,
} from '../shared'
import { logEvent } from '../../analytics/index'

const NewsContent = s.div`
  margin-left: 1rem;

  ${maxWidth(PHONE)} {
    margin-left: 0;
  }
`

const News = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const website = 'https://www.thedp.com/'
    const className = 'col-lg-6 col-md-5 col-sm-12 frontpage-carousel'
    axios
      .get('/api/news', {
        params: {
          cancelToken: source.token,
          website,
          className,
        },
      })
      .then(res => {
        setData(res.data)
      })
    return () => {
      source.cancel()
    }
  }, [])

  if (!data) {
    return null
  }

  const { picture, link, title, content, time } = data

  return (
    <BorderedCard>
      <Title>Latest News</Title>
      <Subtext>
        More from&nbsp;
        <i>
          <a
            href="https://www.thedp.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logEvent('external links', 'the dp')}
          >
            The Daily Pennsylvanian
          </a>
        </i>
      </Subtext>
      <Row>
        <Col sm={12} md={6} lg={7}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logEvent('external links', 'the dp headline')}
          >
            <ImageZoom src={picture} alt="First" />
          </a>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <NewsContent>
            <Title>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logEvent('external links', 'the dp headline')}
              >
                {title}
              </a>
            </Title>
            <Text>{content}</Text>
            <Subtext>{time}</Subtext>
          </NewsContent>
        </Col>
      </Row>
    </BorderedCard>
  )
}

export default News
