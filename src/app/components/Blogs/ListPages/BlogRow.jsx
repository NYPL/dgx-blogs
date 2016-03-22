//BlogRow
import React from 'react';

//blog row inner components
import AuthorCard from './AuthorCard';
import BlogListing from './BlogListing';
import BlogTags from '../Common/BlogTags';

class BlogRow extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();
    //this._getList = this._getList.bind(this);
  }
  
  render() {
    //TODO use a helper funtion like this._getList(this.state._angularApps);
    return (
      <li>
        <h2>{this.props.data.title}</h2>
      	<AuthorCard />
      	<BlogTags data={this.props.data.tags}/>
      	<BlogListing data={this.props.data}/>
      </li>
    );
  }

  // Helper functions below the render() function:
  /*_getList(appsArray) {
    return appsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  }*/
}

export default BlogRow;