//BlogTags common component used in listpages and blogpage
import React from 'react';

class BlogTags extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();
    //this._getList = this._getList.bind(this);
  }
  
  render() {
    var tags = this._getList(this.props.data.tags);

    return (
      <div>
        <ul>
          {tags}
        </ul>
      </div>
    );
  }

  // Helper functions below the render() function:
  _getList(tagsArray) {
    return tagsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  }
}

export default BlogTags;