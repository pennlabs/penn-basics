import React from 'react'
import { useRouter } from 'next/router'

import App from '../src/frontend/components/foodtrucks/App'
import Header from '../src/frontend/components/header/index'

const Foodtrucks = () => {
  const router = useRouter()
  const { id } = router.query
  const { GOOGLE_MAPS_API_KEY } = process.env

  return (
    <Header GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}>
      <App id={id as string} />
    </Header>
  )
}

export default Foodtrucks
