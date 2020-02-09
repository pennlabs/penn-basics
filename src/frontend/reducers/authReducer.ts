import { getUserInfoFulfilled } from '../actions/action_types'
import { Action } from 'redux'
import { IUserInfo } from '../types'

interface IAuthReducerState {
  userInfo?: IUserInfo
}

type IAuthAction = {
  userInfo: IUserInfo
} & Action

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
