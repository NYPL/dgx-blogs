import React from 'react';
import {Link} from 'react-router';

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
    const body = blog.body.short;
    const author = blog.author;
    const imgPlaceholder = "http://placehold.it/1513x406/";

    return (
      <div className='blogPage'>
        <Hero imageUrl={imgPlaceholder} />
        <Link 
          className="backToLink" 
          to="blogs">
          back to blogs
        </Link>
        <BlogSubjects data={this.state.tags} />
        <Blog 
          title={title} 
          body={body} 
          author={author}/>
      </div>
    );
  }
}

export default BlogPage;