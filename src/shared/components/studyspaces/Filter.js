import React, { Component } from 'react';
import s from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FilterBtn from './FilterBtn';
import { WHITE, ALLBIRDS_GRAY } from '../../styles/colors';
import {
  filterSpacesOpen,
  filterSpacesOutlets,
  filterSpacesNoise,
  filterSpacesGroups,
} from '../../actions/spaces_actions';

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
    const { filterOpen } = this.props;

    filterSpacesOpenDispatch(!filterOpen);
  }

  handleClickOutlets(num) {
    const { filterSpacesOutletsDispatch } = this.props;
    filterSpacesOutletsDispatch(num);
  }

  handleClickNoiseLevel(num) {
    const { filterSpacesNoiseDispatch } = this.props;
    filterSpacesNoiseDispatch(num);
  }

  handleClickGroups(num) {
    const { filterSpacesGroupsDispatch } = this.props;
    filterSpacesGroupsDispatch(num);
  }

  render() {
    const { filterOpen } = this.props;

    return (
      <FilterWrapper>
        <FilterBtn
          text="Open"
          onClick={this.handleClickOpen}
          active={filterOpen}
        />

        <FilterBtn
          text="Outlets"
          onClickOption={this.handleClickOutlets}
          options={['None', 'Few', 'Many']}
        />

        <FilterBtn
          text="Noise level"
          onClickOption={this.handleClickNoiseLevel}
          options={['Talkative', 'Quiet', 'Silent']}
        />

        <FilterBtn
          text="Groups"
          onClickOption={this.handleClickGroups}
          options={['None', 'Small', 'Large']}
        />
      </FilterWrapper>
    );
  }
}

Filter.defaultProps = {
  filterOpen: false,
};

Filter.propTypes = {
  filterSpacesOpenDispatch: PropTypes.func.isRequired,
  filterSpacesOutletsDispatch: PropTypes.func.isRequired,
  filterSpacesNoiseDispatch: PropTypes.func.isRequired,
  filterSpacesGroupsDispatch: PropTypes.func.isRequired,
  filterOpen: PropTypes.bool,
};

const mapStateToProps = ({ spaces }) => spaces;

const mapDispatchToProps = dispatch => ({
  filterSpacesOpenDispatch: filter => dispatch(filterSpacesOpen(filter)),
  filterSpacesOutletsDispatch: filters => dispatch(filterSpacesOutlets(filters)),
  filterSpacesNoiseDispatch: filters => dispatch(filterSpacesNoise(filters)),
  filterSpacesGroupsDispatch: filters => dispatch(filterSpacesGroups(filters)),
});

// Redux config
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
