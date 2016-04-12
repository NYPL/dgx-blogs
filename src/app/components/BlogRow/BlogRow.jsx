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
    const { author, subjects, title, body, date, mainPicture, slug, series } = this.props.data;

    return (
      <li className='blogRow'>
        <div className="blogRow-leftSidebar">
          <p className="blogRow-date">{date}</p>
        	<AuthorCard data={author} />
          <BlogSubjects 
            className="blogPage-sidebar"
            renderAs="blogRow-sidebar"
            data={subjects}
            maxSubjectsShown={3}
            />
        </div>
      	<BlogListing 
          series={series}
          title={title} 
          body={body.short} 
          mainPicture={mainPicture}
          slug={slug}/>
      </li>
    );
  }
}

BlogRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BlogRow;