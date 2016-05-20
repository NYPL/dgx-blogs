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
    this._fetchSeries = this._fetchSeries.bind(this);
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
        this.routeHandler(`/blog/${this.props.slug}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  _fetchSeries(e) {
    e.preventDefault();

    axios
      .get(`/api?series=${this.props.series[0].id}`)
      .then(response => {
        console.log('fetching single blog post response:', response);
        Actions.updateBlogs(response.data);
      })
      .then(response => {
        this.routeHandler(`/blog/series/${this.props.series[0].id}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler(url) {
    this.context.router.push(url);
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
        <Link
          className={`blogListing-series ${this.props.width}`}
          to={`/blog/series/${this.props.series[0].id}`}
          onClick={this._fetchSeries}
        >
          {this.props.series[0].title}
        </Link>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="blogListing">
        {this.seriesTitle()}
        <h2 className={`blogListing-title ${this.props.width}`}>
          <Link
            to={`/blog/${this.props.slug}`}
            onClick={this._fetchSingleBlog}
          >
            {this.props.title}
          </Link>
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
  },
};

export default BlogListing;
