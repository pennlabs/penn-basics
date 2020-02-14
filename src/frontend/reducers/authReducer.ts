import { Action } from 'redux'
import { getUserInfoFulfilled } from '../actions/action_types'
import { IUserInfo } from '../types'

type IAuthAction = {
  userInfo?: IUserInfo
} & Action

interface IAuthReducerState {
  userInfo?: IUserInfo
}

const defaultState: IAuthReducerState = { userInfo: undefined }

const authReducer = (
  state = defaultState,
  action: IAuthAction
): IAuthReducerState => {
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
