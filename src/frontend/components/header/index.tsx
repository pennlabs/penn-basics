import React from 'react'
import Head from 'next/head'
import s from 'styled-components'

import Nav from '../shared/Nav'
import Feedback from '../shared/Feedback'
import { BLUE, DARK_BLUE, SNOW } from '../../styles/colors'

const AppWrapper = s.div`
  a {
    color: ${BLUE};

    &:visited {
      color: ${BLUE};
    }

    &:hover,
    &:focus,
    &:active {
      color: ${DARK_BLUE};
    }
  }
`

const Header = ({ children }) => (
  <AppWrapper>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />

      <title>Penn Basics</title>

      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content="The one-stop spot for the basics of living at Penn. Penn Basics aggregates essential data on dining, laundry, studyspaces, and more."
      />
      <meta
        name="keywords"
        content="penn, basics, pennbasics, upenn, studyspaces, laundry, coffee, study, studyspots, dining, map, pennlabs, labs"
      />
      <meta name="author" content="Penn Labs <contact@pennlabs.org>" />

      <meta property="og:title" content="Penn Basics" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pennbasics.com" />
      <meta
        property="og:image"
        content="https://pennlabs-assets.s3.amazonaws.com/metadata-images/penn-basics.png"
      />
      <meta property="og:image:alt" content="Penn Basics logo" />

      <meta property="twitter:site" content="@pennlabs" />
      <meta
        property="twitter:description"
        content="The one-stop spot for the basics of living at Penn. Penn Basics aggregates essential data on dining, laundry, studyspaces, and more."
      />
      <meta property="twitter:title" content="Penn Basics" />
      <meta
        property="twitter:image"
        content="https://pennlabs-assets.s3.amazonaws.com/metadata-images/penn-basics.png"
      />
      <meta property="twitter:image:alt" content="Penn Basics logo" />
      <meta property="twitter:card" content="summary" />

      <title>Penn Basics</title>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.3/css/bulma.min.css"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="msapplication-TileColor" content="#5bbad5" />
    </Head>

    <Nav />
    <Feedback />
    <div id="wrapper" style={{ background: SNOW }}>
      <div id="app">{children}</div>
    </div>
  </AppWrapper>
)

export default Header
