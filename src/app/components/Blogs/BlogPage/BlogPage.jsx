import React from 'react';

import Store from '../../../stores/Store.js';

//blog components
import BlogHero from './BlogHero';
import BlogTags from '../Common/BlogTags';
import Blog from './Blog';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();
    //this._getList = this._getList.bind(this);
  }
  
  render() {
    const blogData = {title: 'FirstBlog', description:'blah blah blah'};
    const blogName = this.props.params.blogId;
    //TODO use a helper funtion like this._getList(this.state._angularApps);

    return (
      <div className='blog-wrapper'>
        <h1>{blogName}</h1>
        <BlogHero />
        <BlogTags />
        <Blog />
      </div>
    );
  }

  // Helper functions below the render() function:
}

export default BlogPage;