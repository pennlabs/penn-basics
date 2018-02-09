import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const DiningVenuePreview = ({ name, id, image }) => (
  <Link to={"/dining/" + id} className="column">
    <div
      className="dining-venue-preview"
      style={{ backgroundImage: "url(" + image + ")" }}
    >
      <div className="gradient">
        <h2 className="is-size-3 has-text-weight-bold">{name}</h2>
      </div>
    </div>
  </Link>
)

export default DiningVenuePreview;
