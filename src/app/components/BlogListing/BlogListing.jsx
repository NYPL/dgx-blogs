import React from 'react';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import { Link } from 'react-router';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
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
          <Link 
            to={`/blog/${this.props.slug}`}>
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

export default BlogListing;
