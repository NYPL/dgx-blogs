import React from 'react';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="hero">
      	<img src={this.props.imageUrl} />
      </div>
    );
  }
}

export default Hero;