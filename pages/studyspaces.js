import React from 'react'
import { useRouter } from 'next/router'

import App from '../src/frontend/components/studyspaces/App'
import Header from '../src/frontend/components/header/index'

const Laundry = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Header>
      <App id={id} />
    </Header>
  )
}

export default Laundry
