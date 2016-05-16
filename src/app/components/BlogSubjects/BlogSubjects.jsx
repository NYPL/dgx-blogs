import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import Actions from '../../actions/Actions.js';

class BlogSubjects extends React.Component {
  constructor(props) {
    super(props);

    this._fetchSubject = this._fetchSubject.bind(this);
  }

  _tagIcon() {
    return(
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" className="svgIcon">
     <title>tag.icon</title>
     <path d="M26.45536,26.45536H16.80078L4.92843,14.58216l9.65373-9.65373,11.8732,11.87235v9.65458ZM17.87606,23.859h5.983v-5.983L14.58216,8.5992l-5.983,5.983Z"/>
     </svg>
    );
  }

  _fetchSubject(subject, subjectId, e) {
    e.preventDefault();

    axios
      .get(`/api?subject=${subject}`)
      .then(response => {
        Actions.updateBlogs(response.data);
      })
      .then(response => {
        this.routeHandler(subject);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler(subject){
    console.log('router transition to: ', `/blog/subject/${subject}`);
    this.context.router.push(`/blog/subjects/${subject}`);
    console.log('after transition');
  }

  _getList(subjects) {
    const subjectsList = subjects.slice(0, this.props.maxSubjectsShown);
    
    return subjectsList.map((subject, index) => {
      return (
        <li className="tagItem" key={index}>
          <Link
            to={`/blog/subjects/${subject.id}`}
            className="tagLink"
            onClick={this._fetchSubject.bind(subject, subject.id, this)}>
            {this._tagIcon()}
            {subject.name}
          </Link>
        </li>
        );
    });
  }

  _renderContent() {
    /* if there is not any subject this component musnt generate any html */
    if (! this.props.subjects || this.props.subjects.length == 0){ 
      return null;
    }

    /* if there are subjects*/
    let subjects = this.props.subjects ? this._getList(this.props.subjects) : null;
    subjects = this.props.maxSubjectsShown ? subjects : subjects;
    
    return (
      <div className={this.props.className}>
        <ul className={ `${this.props.className}-list`}>
          {subjects}
        </ul>
      </div>
    );
  }

  render() {
    return this._renderContent();
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
  }
};

export default BlogSubjects;
