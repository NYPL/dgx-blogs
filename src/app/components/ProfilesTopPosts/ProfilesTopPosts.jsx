import React from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

import ProfileBlogLink from '../ProfileBlogLink/ProfileBlogLink';

class ProfilesTopPosts extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    /* show number of posts based on maxPostsShown prop */
    let posts = [];
    for (let i = 0; i < this.props.maxPostsShown && i < this.props.posts.length; i++) {

      console.log('PROFILES-TOP-POSTS: looping posts', this.props.posts[i]);

      posts.push((
        <li className="profilesTopPosts-item">
          <span className="profilesTopPosts-item-date">
            {this.props.posts[i].date}
          </span>
          <h3 className="profilesTopPosts-item-title">
            <ProfileBlogLink
              title={this.props.posts[i].title}
              url={this.props.posts[i].url}
            />
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
