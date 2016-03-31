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
    const { authors, tags, title, body } = this.props.data;
    const blogListingData = {
      title: title, 
      body: body,
      image: null 
      };
    
    return (
      <li className='blogRow'>
        <div className="blogRow-sidebar">
        	<AuthorCard data={authors} />
          <BlogTags data={tags}/>
        </div>
      	<BlogListing title={title} body={body} />
      </li>
    );
  }
}

BlogRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BlogRow;