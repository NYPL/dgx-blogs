import React from 'react';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import BlogSubjects from '../BlogSubjects/BlogSubjects';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
  }

  _mainPicture(pictureObject, rightOrLeft) {
    if (pictureObject && pictureObject['full-uri']) {
      return (
        <img
          className={`blogListing-image${rightOrLeft}`}
          src={pictureObject['full-uri']}
        />
      );
    }

    return null;
  }

  render() {
    const seriesTitle = (this.props.series !== null && this.props.series[0] !== null) ?
      <p className="blogListing-series">{this.props.series[0].title}</p> : null;

    /* place the image on the left or right side randomly */
    const rightOrLeft = (Math.round(Math.random())) ? 'Right' : '';

    /* apply a different class to the text paragraph when there's no image to show */
    const paragraphClass = this.props.mainPicture && this.props.mainPicture['full-uri'] ?
      'blogListing-paragraph' + rightOrLeft : 'blogListing-fullWidthParagraph';

    return (
      <div className="blogListing">
        {seriesTitle}
        <h2 className="blogListing-title">
          <a href={`/blog/${this.props.slug}`}>
            {this.props.title}
          </a>
        </h2>
        {this._mainPicture(this.props.mainPicture, rightOrLeft)}
        <div className={paragraphClass}>
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
