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
    const { author, subjects, title, date, mainPicture } = blog;
    const body = this.createMarkup(blog.body.full);

    return (
      <div className='blogPage'>
        <Hero coverUrl={mainPicture['full-uri']} />
        <Link 
          className="backToLink" 
          to="blogs">
          back to blogs
        </Link>
        <BlogSubjects data={subjects} />
        <Blog 
          date={date}
          title={title} 
          body={body} 
          author={author}
          mainPicture={mainPicture['full-uri']}
          dangerouslySetInnerHTML={body}/>
        <AuthorCard 
          data={author} 
          className="authorCardFooter"/>
      </div>
    );
  }
}

export default BlogPage;