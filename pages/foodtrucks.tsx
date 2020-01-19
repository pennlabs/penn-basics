import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import App from '../src/frontend/components/foodtrucks/App'
import Header from '../src/frontend/components/header/index'

const Foodtrucks = () => {
  const router = useRouter()
  const { id } = router.query
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  return (
    <Header>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        />
      </Head>
      <App id={id} />
    </Header>
  )
}

export default Foodtrucks
