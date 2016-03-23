//BlogListing
import React from 'react';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();
    //this._getList = this._getList.bind(this);
  }
  
  render() {
    //TODO use a helper funtion like this._getList(this.state._angularApps);

    return (
      <div className="blogListing">
      	<h2 className="blogListing-title">{this.props.data.title.en.text}</h2>
        <img className="blogListing-image" src="http://placehold.it/200x300" />
        <p>{this.props.data.body.en['short-text']}</p>
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

export default BlogListing;