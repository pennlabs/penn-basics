import React from 'react';
import LinkItem from './LinkItem';

const Links = () => (
  <ul>
    <LinkItem url="/dining" name="Dining" />
    <LinkItem url="/laundry" name="Laundry" />
    <LinkItem url="/studyspaces" name="Studyspaces" />
  </ul>
);

export default Links;
