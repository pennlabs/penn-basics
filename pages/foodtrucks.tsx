import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import App from '../src/frontend/components/foodtrucks/App'
import Header from '../src/frontend/components/header/index'
import { GOOGLE_MAPS_API_ROUTE } from '../src/frontend/constants/routes'

const Foodtrucks = (): React.ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const { GOOGLE_MAPS_API_KEY } = process.env

  return (
    <Header>
      {(typeof google === 'undefined') && (
        <Head>
          <script src={GOOGLE_MAPS_API_ROUTE(`${GOOGLE_MAPS_API_KEY}`)} />
        </Head>
      )}
      <App id={id as string} />
    </Header>
  )
}

export default Foodtrucks
