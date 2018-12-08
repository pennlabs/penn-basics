import React, { Component } from 'react';
import s from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FilterBtn from './FilterBtn';
import { WHITE, ALLBIRDS_GRAY } from '../../styles/colors';
import { filterSpacesOpen } from '../../actions/spaces_actions';

const FilterWrapper = s.div`
  width: 100%;
  background: ${WHITE};
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  padding: 0.5rem 1rem;
`;

class Filter extends Component {
  constructor(props) {
    super(props);

    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  handleClickOpen() {
    // TODO CONDITION ON STATE
    const { filterSpacesOpenDispatch } = this.props;
    filterSpacesOpenDispatch(true);
  }

  render() {
    return (
      <FilterWrapper>
        <FilterBtn text="Open" onClick={this.handleClickOpen} />
        <FilterBtn text="Outlets" options={['None', 'Few', 'Many']} />
        <FilterBtn text="Noise level" options={['todo1', 'todo2']} />
        <FilterBtn text="Groups" options={['todo1', 'todo2']} />
      </FilterWrapper>
    );
  }
}

Filter.propTypes = {
  filterSpacesOpenDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  filterSpacesOpenDispatch: venueId => dispatch(filterSpacesOpen(venueId)),
});

// Redux config
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
