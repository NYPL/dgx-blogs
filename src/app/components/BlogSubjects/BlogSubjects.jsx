import React from 'react';
import { Link } from 'react-router'
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
        console.log(response.data);
        Actions.updateBlogs(response.data);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  _getList(subjects) {
    return subjects.map((subject, index) => {
      return (
        <li key={index}>
          <Link
            to='subjects'
            params={{subject: subject.id}}
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
    const subjects = this.props.data ? this._getList(this.props.data) : null;
    const mainClass = this.props.renderAs;

    return (
      <div className={mainClass}>
        <ul className={mainClass + "-list"}>
          {subjects}
        </ul>
      </div>
    );
  }
}

BlogSubjects.propTypes = {
  data: React.PropTypes.array.isRequired
};

/* @todo change renderAs by className */
BlogSubjects.defaultProps = {
  data: [],
  renderAs: 'blogTagsSidebar'
};

export default BlogSubjects;