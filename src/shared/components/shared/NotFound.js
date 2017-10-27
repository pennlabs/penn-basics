import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default function NotFound(props) {
  return(
    <div>
      <h1 className="is-size-3 medium-gray-text">
        {
          props.title ? props.title : '404: Content not found'
        }
      </h1>
      <p>
        {
          props.message ? props.message : 'It seems like the content you are looking for was either moved or does not exist.'
        }
      </p>
      <Link to="/" className="btn marg-top-1">
        Back to home
      </Link>
    </div>
  );
}
