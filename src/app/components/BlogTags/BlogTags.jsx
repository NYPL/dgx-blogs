import React from 'react';

class BlogTags extends React.Component {
  constructor(props) {
    super(props);
  }

  _getList(tagsArray) {
    return tagsArray.map((tag, index) => {
      return (
        <li key={index}>
          <a 
            className="tagLink"
            href="#">
            {tag.name}
          </a>
        </li>
        );
    });
  }
  
  render() {
    const tags = this._getList(this.props.data); 

    const mainClass = this.props.renderAs;

    return (
      <div className={mainClass}>
        <ul className={mainClass + "-list"}>
          {tags}
        </ul>
      </div>
    );
  }
}

BlogTags.propTypes = {
  data: React.PropTypes.array.isRequired
};

BlogTags.defaultProps = {
  data: [],
  renderAs: 'blogTagsSidebar'
};

export default BlogTags;