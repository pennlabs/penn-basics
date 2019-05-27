import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from '../actions/action_types';

const defaultState = {
  filterCustomize: null,
  filterCustomizeActive: false,
};

const updateFilters = (arr, num) => {
  if (!arr || !arr.length) {
    return [num];
  }

  if (arr.includes(num)) {
    return arr.filter(item => item !== num);
  }

  arr.push(num);
  return arr;
};

const homeReducer = (state = defaultState, action) => {
  const { filter, type } = action;

  switch (type) {
    case filterHomeCustomizeRequested:
      return {
        ...state,
        filterCustomize: updateFilters(state.filterCustomize, filter)
      };
    
    case TOGGLE_FILTER_HOME_CUSTOMIZE:
      return {
        ...state,
        filterCustomizeActive: !state.filterCustomizeActive
      };
      
    default:
      return state;
  }
};

export default homeReducer;