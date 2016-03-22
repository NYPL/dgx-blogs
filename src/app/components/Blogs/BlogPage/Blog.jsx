//Blog
import React from 'react';

class Blog extends React.Component {
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
      	Blog itself
      </div>
    );
  }

  // Helper functions below the render() function:
  /*_getList(appsArray) {
    return appsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  }*/
}

export default Blog;