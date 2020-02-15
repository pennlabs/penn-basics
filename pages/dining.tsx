import React from 'react'
import { useRouter } from 'next/router'

import App from '../src/frontend/components/dining/App'
import Header from '../src/frontend/components/header/index'

const Dining = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Header>
      <App id={id as string} />
    </Header>
  )
}

export default Dining
