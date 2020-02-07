import { getUserInfoFulfilled } from '../actions/action_types'

const defaultState = { userInfo: null }

const authReducer = (state = defaultState, action) => {
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
