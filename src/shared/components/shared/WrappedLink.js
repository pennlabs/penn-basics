// this is a custom component that we use instead of the `Link` component from
// react-router.  The reason we use this component is we want to update our redux
// store with our current link each time we click a `Link`

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateLink } from '../../actions/action_types';

class WrappedLink extends Component {
  // WrappedLink takes the same props as Link does
  static propTypes = {
    to: PropTypes.any,
    // from redux
    updateReduxWithPath: PropTypes.func
  }

  render() {
    const {updateReduxWithPath, ...props} = this.props;
    return (
      <Link
        onClick={() => { updateReduxWithPath(this.props.to); }}
        {...props}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateReduxWithPath: (to) => {
      dispatch({
        type: updateLink,
        payload: to
      });
    }
  };
};

export default connect(() => { return {}; }, mapDispatchToProps)(WrappedLink);
