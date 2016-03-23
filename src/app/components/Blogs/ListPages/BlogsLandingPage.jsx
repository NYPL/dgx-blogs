//BlogsLandingPage
import React from 'react';

import Store from '../../../stores/Store.js';

//blog landing page components
import BlogListingHero from './BlogListingHero';
import BlogRow from './BlogRow';
import BlogTags from '../Common/BlogTags';

class BlogsLandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }
  
  render() {
  	//TODO change this source to store

    return (
      <div className='blogsLandingPage'>
        <BlogListingHero />
	      <ul>
	        {blogsList}
	      </ul>
      </div>
    );
  }

  // Helper functions below the render() function:
  _getList(blogsList) {
    return blogsList.map(function(blogRow) {
  	  return <BlogRow data={blogRow} />;
  	});
  }
}

export default BlogsLandingPage;