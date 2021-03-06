import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

/* svg */
import { DotsIcon } from 'dgx-svg-icons';

class ReadMoreButton extends React.Component {
  constructor(props) {
    super(props);

    this.fetchSingleBlog = this.fetchSingleBlog.bind(this);
  }

  fetchSingleBlog(e) {
    e.preventDefault();

    Actions.switchToLoading(this.props.blogTitle);

    axios
      .get(`${this.props.appBaseUrl}api?blog=${this.props.slug}`)
      .then(response => {
        Actions.updateBlogPost(response.data);
      })
      .then(response => {
        Actions.returnToReady();
        this.routeHandler(this.props.slug);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
        this.routeHandler('not-found');
      }); /* end Axios call */
  }

  routeHandler(location) {
    this.context.router.push(`${this.props.appBaseUrl}${location}`);
  }

  render() {
    return (
      <Link
        className="readMoreButton"
        to={`${this.props.appBaseUrl}${this.props.slug}`}
        onClick={this.fetchSingleBlog}
      >
        <DotsIcon
          height="48"
          width="48"
          ariaHidden
        />
        <span>Read More</span>
      </Link>
    );
  }
}

ReadMoreButton.propTypes = {
  slug: PropTypes.string.isRequired,
  blogTitle: PropTypes.string,
  blogSeries: PropTypes.string,
  appBaseUrl: PropTypes.string,
};

ReadMoreButton.defaultProps = {
  blogTitle: '',
  blogSeries: '',
};

ReadMoreButton.contextTypes = {
  router: PropTypes.object,
};

export default ReadMoreButton;
