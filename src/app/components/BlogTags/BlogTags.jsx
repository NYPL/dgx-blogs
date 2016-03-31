import React from 'react';
import {Link} from 'react-router';

class BlogTags extends React.Component {
  constructor(props) {
    super(props);
  }

  _getList(tagsArray) {
    return tagsArray.map((tag, index) => {
      return (
        <li 
          key={index}>
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
    var tags = this._getList(this.props.data); 
    var link = '';

    var mainClass = this.props.renderAs;
    
    if(this.props.renderAs == 'sidebar') {
      link = (<Link 
          className="backToLink" 
          to="blogs">
          back to blogs
        </Link>);
    }

    return (
      <div className={mainClass}>
        {link}
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