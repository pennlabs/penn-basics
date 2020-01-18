import React from 'react'
import { useRouter } from 'next/router'

import App from '../src/frontend/components/profile/App'
import Header from '../src/frontend/components/header/index'

const Profile = () => (
  <Header>
    <App />
  </Header>
)

export default Profile
