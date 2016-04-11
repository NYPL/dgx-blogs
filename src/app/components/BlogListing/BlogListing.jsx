import React from 'react';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    const seriesTitle = (this.props.series != null && this.props.series[0] != null) ?
      <p className="blogListing-series">{this.props.series[0].title}</p> : null;

    return (
      <div className="blogListing">
        {seriesTitle}
      	<h2>
          <a className="blogListing-title" href={'/blogs/' + this.props.slug}>
            {this.props.title}
          </a>
        </h2>
        <img className="blogListing-image" src={this.props.mainPicture} />
        <p className="blogListing-paragraph">{this.props.body}</p>
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