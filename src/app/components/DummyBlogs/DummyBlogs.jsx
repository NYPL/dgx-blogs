import React from 'react';

import _ from 'underscore';

import Store from '../../stores/Store.js';

class DummyBlogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }
  
  render() {
    console.log(this.state.blogs);
    const blogsData = this.state.blogs;
    const blogs = _.map(blogsData, blog => {
        return (
          <li>
            <a href={blog.attributes.uri['full-uri']}>
              <p>Title: {blog.attributes.title.en.text}</p>
            </a>
            <p>Author: {blog.authors ? blog.authors[0].attributes['full-name'] : ''}</p>
          </li>
        );
      });

    return (
      <div>
        <p>List of blogs</p>
        <ul>
          {blogs}
        </ul>
      </div>
    );
  }
}

export default DummyBlogs;
