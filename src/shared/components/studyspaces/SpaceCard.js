import React from 'react';
import PropTypes from 'prop-types';

// TODO render other info?

const SpaceCard = ({
  name,
  open,
  renderSpaceModal,
}) => {
  const handleKeyPress = (event) => {
    if (event.keyCode === 32) {
      renderSpaceModal();
    }
  };

  return (
    <div>
      <h1>
        {name}
      </h1>
      <p>
        {open ? 'Open Af' : 'Closed Af'}
      </p>

      <button
        type="button"
        onClick={() => renderSpaceModal()}
        onKeyPress={handleKeyPress}
      >
        Render Space Info Modal
      </button>
    </div>
  );
};

SpaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  renderSpaceModal: PropTypes.func.isRequired,
};

export default SpaceCard;
