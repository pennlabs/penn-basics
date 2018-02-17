import React, {Component} from 'react';

export default ({space, closeModal}) => {
  // expected props: Name, Volume, Business, Outlets
  return (
    <div>
      {
        space &&
        <div className={"modal is-active"}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{space.name}</p>
              <button className="delete" aria-label="close" onClick={() => closeModal()}></button>
            </header>
            <section className="modal-card-body">
              <p>Quiet af? {space.quiet}</p>
              <p>Outlets af? {space.outlets}</p>
              <p>Open af? {space.open ? 'Open af' : 'Closed af'} </p>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>
      }
    </div>
  )
}
