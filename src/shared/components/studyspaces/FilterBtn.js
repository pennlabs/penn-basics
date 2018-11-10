import React, { Component } from 'react';
import s from 'styled-components';
import PropTypes from 'prop-types';

import { WHITE, ALLBIRDS_GRAY, BLUE } from '../../styles/colors';

const FilterBtnWrapper = s.span`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${ALLBIRDS_GRAY};
  border-radius: 4px;
  margin-right: 1rem;
  cursor: pointer;
  background: ${({ active }) => (active ? BLUE : WHITE)};

  ${({ active }) => active && (`
    color: white;
  `)}

  :hover {
    background: ${({ active }) => (active ? BLUE : ALLBIRDS_GRAY)};
  }
`;

class FilterBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render() {
    const { text } = this.props;
    const { active } = this.state;

    return (
      <FilterBtnWrapper onClick={this.handleClick} active={active}>
        { text }
      </FilterBtnWrapper>
    );
  }
}

FilterBtn.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FilterBtn;
