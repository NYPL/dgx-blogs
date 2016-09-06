import React from 'react';
import { LionLogoIcon } from 'dgx-svg-icons';

class AuthorPicture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.picture) {
      return (
        <img
          className="authorPicture"
          src={this.props.picture}
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
  }
}

AuthorPicture.propTypes = {   
  image: React.PropTypes.string
};

export default AuthorPicture;
