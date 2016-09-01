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

/* metatags */
import DocMeta from 'react-doc-meta';

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

    const fallbackImage = 'https://d2720ur5668dri.cloudfront.net/sites/default/files/styles/extralarge/public/blog.jpg';

    const singleBlogMetas = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${title} | The New York Public Library` },
      { property: 'og:image', content: (mainPicture && mainPicture['full-uri']) ? mainPicture['full-uri'] : fallbackImage },
      { property: 'og:description', content: blog.body.short },
      //{ property: 'og:url', content: 'url'},
      { name: 'twitter:title', content: `${title} | The New York Public Library` },
      { name: 'twitter:description', content: blog.body.short },
      { name: 'twitter:image', content: (mainPicture && mainPicture['full-uri']) ? mainPicture['full-uri'] : fallbackImage }
    ];

    return (

      <section className="blogPage">
        <DocMeta tags={singleBlogMetas} />
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
