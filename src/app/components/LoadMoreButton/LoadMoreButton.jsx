import React from 'react';
import axios from 'axios';
import Actions from '../../actions/Actions';

/* svg */
import { DotsIcon } from 'dgx-svg-icons';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    console.log('LOADMOREBUTTON: going to page', this.props.currentPage);

    /* build the url */
    let url = `/blog/beta/api?page=${this.props.currentPage}&pageSize=${this.props.pageSize}&${this.props.filter}`;

    axios
      .get(url)
      .then(response => {
        Actions.addMoreBlogs(response.data);
      })
      .then(response => {
        console.log('blogs added to the store');
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      });
  }

  render() {
    return (
      <div className="loadMoreButton">
        <button
          className="loadMoreButton-btn"
          onClick={this.handleClick}
        >
          <DotsIcon ariaHidden />
          <span>{this.props.postsLeft}</span>
        </button>
      </div>
    );
  }
}

LoadMoreButton.defaultProps = {
  postsLeft: 'more',
  filter: 'blog=all',
  pageSize: 25,
  currentPage: 1
};

export default LoadMoreButton;
