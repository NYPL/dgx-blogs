import React from 'react';

import { map as _map } from 'underscore';

import Store from '../../stores/Store.js';

import HeroSinglePost from '../HeroSinglePost/HeroSinglePost';
import Hero from '../Hero/Hero';
import BlogRow from '../BlogRow/BlogRow';

import {
  isEmpty as _isEmpty,
  keys as _keys,
  findWhere as _findWhere,
} from 'underscore';

class BlogsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Store.listen(this._onChange);
  }

  componentWillUnmount() {
    Store.unlisten(this._onChange);
  }

  _onChange() {
    this.setState(Store.getState());
  }

  _getList(blogsList) {
    return _map(blogsList, (blogRow, index) => {
      return <BlogRow data={blogRow} key={index} />;
    });
  }

  render() {
    const blogs = this._getList(this.state.blogs);

    let pageType;
    let param;
    let series;
    let subjects;
    let author;
    let hero = <HeroSinglePost />;

    if (! _isEmpty(this.props.params)) {
      pageType = _keys(this.props.params)[0];
      param = this.props.params[pageType];

      if (pageType === 'author') {
        author = this.state.blogs[0][pageType];
        hero = (<Hero
          type="author"
          title={author.fullName}
          description={author.title}
          picture={author.profileImgUrl}
          postCount={this.state.blogs.length}
        />);
      } else if (pageType === 'series') {
        series = _findWhere(this.state.blogs[0][pageType], { id: param });
        /* @todo is it right to striptag the body? */
        hero = (<Hero
          type="Blog Series"
          title={series.title}
          description={series.body.replace(/(<([^>]+)>)/ig, '')}
          picture={series.image.url}
          postCount={this.state.blogs.length}
        />);
      } else if (pageType === 'subjects') {
        subjects = _findWhere(this.state.blogs[0][pageType], { id: param });
        hero = (<Hero
          type="Blog Subject"
          title={subjects.name}
          postCount={this.state.blogs.length}
        />);
      }
    }

    return (
      <div className="blogsWrapper">
        {hero}
        <div className="content">
          <div className="sidebar">
            <h3 className="sidebar-title">Blog</h3>
            <a href="#" className="sidebar-link">Blogger Profiles</a>
            <a href="#" className="sidebar-link">Blog Topics</a>
          </div>
          <ul className="blogsList">
            {blogs}
          </ul>
        </div>
      </div>
    );
  }
}

export default BlogsWrapper;
