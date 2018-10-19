import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Title,
  Text,
} from '../shared';

// TODO render other info
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
    <Card>
      <Title>
        {name}
      </Title>

      <Text>
        {open ? 'Open Af' : 'Closed Af'}
      </Text>

      <button
        className="button is-info"
        type="button"
        onClick={() => renderSpaceModal()}
        onKeyPress={handleKeyPress}
      >
        Render Space Info Modal
      </button>
    </Card>
  );
};

SpaceCard.defaultProps = {
  open: false,
};

SpaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool,
  renderSpaceModal: PropTypes.func.isRequired,
};

export default SpaceCard;
