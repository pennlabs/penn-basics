import React, { Component } from 'react'
import { BorderedCard } from '../shared'

class ExternalLinks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const postid = '10158665909863776'
    const link = `https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FUnivPennsylvania%2Fposts%2F${postid}&width=500&show_text=true&height=587&appId`
    return (
      <BorderedCard>
        <h1 className="title is-4">More in the Penn Ecosystem</h1>
        <br />
        <h2 className="subtitle is-6">
          Go to <a href="https://pennclubs.com">Penn Clubs</a> to explore
          communities to join!
        </h2>
        <br />
        <img
          src="https://raw.githubusercontent.com/pennlabs/clubs/master/static/img/peoplelogo.png"
          width="64"
          height="64"
        ></img>
        <br />
        <br />
        <iframe
          src={link}
          width="200"
          height="687"
          scrolling="yes"
          style={{ border: 'none' }}
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
        />
      </BorderedCard>
    )
  }
}

export default ExternalLinks
