/*
 * Blog component
 */
import React from 'react';
import PropTypes from 'prop-types';

const Blog = (props) => {
  const createMarkup = (bodyText) => ({ __html: bodyText });
  const unescapedBody = createMarkup(props.body);

  return (
    <main className="blog">
      <p className="blog-date">{props.date}</p>
      <h1 className="blog-title">{props.title}</h1>
      <div className="blog-author">
        by <b>{props.author.fullName}</b>. {props.author.title}
      </div>
      <p className="blog-date">{props.date}</p>
      <div
        className="blog-bodyText"
        dangerouslySetInnerHTML={unescapedBody}
      >
      </div>
    </main>
  );
};

Blog.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  mainPicture: PropTypes.string,
  author: PropTypes.shape({
    fullName: PropTypes.string,
    title: PropTypes.string,
  }),
};

Blog.defaultProps = {
  author: {},
};

export default Blog;
