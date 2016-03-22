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
    var blogsList = this._getList([
          {
            title: "Women's History Month: Celebrating Black Women in Jazz at the Schomburg",
            body: "This year, our series features performances from great artists such as Shelley Nicole, Mal Devisa, Alicia Hall Moran, Camille A. Brown, Bernice Reagon Johnson, and many others.",
            tags: ["women", "history", "celebration"]
          },
          {
            title: "Feminist YA Fiction",
            body: "Novels that feature strong, female characters who either confront sexism, defy the patriarchal order, subvert gender expectations or celebrate female solidarity, or all of the above.",
            tags: ["Novels", "Female", "Characters"]
          }
        ]);

    return (
      <div className='blog-wrapper'>
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