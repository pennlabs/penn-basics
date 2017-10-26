import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return(
    <div>
      <h1 className="is-size-3 medium-gray-text">404: Content not found</h1>
      <p>
        It seems like the content you are looking for was either moved or does not exist.
      </p>
      <Link to="/" className="btn marg-top-1">
        Back to home
      </Link>
    </div>
  );
}
