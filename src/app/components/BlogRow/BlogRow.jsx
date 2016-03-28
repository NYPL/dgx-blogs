import React from 'react';

//blog row inner components
import AuthorCard from '../AuthorCard/AuthorCard';
import BlogListing from '../BlogListing/BlogListing';
import BlogTags from '../BlogTags/BlogTags';

class BlogRow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
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
}

export default BlogRow;