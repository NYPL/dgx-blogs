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
      <div
        className="blog"
        >
        <p className="blog-date">{ this.props.date }</p>
        <h1 className="blog-title">{ this.props.title }</h1>
        <div className="blog-author">
          by <b>{this.props.author.fullName}</b>. {this.props.author.title}
        </div>
        <p className="blog-date">{this.props.date}</p>
        <div
          className="blog-bodyText"
          dangerouslySetInnerHTML={unescapedBody}
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
