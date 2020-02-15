// Authentication Interfaces
export interface IUser {
  pennid: number
  email: string
  first_name: string
  last_name: string
  displayName: string
  loggedIn: boolean
  fullName: string
}

export interface IAuthReducerState {
  userInfo: IUser
}


export type DoneCallback = (err: any, id?: unknown) => void