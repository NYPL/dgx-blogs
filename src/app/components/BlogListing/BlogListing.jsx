import React from 'react';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);

    this._fetchSingleBlog = this._fetchSingleBlog.bind(this);
  }

  _fetchSingleBlog(slug) {
    axios
      .get(`/api?blog=${slug}`)
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

  mainPicture() {
    if (this.props.mainPicture && this.props.mainPicture['full-uri']) {
      return (
        <img
          className={`blogListing-image image-${this.props.side}`}
          src={this.props.mainPicture['full-uri']}
        />
      );
    }

    return null;
  }

  seriesTitle() {
    if (this.props.series !== null && this.props.series[0] !== null) {
      return (
        <p className={`blogListing-series ${this.props.width}`}>
          {this.props.series[0].title}
        </p>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="blogListing">
        {this.seriesTitle()}
        <h2 className={`blogListing-title ${this.props.width}`}>
          <span 
            onClick={this._fetchSingleBlog.bind(this, this.props.slug)}>
            {this.props.title}
          </span>
        </h2>
        {this.mainPicture()}
        <div className={`blogListing-paragraph ${this.props.side} ${this.props.width}`}>
          {this.props.body}
          <ReadMoreButton slug={this.props.slug} />
          <BlogSubjects
            className="blogSubjectsInList"
            subjects={this.props.subjects}
            maxSubjectsShown={3}
          />
        </div>
      </div>
    );
  }
}

BlogListing.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  series: React.PropTypes.array,
  side: React.PropTypes.string,
  width: React.PropTypes.string,
  subjects: React.PropTypes.array,
  mainPicture: React.PropTypes.shape(
    {
      'full-uri': React.PropTypes.string,
    }),
};

BlogListing.defaultProps = {
  seriesTitle: '',
};

/*
 * @see http://stackoverflow.com/questions/32033247/react-router-transitionto-is-not-a-function
 */
BlogListing.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};

export default BlogListing;
