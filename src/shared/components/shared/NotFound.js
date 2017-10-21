import React, { Component } from 'react';

export default function NotFound() {
  return(
    <div>
      <h1 className="is-size-3 medium-gray-text">404: Content not found</h1>
      <p>
        It seems like the content you are looking for was either moved or does not exist.
      </p>
      <a href="/" className="btn marg-top-1">Back to home</a>
    </div>
  );
}
