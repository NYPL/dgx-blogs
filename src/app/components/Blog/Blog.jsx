/*
 * Blog component
 */
import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  createMarkup(bodyText) {
    return { __html: bodyText };
  }

  render() {
    const unescapedBody = this.createMarkup(this.props.body);

    return (
      <div className="blogContent">
        <p className="blogContent-date">{ this.props.date }</p>
        <h1 className="blogContent-title">{ this.props.title }</h1>
        <div className="blogContent-author">
          by <b>{this.props.author.fullName}</b>. { this.props.author.title }
        </div>
        <p className="blogContent-date">{ this.props.date }</p>
        <img className="blogContent-mainPicture" src={ this.props.mainPicture } />
        <div
          className="blogContent-bodyText"
          dangerouslySetInnerHTML={ unescapedBody }
        >
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  date: React.PropTypes.string,
  title: React.PropTypes.string,
  body: React.PropTypes.string,
  mainPicture: React.PropTypes.string,
  author: React.PropTypes.shape({
    fullName: React.PropTypes.string,
    title: React.PropTypes.string,
  }),
};

Blog.defaultProps = {
  author: {},
};

export default Blog;
