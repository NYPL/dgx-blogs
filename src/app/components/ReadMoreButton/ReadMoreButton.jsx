import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

class ReadMoreButton extends React.Component {
  constructor(props) {
    super(props);

    this._fetchSingleBlog = this._fetchSingleBlog.bind(this);
  }

  _fetchSingleBlog(e) {
    e.preventDefault();

    axios
      .get(`/api?blog=${this.props.slug}`)
      .then(response => {
        console.log('fetching single blog post response:', response);
        Actions.updateBlogPost(response.data);
      })
      .then(response => {
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler(){
    this.context.router.push(`/blog/${this.props.slug}`);
  }

  _svgDots() {
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="svgIcon blue">
       <title>circle.more.icon.v1</title>
       <circle cx="16" cy="16" r="1.9029" />
       <circle cx="24" cy="16" r="1.9029" />
       <circle cx="8" cy="16" r="1.9029" />
      </svg>
      );
  }
  
  render() {
    return (
      <Link 
        className="readMoreButton"
        to={`/blog/${this.props.slug}`}
        onClick={this._fetchSingleBlog}
      >
        {this._svgDots()}
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
  }
};

export default ReadMoreButton;