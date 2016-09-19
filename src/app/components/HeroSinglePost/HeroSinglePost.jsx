import React from 'react';

class HeroSinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.renderCoverImage = this.renderCoverImage.bind(this);
  }

  componentDidMount() {
    // Thanks to http://stackoverflow.com/questions/3688460/stopping-gif-animation-programmatically
    if (this.refs.img) {
      const i = this.refs.img;
      const c = document.createElement('canvas');
      const w = c.width = i.width;
      const h = c.height = i.height;
      c.getContext('2d').drawImage(i, 0, 0, w, h);
      try {
        i.src = c.toDataURL('image/gif'); // if possible, retain all css aspects
      } catch (e) { // cross-domain -- mimic original with all its tag attributes
        for (let j = 0, a; a = i.attributes[j]; j++) {
          c.setAttribute(a.name, a.value);
        }
        i.parentNode.replaceChild(c, i);
      }
    }
  }

  renderCoverImage() {
    if (this.props.coverUrl) {
      return (
        <img ref="img" src={this.props.coverUrl} alt="" />
      );
    }

    return null;
  }

  render() {
    /* Change hero class depending if it has image*/
    const heroSinglePostClass = this.props.coverUrl ? 'heroSinglePost' : 'heroSinglePostNoImage';

    return (
      <header className={heroSinglePostClass}>
        <h1 className="heroSinglePost-title">
          Blogs <span className="nypl-icon-wedge-down"></span>
        </h1>
        {this.renderCoverImage()}
      </header>
    );
  }
}

HeroSinglePost.propTypes = {
  coverUrl: React.PropTypes.string,
};

export default HeroSinglePost;
