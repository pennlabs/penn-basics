// this is a custom component that we use instead of the `Link` component from
// react-router.  The reason we use this component is we want to update our redux
// store with our current link each time we click a `Link`

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateLink } from '../../actions/action_types';

class WrappedLink extends Component { // eslint-disable-line
  render() {
    const {
      updateReduxWithPath,
      to,
      ...props
    } = this.props;

    return (
      <Link
        onClick={() => { updateReduxWithPath(to); }}
        {...props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateReduxWithPath: (to) => {
    dispatch({
      type: updateLink,
      payload: to,
    });
  },
});

WrappedLink.propTypes = {
  to: PropTypes.any, // eslint-disable-line
  updateReduxWithPath: PropTypes.func.isRequired,
};

export default connect(() => ({}), mapDispatchToProps)(WrappedLink);
