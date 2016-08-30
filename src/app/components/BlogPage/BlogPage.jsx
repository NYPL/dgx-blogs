import React from 'react';
import Store from '../../stores/Store.js';

// blog components
import HeroSinglePost from '../HeroSinglePost/HeroSinglePost';
import BlogSubjects from '../BlogSubjects/BlogSubjects';
import Blog from '../Blog/Blog';
import BlogAuthorCard from '../BlogAuthorCard/BlogAuthorCard';
import BackToBlogs from '../BackToBlogs/BackToBlogs';

import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

/* metatags */
import DocMeta from 'react-doc-meta';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }

  componentDidMount() {

      if (this.state.blogPost.blogList[0] === undefined) {
      this.context.router.push('${appBaseUrl}not-found');
      return;
    }
  }

  render() {
    if (this.state.blogPost.blogList[0] === undefined) {
      return null;
    }

    //const blog = this.state.get('blogPost').first().toJS();
    const blog = this.state.blogPost.blogList[0];
    const { author, subjects, title, date, mainPicture } = blog;

    const singleBlogMetas = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title + ' | The New York Public Library' },
      { property: 'og:image', content: mainPicture['full-uri'] },
      { property: 'og:description', content: blog.body.short },
      //{ property: 'og:url', content: 'url'},
      { name: 'twitter:title', content: title + ' | The New York Public Library' },
      { name: 'twitter:description', content: blog.body.short },
      { name: 'twitter:image', content: mainPicture['full-uri'] }
      ];

    return (
      <div className="blogPage">
        <DocMeta tags={singleBlogMetas} />
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
      </div>
    );
  }
}

BlogPage.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BlogPage;
