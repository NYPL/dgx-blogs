import React from 'react';

//blog row inner components
import AuthorCard from '../AuthorCard/AuthorCard';
import BlogListing from '../BlogListing/BlogListing';
import BlogSubjects from '../BlogSubjects/BlogSubjects';

class BlogRow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { author, subjects, title, body } = this.props.data;
    const blogListingData = {
      title: title, 
      body: body.short,
      image: null 
    };

    return (
      <li className='blogRow'>
        <div className="blogRow-leftSidebar">
          <AuthorCard data={author} />
          <BlogSubjects 
            className="blogPage-sidebar"
            renderAs="blogRow-sidebar"
            data={subjects}/>
        </div>
      	<BlogListing 
          title={title} 
          body={body.short} />
      </li>
    );
  }
}

BlogRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BlogRow;