import axios from 'axios'
import { Dispatch, Action } from 'redux'

import { getUserInfoFulfilled } from './action_types'

export const getUserInfo = () => (dispatch: Dispatch<Action>) => {
    axios.get('/api/auth/getUserInfo').then(res => {
      console.log(res.data)
      dispatch({ type: getUserInfoFulfilled, userInfo: res.data })
    })
  }
