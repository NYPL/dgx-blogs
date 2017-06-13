import React from 'react';
import PropTypes from 'prop-types';

class NotFoundAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="notFoundAlert">
        <div className="notFoundAlert-message">
          {this.props.message}
          <a href="/blog/beta/">Go back to the NYPL Blogs home page</a>
        </div>
      </div>
    );
  }
}

NotFoundAlert.defaultProps = {
  message: 'Oops! Seems like the blog you are trying to access does not exist.',
};

NotFoundAlert.propTypes = {
  message: PropTypes.string,
};

export default NotFoundAlert;
