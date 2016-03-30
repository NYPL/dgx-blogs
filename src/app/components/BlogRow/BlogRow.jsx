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
          <BlogTags data={this.props.data.tags}/>
        </div>
      	<BlogListing data={this.props.data} />
      </li>
    );
  }
}

BlogRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BlogRow;