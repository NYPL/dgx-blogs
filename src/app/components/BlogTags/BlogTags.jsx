import React from 'react';

class BlogTags extends React.Component {
  constructor(props) {
    super(props);
  }

  _getList(tagsArray) {
    return tagsArray.map((tag, index) => {
      return (<li key={index}>{tag.name}</li>);
    });
  }
  
  render() {
    var tags = this._getList(this.props.data); 

    return (
      <div className="blogTags">
        <ul>
          {tags}
        </ul>
      </div>
    );
  }
}

BlogTags.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default BlogTags;