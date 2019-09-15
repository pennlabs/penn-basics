import React, { Component } from 'react'
import axios from 'axios'
import { BorderedCard, ImageZoom, Col, ColSpace, Row } from '../shared'

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    const website = 'https://www.thedp.com/'
    const className = 'col-lg-6 col-md-5 col-sm-12 frontpage-carousel'
    axios
      .post('/api/news', {
        website,
        className,
      })
      .then(res => {
        this.setState({ data: res.data })
      })
  }

  renderNews() {
    const { picture, link, title, content, time } = this.state.data
    return (
      <Row>
        <Col width="70%">
          <a href={link}>
            <ImageZoom src={picture} alt="First" />
          </a>
        </Col>
        <ColSpace />
        <Col>
          <p className="is-size-6">
            <strong>
              <a href={link}>{title}</a>
            </strong>
            <br />
            <br />
            <small>{content}</small>
            <br />
            <br />
            <small> {time} </small>
          </p>
        </Col>
      </Row>
    )
  }

  render() {
    const { data } = this.state

    return (
      <BorderedCard>
        <h1 className="title is-4">Latest News</h1>
        <h6 className="subtitle is-6">
          &nbsp; More from &nbsp;
          <i>
            <a href="https://www.thedp.com/">The Daily Pennsylvanian</a>
          </i>
        </h6>
        {data && this.renderNews()}
      </BorderedCard>
    )
  }
}

export default News
