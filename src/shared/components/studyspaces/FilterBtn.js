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

      :hover,
      :focus {
        background: ${DARK_BLUE} !important;
      }
    `)
  )}
`;

const FilterBtnSpan = s.span`
  background: ${WHITE};

  ${({ active }) => active && (`
    background: ${BLUE} !important;
    border-color: rgba(0, 0, 0, 0.1);
    color: white;

    :hover,
    :focus {
      background: ${DARK_BLUE} !important;
    }
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
      activeOptions,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOption = this.handleClickOption.bind(this);
  }

  handleClick() {
    // NOTE this hopefully won't be needed down the line
    const { active } = this.state;

    this.setState({
      active: !active,
    });
  }

  handleClickOption(option) {
    if (!option) return;

    const { activeOptions } = this.state;
    activeOptions[option] = !activeOptions[option];
    this.setState({ activeOptions });
  }

  render() {
    const {
      text,
      options,
      onClick,
      onClickOption,
      active,
    } = this.props;
    const { activeOptions } = this.state;
    const areOptions = options && options.length;
    const isActive = active || this.state.active; /* eslint-disable-line */

    return (
      <FilterBtnWrapper
        active={isActive}
        options={areOptions}
      >
        <FirstFilterBtnSpan
          onClick={() => {
            this.handleClick();
            onClick();
          }}
          active={isActive}
          options={areOptions}
        >
          {text}
        </FirstFilterBtnSpan>

        {isActive && options && options.length && (
          options.map((option, idx) => (
            <FilterBtnSpan
              onClick={() => {
                this.handleClickOption(option);
                onClickOption(idx);
              }}
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
  onClick: () => {},
  onClickOption: () => {},
  active: false,
};

FilterBtn.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onClickOption: PropTypes.func,
  active: PropTypes.bool,
};

export default FilterBtn;
