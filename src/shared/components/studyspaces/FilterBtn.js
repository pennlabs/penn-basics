import React, { Component } from 'react';
import s from 'styled-components';
import PropTypes from 'prop-types';

import {
  WHITE,
  ALLBIRDS_GRAY,
  BLUE,
  DARK_BLUE,
} from '../../styles/colors';

/* background: ${({ active }) => (active ? BLUE : WHITE)}; */

const FilterBtnWrapper = s.div`
  margin-right: 1rem;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 4px;

  span {
    box-sizing: border-box;
    display: inline-block;
    padding: 0.5rem 0.75rem;
    border-color: rgba(0, 0, 0, 0.1);
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;

    :hover {
      background: ${ALLBIRDS_GRAY};
    }
  }

  ${({ active }) => active && (`
    span {
      border-radius: 0px;
      border-color: rgba(0, 0, 0, 0.1);
      border-right: 0;

      &:last-child {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0px 4px 4px 0px;
      }
    }
  `)}
`;

const FirstFilterBtnSpan = s.span`
  ${({ options }) => !options && (`
    border-radius: 4px !important;
  `)}

  ${({ active, options }) => active && (
    options ? (`
      border-radius: 4px 0px 0px 4px !important;
    `) : (`
      background: ${BLUE} !important;
      color: white;
    `)
  )}
`;

const FilterBtnSpan = s.span`
  background: ${WHITE};

  ${({ active }) => active && (`
    background: ${BLUE} !important;
    border-color: rgba(0, 0, 0, 0.1);
    color: white;
  `)}
`;

class FilterBtn extends Component {
  constructor(props) {
    super(props);

    const { options } = this.props;
    let activeOptions = null;
    if (options && options.length) {
      activeOptions = {};
      options.forEach(option => { // eslint-disable-line
        activeOptions[option] = false;
      });
    }

    this.state = {
      active: false,
      activeOptions,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOption = this.handleClickOption.bind(this);
  }

  handleClick() {
    const { active } = this.state;

    this.setState({
      active: !active,
    }, () => {
      // active = this.state.active; // eslint-disable-line
      // if (!active) return;
      //
      // const { options } = this.props;
      // if (!options || !options.length) return;

      // if (this.state.active) { // eslint-disable-line
      //
      //
      //   if (!options) return;
      //
      //
      // }
    });
  }

  handleClickOption(option) {
    if (!option) return;

    const { activeOptions } = this.state;
    activeOptions[option] = !activeOptions[option];
    this.setState({ activeOptions });
  }

  render() {
    const { text, options } = this.props;
    const { active, activeOptions } = this.state;
    const areOptions = options && options.length;

    return (
      <FilterBtnWrapper
        active={active}
        options={areOptions}
      >
        <FirstFilterBtnSpan
          onClick={this.handleClick}
          active={active}
          options={areOptions}
        >
          {text}
        </FirstFilterBtnSpan>

        {active && options && options.length && (
          options.map(option => (
            <FilterBtnSpan
              onClick={() => this.handleClickOption(option)}
              key={option}
              active={activeOptions[option]}
            >
              {option}
            </FilterBtnSpan>
          ))
        )}
      </FilterBtnWrapper>
    );
  }
}

FilterBtn.defaultProps = {
  options: null,
};

FilterBtn.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default FilterBtn;
