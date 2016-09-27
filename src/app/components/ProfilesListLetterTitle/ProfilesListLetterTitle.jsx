import React from 'react';

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
  letter: React.PropTypes.string,
};

export default ProfilesListLetterTitle;
