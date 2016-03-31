import React from 'react';

class BlogSubjects extends React.Component {
  constructor(props) {
    super(props);
  }

  _getList(tagsArray) {
    return tagsArray.map((tag, index) => {
      return (<li key={index}>{tag.name}</li>);
    });
  }
  
  render() {
    const tags = this.props.data ? this._getList(this.props.data) : null;

    return (
      <div className="blogSubjects">
        <ul>
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
};

export default BlogSubjects;