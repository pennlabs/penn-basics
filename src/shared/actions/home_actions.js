import {
    filterHomeCustomizeRequested,
    TOGGLE_FILTER_HOME_CUSTOMIZE
} from './action_types';

export const filterHomeCustomize = (filter) => {
    return (dispatch) => {
        console.log("---filter action triggered---");
        console.log(filter);
        dispatch({
            type: filterHomeCustomizeRequested,
            filter
        })
    }
}

export const toggleHomeCustomize = () => (
    dispatch => dispatch({ type: TOGGLE_FILTER_HOME_CUSTOMIZE })
  );