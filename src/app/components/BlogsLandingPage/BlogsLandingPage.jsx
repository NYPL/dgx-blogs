import React from 'react';
import Store from '../../stores/Store.js';

/*
 * blog landing page components
 */
import Hero from '../Hero/Hero';
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
  console.log('BlogsLandingPage state', this.state);  
    return (
      <div className="blogsLandingPage">
        <Hero />
        <ul>
          {blogsList}
        </ul>
      </div>
    );
  }
}

export default BlogsLandingPage;