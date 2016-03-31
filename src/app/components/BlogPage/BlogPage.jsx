import React from 'react';

import Store from '../../stores/Store.js';

//blog components
import Hero from '../Hero/Hero';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import Blog from '../Blog/Blog';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }
  
  render() {
    const blog = this.state.blogPost[0];
    const title = blog.title;
    const fullName = blog.author.fullName;
    // console.log(blog);

    return (
      <div className='blog-wrapper'>
        <Hero />
        <h1>{title}</h1>
        <p>{fullName}</p>
        <BlogSubjects />
        <Blog />
      </div>
    );
  }
}

export default BlogPage;