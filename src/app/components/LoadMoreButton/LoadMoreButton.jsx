import React from 'react';
import axios from 'axios';
import Actions from '../../actions/Actions';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 2
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const newCount = this.state.currentPage + 1;

    this.setState({
      currentPage: newCount
    });

    /* build the url */
    let url = `/blog/api?page=${this.state.currentPage}&pageSize=${this.props.pageSize}&${this.props.filter}`;

    axios
      .get(url)
      .then(response => {
        console.log('LoadMoreButton calling to ', `/blog/api?page=${this.state.currentPage}&${this.props.filter}`);
        Actions.addMoreBlogs(response.data);
      })
      .then(response => {
        console.log('blogs added to the store');
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      });
  }

  svgDots() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="svgIcon blue">
        <title>circle.more.icon.v1</title>
        <circle cx="16" cy="16" r="1.9029" />
        <circle cx="24" cy="16" r="1.9029" />
        <circle cx="8" cy="16" r="1.9029" />
      </svg>
      );
  }

  render() {
    return (
      <div className="loadMoreButton">
        <button
          className="loadMoreButton-btn"
          onClick={this.handleClick}
        >
          {this.svgDots()}
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
};

export default LoadMoreButton;
