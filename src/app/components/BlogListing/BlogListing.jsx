import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import Actions from '../../actions/Actions';
import { DotsIcon } from 'dgx-svg-icons';

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
        this.routeHandler(`${this.props.appBaseUrl}not-found`);
      }); /* end Axios call */
  }

  fetchSeries(e) {
    e.preventDefault();

    Actions.switchToLoading(`${this.props.series[0].title} | Series`);

    axios
      .get(`${this.props.appBaseUrl}api?series=${this.props.series[0].id}`)
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
        this.routeHandler(`${this.props.appBaseUrl}not-found`);
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
          alt="''"
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
        <Link
          to={`${this.props.appBaseUrl}${this.props.slug}`}
          onClick={this.fetchSingleBlog}
        >
          <h1 className={`blogListing-title ${this.props.width}`}>
          {this.props.title}
          </h1>
          {this.mainPicture()}
          <div className={`blogListing-paragraph ${this.props.side} ${this.props.width}`}>
            <span dangerouslySetInnerHTML={unescapedBody}></span>
            <span className="readMoreButton">
              <DotsIcon
                height="48"
                width="48"
                ariaHidden
              />
              <span>Read More</span>
            </span>
          </div>
        </Link>
        <BlogSubjects
          className="blogSubjectsInList"
          subjects={this.props.subjects}
          maxSubjectsShown={3}
          appBaseUrl={this.props.appBaseUrl}
        />
      </div>
    );
  }
}

BlogListing.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  series: PropTypes.array,
  side: PropTypes.string,
  width: PropTypes.string,
  subjects: PropTypes.array,
  mainPicture: PropTypes.shape({
    'full-uri': PropTypes.string,
  }),
  appBaseUrl: PropTypes.string,
};

BlogListing.defaultProps = {
  seriesTitle: '',
};

/*
 * @see http://stackoverflow.com/questions/32033247/react-router-transitionto-is-not-a-function
 */
BlogListing.contextTypes = {
  router: PropTypes.object,
};

export default BlogListing;
