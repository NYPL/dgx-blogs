import React from 'react';

class GenericHero extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCoverImageUrl() {

    if(this.props.coverImageUrl) { 
      return (
        <img src={this.props.coverImageUrl} alt="" />
      );
    }

    return null;
  }
  
  render() {

    return (
      <header className={`genericHero ${this.props.backgroundColorClass}`}>
        <h1 className="genericHero-title">{this.props.title} <span className="nypl-icon-wedge-down"></span></h1>
        {this._renderCoverImageUrl()}
      </header>
    );
  }
}

GenericHero.defaultProps = {
  coverImageUrl: null,
  title: null,
  backgroundColorClass: 'genericHero-default',
};

export default GenericHero;
