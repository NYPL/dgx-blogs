import React from 'react';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="hero">
        <h1 className="hero-title">Blogs</h1>
      	<img src={this.props.imageUrl} />
      </div>
    );
  }
}

export default Hero;