import React from 'react';
import Store from '../../stores/Store.js';

// blog components
import HeroSinglePost from '../HeroSinglePost/HeroSinglePost';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import Blog from '../Blog/Blog';
import BlogAuthorCard from '../BlogAuthorCard/BlogAuthorCard';
import BackToBlogs from '../BackToBlogs/BackToBlogs';
import NotFoundAlert from '../NotFoundAlert/NotFoundAlert';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }

  render() {
    const blog = this.state.blogPost[0];

    /* check if the blog really exists, if not do not render */
    if (blog === undefined) {
      return (
        <NotFoundAlert />
        );
    } else {    
      const { author, subjects, title, date, mainPicture } = blog;

      return (
        <div className="blogPage">
          <HeroSinglePost coverUrl={mainPicture['full-uri']} />
          <div className="content">
            <BackToBlogs />
            <BlogSubjects subjects={subjects} />
            <Blog
              date={date}
              title={title}
              author={author ? author : {}}
              mainPicture={mainPicture['full-uri']}
              body={blog.body.full ? blog.body.full : ''}
            />
            <BlogAuthorCard
              data={author}
            />
          </div>
        </div>
      );
    }
  }
}

export default BlogPage;
