import React, { Component } from 'react';

export default ({
  name, open, quiet, outlets, renderSpaceModal,
}) => (
  <div>
    <h1>{name}</h1>
    <p>{open ? 'Open Af' : 'Closed Af'}</p>
    <a onClick={() => renderSpaceModal()}>Render Space Info Modal</a>
  </div>
);
