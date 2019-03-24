// Import frameworks
import React from 'react';
import Nav from './Nav';

export default () => (
  <Nav>
    <div className="columns is-vcentered is-centered" style={{ height: 'calc(100% - 57px' }}>
      <div className="column is-7">
        <img src="/img/dining.png" alt="Dining plate" />
        <p style={{ opacity: 0.5, fontSize: '150%', textAlign: 'center' }}>
          Select a dining hall to see information
        </p>
      </div>
    </div>
  </Nav>
);
