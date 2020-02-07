import { getUserInfoFulfilled } from '../actions/action_types'
import { AnyAction } from 'redux'

const defaultState = { userInfo: null }

const authReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case getUserInfoFulfilled:
      return {
        ...state,
        userInfo: action.userInfo,
      }

    default:
      return state
  }
}

export default authReducer
