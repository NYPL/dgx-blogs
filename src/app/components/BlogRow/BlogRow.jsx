import React from 'react';

import BlogAuthor from '../BlogAuthor/BlogAuthor';
import BlogListing from '../BlogListing/BlogListing';
import BlogSubjects from '../BlogSubjects/BlogSubjects';

class BlogRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { author, subjects, title, body, date, mainPicture, slug, series } = this.props.data;
    const width = (! mainPicture || ! mainPicture['full-uri']) ? 'fullWidth' : '';

    /* place the image on the left or right side randomly */
    const side = (title.length % 2) ? 'rightSide' : 'leftSide';

    return (
      <li className="blogRow">
        <div className="blogRow-leftSidebar">
          <p className="blogRow-leftSidebar-date">{date}</p>
          <BlogAuthor data={author} />
          <BlogSubjects
            className="blogSubjectsInPostSidebar"
            subjects={subjects}
            maxSubjectsShown={3}
          />
        </div>
        <BlogListing
          series={series}
          title={title}
          body={body.short}
          mainPicture={mainPicture}
          slug={slug}
          subjects={subjects}
          width={width}
          side={side}
        />
      </li>
    );
  }
}

BlogRow.propTypes = {
  data: React.PropTypes.shape({
    date: React.PropTypes.string,
    author: React.PropTypes.object,
    subjects: React.PropTypes.array,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.object,
    mainPicture: React.PropTypes.object,
    slug: React.PropTypes.string.isRequired,
    series: React.PropTypes.array,
  }),
};

export default BlogRow;
