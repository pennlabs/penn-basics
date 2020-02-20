import axios from 'axios'
import { Dispatch, Action } from 'redux'

import { getUserInfoFulfilled } from './action_types'

export const getUserInfo = () => (dispatch: Dispatch<Action>): void => {
    axios.get('/api/auth/getUserInfo').then(res => {
      dispatch({ type: getUserInfoFulfilled, userInfo: res.data })
    })
  }
