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
  
  render() {
    const blog = this.state.blogPost[0];
    const { author, subjects, title, date, mainPicture } = blog;

    return (
      <div className='blogPage'>
        <Hero coverUrl={mainPicture['full-uri']} />
        <div className="content">
          <Link 
            className="backToLink" 
            to="blogs"
          >
            back to blogs
          </Link>
          <BlogSubjects subjects={subjects} />
          <Blog 
            date={date}
            title={title}  
            author={author ? author : {}}
            mainPicture={mainPicture['full-uri']}
            body={blog.body.full ? blog.body.full : ''}
          />
          <AuthorCard 
            data={author} 
            className="authorCardFooter"
          />
        </div>
      </div>
    );
  }
}

export default BlogPage;