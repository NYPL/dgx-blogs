import React from 'react';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import BlogSubjects from '../BlogSubjects/BlogSubjects';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
  }

  _mainPicture() {
    if (this.props.mainPicture) {
      return (
        <img
          className={`blogListing-image image-${this.props.side}`}
          src={this.props.mainPicture['full-uri']}
        />
      );
    }

    return null;
  }

  _seriesTitle() {
    if (this.props.series !== null && this.props.series[0] !== null) {
      return (<p className={`blogListing-series ${this.props.width}`}>{this.props.series[0].title}</p>);
    } else { 
      return null;
    }
  }

  render() {

    return (
      <div className="blogListing">
        {this._seriesTitle()}
        <h2 className={`blogListing-title ${this.props.width}`}>
          <a href={`/blog/${this.props.slug}`}>
            {this.props.title}
          </a>
        </h2>
        {this._mainPicture()}
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
  mainPicture: React.PropTypes.shape(
    {
      'full-uri': React.PropTypes.string,
    }),
};

BlogListing.defaultProps = {
  seriesTitle: '',
};

export default BlogListing;
