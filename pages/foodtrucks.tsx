import React from 'react'
import { useRouter } from 'next/router'

import App from '../src/frontend/components/foodtrucks/App'
import Header from '../src/frontend/components/header/index'

const Foodtrucks = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Header>
      <App id={id} />
    </Header>
  )
}

export default Foodtrucks
