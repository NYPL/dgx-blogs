import React from 'react';

const ProfilesListLetterTitle = ({letter}) => {

  return (
    <div className="profilesListLetterTitle">
      <div className="profilesListLetterTitle-letter">
        {letter}.
      </div>
    </div>
  );
};

ProfilesListLetterTitle.defaultProps = {
  letter: null
};

export default ProfilesListLetterTitle;
