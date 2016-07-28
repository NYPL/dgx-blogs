import React from 'react';

import Store from '../../stores/Store.js';

import HeroSinglePost from '../HeroSinglePost/HeroSinglePost';
import Hero from '../Hero/Hero';
import BlogRow from '../BlogRow/BlogRow';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

import {
  map as _map,
  isEmpty as _isEmpty,
  keys as _keys,
  findWhere as _findWhere,
} from 'underscore';

class BlogsWrapper extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState().toJS();
    this.state = Store.getState();
    console.log('BLOGSWRAPPER: state gotten in constructor:', this.state);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Store.listen(this._onChange);

    // if (this.state.get('blogs').isEmpty()) {
    //   this.context.router.push('/blog/not-found');
    //   return;
    // }
  }

  componentWillUnmount() {
    Store.unlisten(this._onChange);
  }

  _onChange() {
    //this.setState(Store.getState().toJS());
    this.setState(Store.getState());
  }

  _getList(blogsList) {
    return _map(blogsList, (blogRow, index) => {
      return <BlogRow data={blogRow} key={index} />;
    });
  }

  renderLoadMoreButton(currentState, filter) {
    const postsLeft = currentState.meta.count - currentState.blogList.length;

    if (postsLeft <= 0) {
      return null;
    } else {

      return (
        <LoadMoreButton
          postsLeft={postsLeft}
          filter={filter}
        />
      );
    }

  }

  render() {
    console.log('BLOGSWRAPPER: blogs state before render', this.state);
    const currentState = this.state.blogs;
    const blogs = this._getList(currentState.blogList);
    console.log('BLOGSWRAPPER: currentState meta', currentState.meta);

    let pageType;
    let param;
    let series;
    let subjects;
    let author;
    let hero = <HeroSinglePost />;

    /* default filter to get the content through ajax */
    let filter = 'blog=all';

    if (! _isEmpty(this.props.params)) {
      pageType = _keys(this.props.params)[0];
      param = this.props.params[pageType];

      if (pageType === 'author') {

        author = currentState.blogList[0][pageType];

        hero = (<Hero
          type="author"
          title={author.fullName}
          description={author.title}
          picture={author.profileImgUrl}
          postCount={currentState.meta.count}
        />);
        console.log('BLOGSWRAPPER: author data', author);

        /* set filter to get ajax content only for an author */
        filter = `author=${author.id}`;

      } else if (pageType === 'series') {
        series = _findWhere(currentState.blogList[0][pageType], { id: param });
        /* @todo is it right to striptag the body? */
        hero = (<Hero
          type="Blog Series"
          title={series.title}
          description={series.body.replace(/(<([^>]+)>)/ig, '')}
          picture={series.image.url}
          postCount={currentState.meta.count}
        />);

        /* set filter to get ajax content only for a series */
        filter = `series=${series.id}`;

      } else if (pageType === 'subjects') {

        subjects = _findWhere(currentState.blogList[0][pageType], { id: param });
        hero = (<Hero
          type="Blog Subject"
          title={subjects.name}
          postCount={currentState.meta.count}
        />);

        /* set filter to get ajax content only for a subject */
        filter = `subject=${subjects.id}`;
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
            {this.renderLoadMoreButton(currentState, filter)}
          </ul>
        </div>
      </div>
    );
  }
}

BlogsWrapper.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BlogsWrapper;
