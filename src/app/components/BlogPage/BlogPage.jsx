import React from 'react';

import Store from '../../stores/Store.js';

//blog components
import BlogHero from '../BlogHero/BlogHero';
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
        <BlogHero />
        <BlogTags />
        <Blog />
      </div>
    );
  }
}

export default BlogPage;