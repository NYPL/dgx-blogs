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
      <li className='blogRow'>
        <div className="blogRow-sidebar">
        	<AuthorCard data={this.props.data.authors} />
          <BlogTags />
        </div>
      	<BlogListing data={this.props.data.attributes} />
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