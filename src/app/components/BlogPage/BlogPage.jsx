import React from 'react';

import Store from '../../stores/Store.js';

//blog components
import Hero from '../Hero/Hero';
import BlogTags from '../BlogTags/BlogTags';
import Blog from '../Blog/Blog';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }
  
  render() {
    const blogName = this.props.params.blogId;

   /*
    * @todo make this dynamic
    */
    this.state.title = "Blog Sample title.";
    this.state.body = "We asked thirty staff members to select and read ninety seconds of their favorite Shakespeare speech, monologue, or sonnet. We will release one each day throughout the month of April.";
    this.state.imageUrl = "http://placehold.it/1513x406/";
    this.state.author = {
      name: "Andrea Lipinsky",
      role: "Senior Young Adult Librarian"
    };
    this.state.tags = [
      {id: 123456, name: 'Educators'},
      {id: 123457, name: 'Children\'s books'},
      {id: 123458, name: 'Toddlers'}
    ];

    return (
      <div className='blogPage'>
        <Hero 
          imageUrl={this.state.imageUrl}/>
        <BlogTags 
          data={this.state.tags}/>
        <Blog 
          title={this.state.title} 
          body={this.state.body} 
          author={this.state.author}/>
      </div>
    );
  }
}

export default BlogPage;