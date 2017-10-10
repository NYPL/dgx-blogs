import React from 'react';
import PropTypes from 'prop-types';

const ProfilesListLetterTitle = ({ letter }) => (
  <div className="profilesListLetterTitle">
    <div className="profilesListLetterTitle-letter">
      {letter}.
    </div>
  </div>
);

ProfilesListLetterTitle.defaultProps = {
  letter: null,
};

ProfilesListLetterTitle.propTypes = {
  letter: PropTypes.string,
};

export default ProfilesListLetterTitle;
