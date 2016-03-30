import React from 'react';

import _ from 'underscore';

import Store from '../../stores/Store.js';

import Hero from '../Hero/Hero';
import BlogRow from '../BlogRow/BlogRow';
import BlogTags from '../BlogTags/BlogTags';

class BlogsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }

  _getList(blogsList) {
    return blogsList.map(function(blogRow) {

      return <BlogRow data={blogRow} />;
    });
  }
  
  render() {

    const blogs = this._getList(this.state.blogs);

    return (
      <div className="blogsWrapper">
        <Hero />
        <div className="sidebar">
          <h3 className="sidebar-title">Blog</h3>
          <a href="#" className="sidebar-link">Blogger Profiles</a>
          <a href="#" className="sidebar-link">Blog Topics</a>
        </div>
        <ul className="blogsList">
          {blogs}
        </ul>
      </div>
    );
  }
}

export default BlogsWrapper;
