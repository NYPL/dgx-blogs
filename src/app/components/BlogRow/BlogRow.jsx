import React from 'react';
import PropTypes from 'prop-types';

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
      <article className="blogRow">
        <aside className="blogRow-leftSidebar">
          <p className="blogRow-leftSidebar-date">{date}</p>
          <BlogAuthor
            data={author}
            appBaseUrl={this.props.appBaseUrl}
          />
          <BlogSubjects
            className="blogSubjectsInPostSidebar"
            subjects={subjects}
            maxSubjectsShown={3}
            appBaseUrl={this.props.appBaseUrl}
          />
        </aside>
        <BlogListing
          series={series}
          title={title}
          body={body.short}
          mainPicture={mainPicture}
          slug={slug}
          subjects={subjects}
          width={width}
          side={side}
          appBaseUrl={this.props.appBaseUrl}
        />
      </article>
    );
  }
}


BlogRow.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    author: PropTypes.object,
    subjects: PropTypes.array,
    title: PropTypes.string.isRequired,
    body: PropTypes.object,
    mainPicture: PropTypes.object,
    slug: PropTypes.string.isRequired,
    series: PropTypes.array,
  }),
  appBaseUrl: PropTypes.string,
};

export default BlogRow;
