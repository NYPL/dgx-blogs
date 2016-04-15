/*
 * AuthorCard
 */
import React from 'react';
import { Link } from 'react-router';
import { LionLogoIcon } from 'dgx-svg-icons';

class AuthorCard extends React.Component {
  constructor(props) {
    super(props);
  }


  /*
   * Returns a different prop depending if authorcard is on footer or sidebar 
   */
  _determineAuthorText() {

    if (this.props.className === 'authorCard') {
      return this.props.data.title;
    }

    return this.props.data.profileText;
  }

  /*
   * Returns the link only if authorcard is on footer
   */
  _decideIfLink() {

    if (this.props.className === 'authorCardFooter') {
      return(
        <Link
          to="author"
          params={{ author: this.props.data.slug }}
          className="authorLink"
        >
          <b>View all posts by</b> {this.props.data.fullName}
        </Link>
      );
    }
  }

  _renderAuthorPicture() {

    if (this.props.data.profileImgUrl) {
      return (
        <img
          className={ `${this.props.className}-profilePicWrap-picture`}
          src={this.props.data.profileImgUrl}
        /> 
      );
    }

    return (
      <LionLogoIcon 
        className={ `${this.props.className}-profilePicWrap-picture`} 
        fill="transparent" 
      />
    );
  }

  render() {

    return (
      <div className={this.props.className}>
        <div className={ `${this.props.className}-profilePicWrap`}>
          { this._renderAuthorPicture() }
        </div>
        <h4 className={ `${this.props.className}-name` }>{ this.props.data.fullName }</h4>
        <p className={ `${this.props.className}-title` }>{ this._determineAuthorText() }</p>
        { this._decideIfLink() }
      </div>
    );
  }
}

AuthorCard.propTypes = {
  data: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
  }),
  className: React.PropTypes.string,
};

AuthorCard.defaultProps = {
  data: {
    title: '',
    fullName: '',
    slug: '',
  },
  className: 'authorCard',
};

export default AuthorCard;
