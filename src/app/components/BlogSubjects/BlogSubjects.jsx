import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import Actions from '../../actions/Actions.js';

class BlogSubjects extends React.Component {
  constructor(props) {
    super(props);

    this.fetchSubject = this.fetchSubject.bind(this);
  }

  fetchSubject(subject, subjectId, e) {
    e.preventDefault();

    axios
      .get(`${this.props.appBaseUrl}api?subject=${subject}`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: `${this.props.appBaseUrl}subjects/${subject}`,
        });
      })
      .then(() => {
        this.routeHandler(subject);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler(subject) {
    this.context.router.push(`${this.props.appBaseUrl}subjects/${subject}`);
  }

  getList(subjects) {
    const subjectsList = subjects.slice(0, this.props.maxSubjectsShown);

    return subjectsList.map((subject, index) => {
      return (
        <li className="tagItem" key={index}>
          <Link
            to={`${this.props.appBaseUrl}subjects/${subject.id}`}
            className="tagLink"
            onClick={this.fetchSubject.bind(subject, subject.id, this)}>
            {this.tagIcon()}
            {subject.name}
          </Link>
        </li>
        );
    });
  }

  tagIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
        className="svgIcon"
        aria-hidden="true"
      >
        <title>tag.icon</title>
        <path d="M26.45536,26.45536H16.80078L4.92843,14.58216l9.65373-9.65373,11.8732,11.87235v9.65458ZM17.87606,23.859h5.983v-5.983L14.58216,8.5992l-5.983,5.983Z" />
      </svg>
    );
  }

  renderContent() {
    /* if there is not any subject this component musnt generate any html */
    if (! this.props.subjects || this.props.subjects.length === 0) {
      return null;
    }

    /* if there are subjects*/
    let subjects = this.props.subjects ? this.getList(this.props.subjects) : null;
    subjects = this.props.maxSubjectsShown ? subjects.slice(0, this.props.maxSubjectsShown) : subjects;

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-list`}>
          {subjects}
        </ul>
      </div>
    );
  }

  render() {
    return this.renderContent();
  }
}

BlogSubjects.propTypes = {
  subjects: React.PropTypes.array.isRequired,
  className: React.PropTypes.string.isRequired,
  maxSubjectsShown: React.PropTypes.number,
};

BlogSubjects.defaultProps = {
  subjects: [],
  className: 'blogSubjects',
  maxSubjectsShown: 3,
};

BlogSubjects.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BlogSubjects;
