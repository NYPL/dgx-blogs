import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import Actions from '../../actions/Actions';

class BackToBlogs extends React.Component {
  constructor(props) {
    super(props);
  }

 _fetchBlogList() {
    axios
      .get(`/api?blog=`)
      .then(response => {
        console.log('response', response.data);
        Actions.updateBlogs(response.data);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  render() {
    return(
      <Link 
        className="backToLink" 
        to="/blog"
        onClick={this._fetchBlogList.bind(this)}
      >
        <span className="nypl-icon-arrow-up"></span> back to blogs
      </Link>
    );
  }
}

export default BackToBlogs;