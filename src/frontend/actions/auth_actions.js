import axios from 'axios'

import { getUserInfoFulfilled } from './action_types'

export const getUserInfo = () => {
  return dispatch => {
    axios.get('/api/auth/getUserInfo').then(res => {
      console.log(res.data)
      dispatch({ type: getUserInfoFulfilled, userInfo: res.data })
    })
  }
}
