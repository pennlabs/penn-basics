import { createStore, applyMiddleware, compose, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { IDiningReducerState } from '../types/dining'
import { ISpacesReducerState } from '../types/studyspaces'
import { ILaundryReducerState } from '../types/laundry'
import { IHomeReducerState } from '../types/home'
import { IFoodTrucksReducerState } from '../types/foodtrucks'
import { IAuthReducerState } from '../types/authentication'
import rootReducer from '../frontend/reducers/index'

interface IRootReducerState {
  dining: IDiningReducerState
  spaces: ISpacesReducerState
  laundry: ILaundryReducerState
  home: IHomeReducerState
  foodtrucks: IFoodTrucksReducerState
  authentication: IAuthReducerState
}

export const initStore = (initialState = {}): Store<IRootReducerState> =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware))
  ) as Store<IRootReducerState>
