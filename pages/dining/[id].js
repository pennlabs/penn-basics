import React from 'react'
import { useRouter } from 'next/router'

// import App from '../../components/dining/App'

const Dining = () => {
  const router = useRouter()
  const { id } = router.query

  // return <App id={id} />
  return <h1> hello </h1>
}

export default Dining
