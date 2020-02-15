import { Action } from 'redux'
import { IUser, IAuthReducerState } from '../../types/authentication'
import { getUserInfoFulfilled } from '../actions/action_types'

type IAuthAction = {
  userInfo?: IUser
} & Action

const defaultState: IAuthReducerState = {
  userInfo: {
    pennid: -1,
    email: '',
    first_name: '',
    last_name: '',
    displayName: '',
    loggedIn: false,
    fullName: ''
  }
}

const authReducer = (
  state = defaultState,
  action: IAuthAction
) => {
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
