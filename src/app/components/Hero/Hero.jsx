import React from 'react';

class Hero extends React.Component {
  renderPicture() {
    if (this.props.picture) {
      return (<img className="hero-content-picture" src={this.props.picture} alt="" />);
    }

    return null;
  }

  renderDescriptionText() {
    let descriptionText = this.props.description;
    if (this.props.description.length > 150) {
      descriptionText = this.props.description.substring(0, 150);
      /* trim again if we are in the middle of a word */
      descriptionText = descriptionText.substr(
        0,
        Math.min(descriptionText.length, descriptionText.lastIndexOf(' '))
      );
      descriptionText += ' ...';
    }

    return descriptionText;
  }

  render() {
    const alignClass = (this.props.picture) ? '' : 'no-picture';

    return (
      <header className="hero">
        <div className="hero-content">
          {this.renderPicture()}
          <div className={`hero-content-texts ${alignClass}`}>
            <p className="hero-content-texts-serie">{this.props.type}</p>
            <h1 className="hero-content-texts-title">
              {this.props.title} <span className="nypl-icon-wedge-down"></span>
            </h1>
            <p className="hero-content-texts-description">{this.renderDescriptionText()}</p>
            <p className="hero-content-texts-seriesCount">
              {this.props.postCount} {(this.props.postCount > 1) ? 'Posts' : 'Post'}
            </p>
          </div>
        </div>
      </header>
    );
  }
}

Hero.defaultProps = {
  picture: null,
  type: '',
  title: '',
  description: '',
  postCount: 0,
};

Hero.propTypes = {
  picture: React.PropTypes.string,
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  postCount: React.PropTypes.number,
};

export default Hero;
