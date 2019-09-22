import React from 'react'
import s from 'styled-components'

const DownloadImage = s.img`
margin-bottom: 1.5rem;
width: 100%;
max-width: 14rem;
`

const App = () => (
  <div className="section">
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <img
          className="logo"
          src="https://i.imgur.com/JhifMZc.png"
          alt="Penn Basics Logo"
          style={{ width: '6rem', maxWidth: '50%', marginBottom: '2rem' }}
        />
      </div>

      <h3 className="title is-3" style={{ textAlign: 'center' }}>
        Penn Basics is made for desktop
      </h3>

      <p
        style={{ fontSize: '150%', marginBottom: '4rem', textAlign: 'center' }}
      >
        Since you&apos;re on a mobile device, get your information from our Penn
        Mobile app!
      </p>

      <div style={{ textAlign: 'center' }}>
        <a href="https://itunes.apple.com/us/app/penn-mobile/id944829399?mt=8">
          <DownloadImage
            src="https://s3.amazonaws.com/riploventures/app-store.svg"
            alt="Get it on the App Store"
          />
        </a>

        <div style={{ width: '1rem' }} />

        <a href="https://play.google.com/store/apps/details?id=com.pennapps.labs.pennmobile&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
          <DownloadImage
            alt="Get it on Google Play"
            src="https://s3.amazonaws.com/riploventures/google-play.png"
          />
        </a>
      </div>
    </div>
  </div>
)

export default App
