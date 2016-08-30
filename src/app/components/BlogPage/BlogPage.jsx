import React from 'react';
import Store from '../../stores/Store.js';

// blog components
import HeroSinglePost from '../HeroSinglePost/HeroSinglePost';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import Blog from '../Blog/Blog';
import BlogAuthorCard from '../BlogAuthorCard/BlogAuthorCard';
import BackToBlogs from '../BackToBlogs/BackToBlogs';
import LoadingLayer from '../LoadingLayer/LoadingLayer';

import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    
    Store.listen(this.onChange);
      
    if (this.state.blogPost.blogList[0] === undefined) {
      this.context.router.push('${appBaseUrl}not-found');
      return;
    }
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange);
  }

  onChange() {
    this.setState(Store.getState());
  }
  
  render() {
    if (this.state.blogPost.blogList[0] === undefined) {
      return null;
    }

    const blog = this.state.blogPost.blogList[0];
    const { author, subjects, title, date, mainPicture } = blog;

    return (
      <section className="blogPage">
        <LoadingLayer
          status={this.state.appLoading}
          title={this.state.loadingTitle}
          />
        <HeroSinglePost coverUrl={mainPicture['full-uri']} />
        <div
          className="content"
          id="mainContent"
        >
          <BackToBlogs 
            appBaseUrl={appBaseUrl}
          />
          <BlogSubjects
            subjects={subjects} 
            appBaseUrl={appBaseUrl}
          />
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
      </section>
    );
  }
}

BlogPage.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BlogPage;
