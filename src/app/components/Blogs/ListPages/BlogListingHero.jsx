//BlogTags common component used in listpages and blogpage
import React from 'react';

class BlogListingHero extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();
    //this._getList = this._getList.bind(this);
  }
  
  render() {
    //TODO use a helper funtion like this._getList(this.state._angularApps);

    return (
      <div className="blogListingHero">
        BlogListingHero block should be here
      </div>
    );
  }

  // Helper functions below the render() function:
}

export default BlogListingHero;