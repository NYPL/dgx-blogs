import React from 'react';
import Store from '../../stores/Store.js';

/*
 * blog landing page components
 */
import BlogListingHero from '../HeroBlogSeries/HeroBlogSeries';
import BlogRow from '../BlogRow/BlogRow';

class BlogsLandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }

  _getList(blogsList) {
    return blogList.map((blogRow, index) => {
      return <BlogRow key={index} data={blogRow} />;
    });
  }
  
  render() {
    
    return (
      <div className="blogsLandingPage">
        <HeroBlogSeries />
        <ul>
          {blogsList}
        </ul>
      </div>
    );
  }
}

export default BlogsLandingPage;