import React from 'react';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
  }

  _mainPicture(pictureObject) {

    if(pictureObject) {
      return (<img
        className="blogListing-image"
        src={this.props.mainPicture['full-uri']} />);
    }

    return null;
  }
  
  render() {

    const seriesTitle = (this.props.series != null && this.props.series[0] != null) ?
      <p className="blogListing-series">{this.props.series[0].title}</p> : null;

    /* apply a different class to the text paragraph when there's no image to show */
    const paragraphClass = this._mainPicture(this.props.mainPicture) ? 'blogListing-paragraph' : 'blogListing-fullWidthParagraph';

    return (
      <div className="blogListing">
        {seriesTitle}
      	<h2 className="blogListing-title">
          <a href={'/blog/' + this.props.slug}>
            {this.props.title}
          </a>
        </h2>
        {this._mainPicture(this.props.mainPicture)}
        <p className={paragraphClass}>{this.props.body}</p>
      </div>
    );
  }
}

BlogListing.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  series: React.PropTypes.array
};

BlogListing.defaultProps = {
  seriesTitle: ''
};

export default BlogListing;