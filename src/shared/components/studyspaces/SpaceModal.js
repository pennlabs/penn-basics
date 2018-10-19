import React from 'react';
import PropTypes from 'prop-types';

const SpaceModal = ({ space, closeModal }) => {
  if (!space) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {space.name}
          </p>

          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={() => closeModal()}
          />
        </header>

        <section className="modal-card-body">
          <p>
            Quiet af?
            {space.quiet}
          </p>

          <p>
            Outlets af?
            {space.outlets}
          </p>

          <p>
            Open af?
            {space.open ? 'Open af' : 'Closed af'}
            &nbsp;
          </p>
        </section>

        <footer className="modal-card-foot" />
      </div>
    </div>
  );
};

// TODO give shape to the object

SpaceModal.defaultProps = {
  space: null,
  closeModal: () => {},
};

SpaceModal.propTypes = {
  space: PropTypes.object, // eslint-disable-line
  closeModal: PropTypes.func,
};

export default SpaceModal;
