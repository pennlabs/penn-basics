import React, { Component } from 'react';
import s from 'styled-components';
import PropTypes from 'prop-types';

import {
  WHITE,
  ALLBIRDS_GRAY,
  DARK_GRAY,
  BLUE,
  DARK_BLUE,
  BORDER,
  SNOW_ALPHA,
  MEDIUM_GRAY,
} from '../../../styles/colors';

/* background: ${({ active }) => (active ? BLUE : WHITE)}; */

const FilterBtnWrapper = s.div`
  margin-right: 1rem;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 4px;

  padding: 0.5rem 0.75rem;
  border-color: ${BORDER};
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;

  :hover {
    background: ${ALLBIRDS_GRAY};
  }

  ${({ active }) => active && (`
    background: ${BLUE} !important;
    color: white;

    :hover,
    :focus {
      background: ${DARK_BLUE} !important;
    }
  `)}
`;

const noop = e => e.stopPropagation();

// const FirstFilterBtnSpan = s.span`
//   ${({ options }) => !options && (`
//     border-radius: 4px !important;
//   `)}
//
//   ${({ active, options }) => active && (
//     options ? (`
//       border-radius: 4px 0px 0px 4px !important;
//     `) : (`
//
//     `)
//   )}
// `;

// const FilterBtnSpan = s.span`
//   background: ${WHITE};
//
//   ${({ active }) => active && (`
//     background: ${BLUE} !important;
//     border-color: rgba(0, 0, 0, 0.1);
//     color: white;
//
//     :hover,
//     :focus {
//       background: ${DARK_BLUE} !important;
//     }
//   `)}
// `;

// TODO animate this

const OptionsModalBacking = s.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${SNOW_ALPHA};
  z-index: 1299;
`;

const OptionsModalWrapper = s.div`
  position: absolute;
  z-index: 1300;
  background: ${WHITE};
  border-radius: 4px;
  transform: translate(-0.75rem, calc(1rem + 1px));
  padding: 1rem calc(1rem + 0.125%);
  border: 1px solid ${BORDER};
  cursor: default;
  box-shadow: 0 0 8px ${BORDER};

  div {
    margin-bottom: 0.5rem;
    outline: 0 !important;

    color: ${MEDIUM_GRAY};

    :active,
    :focus,
    :hover {
      color: ${DARK_GRAY};
    }

    :last-child {
      margin-bottom: 0;
    }
  }
`;

const Circle = s.span`
  height: 1rem;
  width: 1rem;
  transform: translateY(0.1rem);
  border-radius: 50%;
  border: 2px solid ${BORDER};
  display: inline-block;
  margin-right: 0.5rem;

  ${({ active }) => active && `
    background: ${BLUE};
    border: 2px solid ${DARK_BLUE};
  `}
`;

const OptionText = s.span`
  ${({ active }) => active && `
    color: ${DARK_GRAY};
  `}
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
    this.areOptions = this.areOptions.bind(this);
  }

  areOptions() {
    const { options } = this.props;
    return Boolean(options && options.length);
  }

  handleClick() {
    if (!this.areOptions()) {
      return;
    }

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

  // TODO ACTIVE SHOULD BE IN PROPS ONLY

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
    let areActiveOptions = false;

    let btnText = text;

    if (areOptions) {
      const activeOptionsArr = options.filter(o => activeOptions[o]);

      if (activeOptionsArr && activeOptionsArr.length) {
        areActiveOptions = true;
        btnText = '';

        activeOptionsArr.forEach((o) => {
          btnText += `${o}, `;
        });

        btnText = btnText.substring(0, btnText.length - 2);
      }
    }

    return (
      <>
        <FilterBtnWrapper
          active={active || areActiveOptions}
          options={areOptions}
          onClick={() => {
            this.handleClick();
            onClick();
          }}
        >
          {btnText}
          {(areOptions && isActive) && (
            <>
              <OptionsModalBacking />
              <OptionsModalWrapper onClick={noop}>
                {options.map((o) => {
                  const isActiveOption = activeOptions[o];

                  return (
                    <div
                      key={o}
                      onClick={() => { /* eslint-disable-line */
                        this.handleClickOption(o);
                        onClickOption(o);
                      }}
                      role="option"
                      tabIndex={-1}
                      aria-selected={isActiveOption}
                      onKeyPress={() => /* todo */ {}}
                    >
                      <Circle active={isActiveOption} />
                      <OptionText active={isActiveOption}>{o}</OptionText>
                    </div>
                  );
                })}
              </OptionsModalWrapper>
            </>
          )}
        </FilterBtnWrapper>
      </>
    );
  }
}

// <FirstFilterBtnSpan
//   onClick={() => {
//     this.handleClick();
//     onClick();
//   }}
//   active={isActive}
//   options={areOptions}
// >
//   {text}
// </FirstFilterBtnSpan>

// {isActive && options && options.length && (
//   options.map((option, idx) => (
//     <FilterBtnSpan
//       onClick={() => {
//         this.handleClickOption(option);
//         onClickOption(idx);
//       }}
//       key={option}
//       active={activeOptions[option]}
//     >
//       {option}
//     </FilterBtnSpan>
//   ))
// )}

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
