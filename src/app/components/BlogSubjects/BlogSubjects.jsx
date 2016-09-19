import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import Actions from '../../actions/Actions.js';

/* svg */
import { TagIcon } from 'dgx-svg-icons';

class BlogSubjects extends React.Component {
  constructor(props) {
    super(props);

    this.fetchSubject = this.fetchSubject.bind(this);
  }

  getList(subjects) {
    const subjectsList = subjects.slice(0, this.props.maxSubjectsShown);

    return subjectsList.map((subject, index) => {
      return (
        <li className="tagItem" key={index}>
          <Link
            to={`${this.props.appBaseUrl}subjects/${subject.id}`}
            className="tagLink"
            onClick={this.fetchSubject.bind(this, subject)}
          >
            <TagIcon ariaHidden />
            {subject.name}
          </Link>
        </li>
        );
    });
  }

  routeHandler(location) {
    this.context.router.push(`${this.props.appBaseUrl}${location}`);
  }

  fetchSubject(subject, e) {
    e.preventDefault();

    Actions.switchToLoading(`${subject.name} | Subject`);

    axios
      .get(`${this.props.appBaseUrl}api?subject=${subject.id}`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: `${this.props.appBaseUrl}subjects/${subject.id}`,
        });
      })
      .then(() => {
        Actions.returnToReady();
        this.routeHandler(`subjects/${subject.id}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
        this.routeHandler(`not-found`);
      }); /* end Axios call */
  }

  render() {
    /* if there is not any subject this component musnt generate any html */
    if (! this.props.subjects || this.props.subjects.length === 0) {
      return null;
    }

    /* if there are subjects*/
    let subjects = this.props.subjects ? this.getList(this.props.subjects) : null;
    subjects = this.props.maxSubjectsShown ?
      subjects.slice(0, this.props.maxSubjectsShown) : subjects;

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-list`}>
          {subjects}
        </ul>
      </div>
    );
  }
}

BlogSubjects.propTypes = {
  subjects: React.PropTypes.array.isRequired,
  className: React.PropTypes.string.isRequired,
  maxSubjectsShown: React.PropTypes.number,
  appBaseUrl: React.PropTypes.string,
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
