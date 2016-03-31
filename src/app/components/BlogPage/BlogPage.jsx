import React from 'react';

import Store from '../../stores/Store.js';

//blog components
import Hero from '../Hero/Hero';
import BlogTags from '../BlogTags/BlogTags';
import Blog from '../Blog/Blog';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const blogName = this.props.params.blogId;
    return (
      <div className='blog-wrapper'>
        <h1>{blogName}</h1>
        <Hero />
        <BlogTags />
        <Blog />
      </div>
    );
  }
}

export default BlogPage;