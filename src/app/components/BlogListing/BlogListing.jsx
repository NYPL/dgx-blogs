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

  _seriesTitle() {
    if (this.props.series !== null && this.props.series[0] !== null) {
      if (this.props.mainPicture && this.props.mainPicture['full-uri']) {
        return (<p className="blogListing-series">{this.props.series[0].title}</p>);
      } else {
        return (<p className="blogListing-fullWidthSeries">{this.props.series[0].title}</p>);
      }
    } else { 
      return null;
    }
  }

  render() {
    /* place the image on the left or right side randomly */
    const rightOrLeft = (this.props.title.length % 2) ? 'Right' : '';

    let paragraphClass = 'blogListing-fullWidthParagraph';
    let titleClass = 'blogListing-fullWidthTitle';

    /* apply a different class to the text paragraph if there's an image */
    if (this.props.mainPicture && this.props.mainPicture['full-uri']) {
      paragraphClass = `blogListing-paragraph${rightOrLeft}`;
      titleClass = 'blogListing-title';
    }

    return (
      <div className="blogListing">
        {this._seriesTitle()}
        <h2 className={titleClass}>
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
