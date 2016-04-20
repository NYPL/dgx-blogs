import React from 'react';

//blog row inner components
import BlogAuthor from '../BlogAuthor/BlogAuthor';
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
        	<BlogAuthor data={author} />
          <BlogSubjects 
            className="blogPage-sidebar"
            renderAs="blogRow-sidebar"
            subjects={subjects}
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
  data: React.PropTypes.shape({
    author: React.PropTypes.object,
    subjects: React.PropTypes.array,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.object,
    slug: React.PropTypes.string.isRequired,
    series: React.PropTypes.array,
  })
};

export default BlogRow;