//BlogTags common component used in listpages and blogpage
import React from 'react';

class BlogListingHero extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();
    //this._getList = this._getList.bind(this);
  }
  
  render() {
    const blogData = {title: 'FirstBlog', description:'blah blah blah'};
    //TODO use a helper funtion like this._getList(this.state._angularApps);

    return (
      <div>
        BlogListingHero not sure what it is yet
      </div>
    );
  }

  // Helper functions below the render() function:
}

export default BlogListingHero;