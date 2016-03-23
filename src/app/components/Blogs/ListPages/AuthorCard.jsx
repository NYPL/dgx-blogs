//AuthorCard
import React from 'react';

class AuthorCard extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();
    //this._getList = this._getList.bind(this);
  }
  
  render() {
    //TODO use a helper funtion like this._getList(this.state._angularApps);

    return (
      <div className="authorCard">
        <p>date here</p>
      	<img className="authorCard-profilePic" src="http://placehold.it/50x50" />
        <h4 className="authorCard-name">{this.props.data ? this.props.data[0].attributes['full-name'] : null}</h4>
        <p className="authorCard-title">{this.props.data ? this.props.data[0].attributes['title'] : null}</p>
      </div>
    );
  }

  // Helper functions below the render() function:
}

export default AuthorCard;