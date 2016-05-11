/*
 * BlogAuthorCard
 */
import React from 'react';
import { Link } from 'react-router';
import { LionLogoIcon } from 'dgx-svg-icons';
import axios from 'axios';

class BlogAuthorCard extends React.Component {
  constructor(props) {
    super(props);

    this._fetchAuthor = this._fetchAuthor.bind(this);
  }

  _fetchAuthor(author) {
    axios
      .get(`/api?author=${author}`)
      .then(response => {
        Actions.updateBlogs(response.data);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  _renderAuthorPicture() {

    // if (this.props.data.profileImgUrl) {
      return (
        <img
          className="blogAuthorCard-profilePicWrap-picture"
          src={this.props.data.profileImgUrl}
        /> 
      );
    // }

    // return (
    //   <LionLogoIcon 
    //     className="blogAuthorCard-profilePicWrap-picture" 
    //     fill="transparent" 
    //   />
    // );
  }

  _renderAuthorFullname() {
    if (this.props.data.fullName) {
      return (
        <p className="blogAuthorCard-name">{ this.props.data.fullName }</p>
      );
    }

    return null;
  }

  render() {

    /* if there is not author data nothing should be shown */
    if(! this.props.data) {
      return null;
    }

    return (
      <div className="blogAuthorCard">
        <div className="blogAuthorCard-profilePicWrap">
          { this._renderAuthorPicture() }
        </div>
        { this._renderAuthorFullname() }
        <p className="blogAuthorCard-title">{ this.props.data.profileText }</p>
        <Link
          to="author"
          params={{ author: this.props.data.slug }}
          className="authorLink"
          onClick={this._fetchAuthor.bind(this, this.props.data.slug)}
        >
          <b>View all posts by</b> {this.props.data.fullName}
        </Link>
      </div>
    );
  }
}

BlogAuthorCard.propTypes = {
  data: React.PropTypes.shape({
    fullName: React.PropTypes.string,
    title: React.PropTypes.string,
    slug: React.PropTypes.string,
  }),
  className: React.PropTypes.string,
};

export default BlogAuthorCard;
