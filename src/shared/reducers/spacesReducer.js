import SpacesActions from '../actions/spaces_types'

const spacesReducer = (state = {pending: true}, action) => {
  switch(action.type){
      case SpacesActions.getSpacesDataRequested:
          return {
              pending: true,
          }
      case SpacesActions.getSpacesDataRejected:
          return {
              pending: false,
              error: action.error,
          }
      case SpacesActions.getSpacesDataFulfilled:
          return {
              pending: false,
              spacesData: action.spacesData.spaces,
          }
      default:
          return {
              pending: true
          }
  }
}
export default spacesReducer
