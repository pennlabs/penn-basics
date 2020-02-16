import React from 'react'
import { useRouter } from 'next/router'

import App from '../src/frontend/components/studyspaces/App'
import Header from '../src/frontend/components/header/index'

const Studyspaces = () => {
  const router = useRouter()
  const { id } = router.query
  const { GOOGLE_MAPS_API_KEY } = process.env

  return (
    <Header GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}>
      <App id={id as string} />
    </Header>
  )
}

export default Studyspaces
