//BlogsLandingPage
import React from 'react';

import Store from '../../stores/Store.js';

/*
 * blog landing page components
 */
import BlogListingHero from '../BlogListingHero/BlogListingHero';
import BlogRow from '../BlogRow/BlogRow';
import BlogTags from '../BlogTags/BlogTags';

class BlogsLandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }

  _getList(blogsList) {
    return blogList.map((blogRow) => {
      return <BlogRow data={blogRow} />;
    });
  }
  
  render() {

    return (
      <div className='blogsLandingPage'>
        <BlogListingHero />
        <ul>
          {blogsList}
        </ul>
      </div>
    );
  }
}

export default BlogsLandingPage;