import React from 'react';
import {Link} from 'react-router';

import Store from '../../stores/Store.js';

//blog components
import Hero from '../Hero/Hero';
import BlogTags from '../BlogTags/BlogTags';
import Blog from '../Blog/Blog';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    //this.state = Store.getState();

   /*
    * @todo make this dynamic
    */
    this.state = {
      title: "Blog Sample title.",
      body: "We asked thirty staff members to select and read ninety seconds of their favorite Shakespeare speech, monologue, or sonnet. We will release one each day throughout the month of April.",
      imageUrl: "http://placehold.it/1513x406/",
      author: {
        name: "Andrea Lipinsky",
        role: "Senior Young Adult Librarian"
      },
      tags: [
        {id: 123456, name: 'Educators'},
        {id: 123457, name: 'Children\'s books'},
        {id: 123458, name: 'Toddlers'}
      ]
    };
  }
  
  render() {
    const blogName = this.props.params.blogId;

    return (
      <div className='blogPage'>
        <Hero imageUrl={this.state.imageUrl}/>
        <Link 
          className="backToLink" 
          to="blogs">
          back to blogs
        </Link>
        <BlogTags data={this.state.tags}/>
        <Blog 
          title={this.state.title} 
          body={this.state.body} 
          author={this.state.author}/>
      </div>
    );
  }
}

export default BlogPage;