import React from 'react';
import s from 'styled-components';

import FilterBtn from './FilterBtn';
import { WHITE, ALLBIRDS_GRAY } from '../../styles/colors';

const FilterWrapper = s.div`
  width: 100%;
  background: ${WHITE};
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  padding: 1rem;
`;

export default () => (
  <FilterWrapper>
    <FilterBtn text="Open" />
    <FilterBtn text="Outlets" options={['None', 'Few', 'Many']} />
    <FilterBtn text="Noise level" options={['todo', 'todo']} />
    <FilterBtn text="Groups" options={['todo', 'todo']} />
  </FilterWrapper>
);
