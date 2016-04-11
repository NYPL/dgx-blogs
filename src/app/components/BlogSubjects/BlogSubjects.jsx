import React from 'react';

class BlogSubjects extends React.Component {
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
    const tags = this.props.data ? this._getList(this.props.data) : null;
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

BlogSubjects.propTypes = {
  data: React.PropTypes.array.isRequired
};

BlogSubjects.defaultProps = {
  data: [],
  renderAs: 'blogTagsSidebar'
};

export default BlogSubjects;