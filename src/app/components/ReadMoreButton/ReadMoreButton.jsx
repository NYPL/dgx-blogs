import React from 'react';
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

    axios
      .get(`${this.props.appBaseUrl}api?blog=${this.props.slug}`)
      .then(response => {
        Actions.updateBlogPost(response.data);
      })
      .then(response => {
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler() {
    this.context.router.push(`${this.props.appBaseUrl}${this.props.slug}`);
  }

  render() {
    return (
      <Link
        className="readMoreButton"
        to={`${this.props.appBaseUrl}${this.props.slug}`}
        onClick={this.fetchSingleBlog}
      >
        <DotsIcon />
        <span>Read More</span>
      </Link>
    );
  }
}

ReadMoreButton.propTypes = {
  slug: React.PropTypes.string.isRequired,
};

ReadMoreButton.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default ReadMoreButton;
