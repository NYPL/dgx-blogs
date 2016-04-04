import React from 'react';
import {Link} from 'react-router';

import Store from '../../stores/Store.js';

//blog components
import Hero from '../Hero/Hero';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import Blog from '../Blog/Blog';
import AuthorCard from '../AuthorCard/AuthorCard';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }

  createMarkup(bodyText) { 
    return {__html: bodyText}
  };
  
  render() {
    const blog = this.state.blogPost[0];
    const { author, subjects, title, date, coverPicture } = blog;
    const body = this.createMarkup(blog.body.full);

    return (
      <div className='blogPage'>
        <Hero imageUrl={coverPicture} />
        <Link 
          className="backToLink" 
          to="blogs">
          back to blogs
        </Link>
        <BlogSubjects data={subjects} />
        <Blog 
          title={title} 
          body={body} 
          author={author}
          coverPicture={coverPicture}
          dangerouslySetInnerHTML={body}/>
        <AuthorCard 
          data={author} 
          renderAs="authorCardFooter"/>
      </div>
    );
  }
}

export default BlogPage;