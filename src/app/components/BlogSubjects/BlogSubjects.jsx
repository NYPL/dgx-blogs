import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import Actions from '../../actions/Actions.js';

class BlogSubjects extends React.Component {
  constructor(props) {
    super(props);

    this._fetchSubject = this._fetchSubject.bind(this);
  }

  _fetchSubject(subject) {
    axios
      .get(`/api?subject=${subject}`)
      .then(response => {
        Actions.updateBlogs(response.data);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  _getList(subjects) {
    const subjectsList = subjects.slice(0, this.props.maxSubjectsShown);
    
    return subjectsList.map((subject, index) => {
      return (
        <li key={index}>
          <Link
            to="subjects"
            params={{ subject: subject.id }}
            className="tagLink"
            onClick={this._fetchSubject.bind(this, subject.id)}
          >
            {subject.name}
          </Link>
        </li>
        );
    });
  }

  render() {
    let subjects = this.props.data ? this._getList(this.props.data) : null;
    subjects = this.props.maxSubjectsShown ? subjects : subjects;

    return (
      <div className={this.props.className}>
        <ul className={ `${this.props.className} + -list`}>
          {subjects}
        </ul>
      </div>
    );
  }
}

BlogSubjects.propTypes = {
  data: React.PropTypes.array.isRequired,
  className: React.PropTypes.string.isRequired,
  maxSubjectsShown: React.PropTypes.number,
};

BlogSubjects.defaultProps = {
  data: [],
  className: 'blogTagsSidebar',
  maxSubjectsShown: 3,
};

export default BlogSubjects;
