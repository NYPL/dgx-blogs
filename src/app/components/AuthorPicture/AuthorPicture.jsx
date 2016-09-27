import React from 'react';
import { LionLogoIcon } from 'dgx-svg-icons';

const AuthorPicture = ({ image }) => {
  if (image) {
    return (
      <img
        className="authorPicture"
        src={image}
        alt="''"
      />
    );
  }

  return (
    <LionLogoIcon
      className="authorPicture"
      fill="transparent"
      ariaHidden
    />
  );
};

AuthorPicture.propTypes = {
  image: React.PropTypes.string,
};

export default AuthorPicture;
