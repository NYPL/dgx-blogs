import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import Actions from '../../actions/Actions';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);

    this.fetchSingleBlog = this.fetchSingleBlog.bind(this);
    this.fetchSeries = this.fetchSeries.bind(this);
  }

  createMarkup(bodyText) {
    return { __html: bodyText };
  }

  fetchSingleBlog(e) {
    e.preventDefault();

    Actions.switchToLoading(this.props.title);

    axios
      .get(`${this.props.appBaseUrl}api?blog=${this.props.slug}`)
      .then(response => {
        Actions.updateBlogPost(response.data);
      })
      .then(() => {
        Actions.returnToReady();
        this.routeHandler(`${this.props.appBaseUrl}${this.props.slug}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  fetchSeries(e) {
    e.preventDefault();

    Actions.switchToLoading(this.props.series[0].title);

    axios
      .get(`/api?series=${this.props.series[0].id}`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: `${this.props.appBaseUrl}series/${this.props.series[0].id}`,
        });
      })
      .then(() => {
        Actions.returnToReady();
        this.routeHandler(`${this.props.appBaseUrl}series/${this.props.series[0].id}`);
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
          alt=""
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
          to={`${this.props.appBaseUrl}series/${this.props.series[0].id}`}
          onClick={this.fetchSeries}
        >
          {this.props.series[0].title}
        </Link>
      );
    }
    return null;
  }

  render() {
    const unescapedBody = this.createMarkup(this.props.body);

    return (
      <div className="blogListing">
        {this.seriesTitle()}
        <h1 className={`blogListing-title ${this.props.width}`}>
          <Link
            to={`${this.props.appBaseUrl}${this.props.slug}`}
            onClick={this.fetchSingleBlog}
          >
            {this.props.title}
          </Link>
        </h1>
        {this.mainPicture()}
        <div className={`blogListing-paragraph ${this.props.side} ${this.props.width}`}>
          <span dangerouslySetInnerHTML={unescapedBody}></span>
          <ReadMoreButton
            slug={this.props.slug}
            appBaseUrl={this.props.appBaseUrl}
            blogTitle={this.props.title}
            blogSeries={(this.props.series !== null && this.props.series[0] !== null) ? this.props.series[0].title : ''}
          />
          <BlogSubjects
            className="blogSubjectsInList"
            subjects={this.props.subjects}
            maxSubjectsShown={3}
            appBaseUrl={this.props.appBaseUrl}
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
