import React from 'react';
import PropTypes from 'prop-types';
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
      this.context.router.push(`${appBaseUrl}not-found`);
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

    const fallbackImage = 'https://d2720ur5668dri.cloudfront.net/sites/default' +
      '/files/styles/extralarge/public/blog.jpg';

    const singleBlogMetas = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${title} | The New York Public Library` },
      { property: 'og:site_name', content: `The New York Public Library` },
      {
        property: 'og:image',
        content: (mainPicture && mainPicture['full-uri']) ? mainPicture['full-uri'] : fallbackImage,
      },
      { property: 'og:description', content: blog.body.short },
      { property: 'og:url', content: `https://nypl.org${this.props.location.pathname}` },
      { name: 'twitter:title', content: `${title} | The New York Public Library` },
      { name: 'twitter:description', content: blog.body.short },
      {
        name: 'twitter:image',
        content: (mainPicture && mainPicture['full-uri']) ? mainPicture['full-uri'] : fallbackImage,
      },
      { name: "twitter:card", content: 'summary_large_image' },
      { name: "twitter:site", content: '@nypl' },
      { name: "twitter:creator", content: '@nypl' },
    ];
    let path = this.props.location.pathname;
    if (path.indexOf('/blog/beta') !== -1) {
      path = path.substring(10);
    }

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
          <BackToBlogs text="BACK TO BLOG" />
          <span className="blogPage-back-link">
            <a
              href="https://docs.google.com/a/nypl.org/forms/d/e/1FAIpQLScGrRWq8okHleFQnc9NS5iGyNobizkP0ulSurvYLsPkQRcnXw/viewform"
              target="_blank"
              style={{ color: 'inherit' }}
            >
              Take a survey about our new blog redesign
            </a>, or
            <a href={`/blog${path}`}> return to the current version
            of this blog post</a>.
          </span>
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
  router: PropTypes.object,
};

export default BlogPage;
