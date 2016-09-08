import React from 'react';

class ProfilesTopPosts extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    /* show number of posts based on maxPostsShown prop */
    let posts = [];
    for (let i = 0; i < this.props.maxPostsShown && i < this.props.posts.length; i++) {

      posts.push((
        <li className="profilesTopPosts-item">
          <span className="profilesTopPosts-item-date">
            {this.props.posts[i].date}
          </span>
          <h3 className="profilesTopPosts-item-title">
            {this.props.posts[i].title}
          </h3>
        </li>
      ));
    }

    return (
      <ul className="profilesTopPosts">{posts}</ul>
    );
  }
}

ProfilesTopPosts.defaultProps = {
  maxPostsShown: 3,
}

export default ProfilesTopPosts;
