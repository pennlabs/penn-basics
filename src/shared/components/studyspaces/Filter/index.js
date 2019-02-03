import React, { Component } from 'react';
import s from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// TODO decouple index of option and value in database

import FilterBtn from './FilterBtn';
import { WHITE, ALLBIRDS_GRAY } from '../../../styles/colors';
import {
  filterSpacesOpen,
  filterSpacesOutlets,
  filterSpacesNoise,
  filterSpacesGroups,
} from '../../../actions/spaces_actions';

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
    this.handleClickOutlets = this.handleClickOutlets.bind(this);
    this.handleClickNoiseLevel = this.handleClickNoiseLevel.bind(this);
    this.handleClickGroups = this.handleClickGroups.bind(this);
  }

  /**
   * Handle when the user clicks to filter by if a study space is open or not
   * NOTE there is no parameter as this is a binary filter: either show all
   * studyspaces or only show spaces which are open
   */
  handleClickOpen() {
    const { filterSpacesOpenDispatch } = this.props;
    const { filterOpen } = this.props;

    filterSpacesOpenDispatch(!filterOpen);
  }

  /**
   * Handle when the user clicks to filter by outlets level
   *
   * @param num: index in the array of options
   */
  handleClickOutlets(num) {
    const { filterSpacesOutletsDispatch } = this.props;
    filterSpacesOutletsDispatch(num);
  }

  /**
   * Handle when the user clicks to filter by noise level
   *
   * @param num: index in the array of options
   */
  handleClickNoiseLevel(num) {
    const { filterSpacesNoiseDispatch } = this.props;
    filterSpacesNoiseDispatch(num);
  }

  /**
   * Handle when the user clicks to filter by group size
   *
   * @param num: index in the array of options
   */
  handleClickGroups(num) {
    const { filterSpacesGroupsDispatch } = this.props;
    filterSpacesGroupsDispatch(num);
  }

  render() {
    const { filterOpen } = this.props;

    // TODO OTHER ACTIVE PROPS?

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
          options={['No outlets', 'Few outlets', 'Many outlets']}
        />

        <FilterBtn
          text="Noise level"
          onClickOption={this.handleClickNoiseLevel}
          options={['Talkative', 'Quiet', 'Silent']}
        />

        <FilterBtn
          text="Groups"
          onClickOption={this.handleClickGroups}
          options={['No groups', 'Good for small groups', 'Good for large groups']}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
