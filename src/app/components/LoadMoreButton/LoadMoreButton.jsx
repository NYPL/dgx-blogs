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

    Actions.switchToLoading('Blogs Home | NYPL');

    /* build the url */
    const url = `/blog/beta/api?page=${this.props.currentPage}` +
      `&pageSize=${this.props.pageSize}&${this.props.filter}`;

    axios
      .get(url)
      .then(response => {
        Actions.addMoreBlogs(response.data);
      })
      .then(response => {
        Actions.returnToReady();
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
          <DotsIcon
            height="48"
            width="48"
            ariaHidden />
          <span>load more</span>
        </button>
      </div>
    );
  }
}

LoadMoreButton.defaultProps = {
  filter: 'blog=all',
  pageSize: 25,
  currentPage: 1,
};

LoadMoreButton.propTypes = {
  filter: React.PropTypes.string,
  pageSize: React.PropTypes.number,
  currentPage: React.PropTypes.number,
};

export default LoadMoreButton;
