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
    this.getList = this.getList.bind(this);
  }

  getList(blogList) {
    return blogList.map((blogRow, index) => {
      return <BlogRow key={index} data={blogRow} />;
    });
  }
  
  render() { 
    return (
      <div className="blogsLandingPage">
        <Hero />
        <ul>
          {this.getList()}
        </ul>
      </div>
    );
  }
}

export default BlogsLandingPage;