import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import App from '../src/frontend/components/studyspaces/App'
import Header from '../src/frontend/components/header/index'
import { GOOGLE_MAPS_API_ROUTE } from '../src/frontend/constants/routes'

const Studyspaces = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Header>
      <Head>
        <script src={GOOGLE_MAPS_API_ROUTE} />
      </Head>
      <App id={id} />
    </Header>
  )
}

export default Studyspaces
