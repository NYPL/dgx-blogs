import React from 'react';

class BlogTags extends React.Component {
  constructor(props) {
    super(props);
  }

  _getList(tagsArray) {
    return tagsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  }
  
  render() {
    var tags = this._getList(['dummy tag one', 'dummy tag two']); //TODO replace this by real tags later

    return (
      <div className="blogTags">
        <ul>
          {tags}
        </ul>
      </div>
    );
  }
}

export default BlogTags;