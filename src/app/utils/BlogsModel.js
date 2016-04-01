import _ from 'underscore';

class BlogsModel {

  /**
   * build(data)
   * It is the initial function of Model class.
   * It gets the data from the Refinery, and returns an object in the end.
   * it returns null if the input is invalid.
   *
   * @param (Array) data
   */
  build(data) {
    /**
     * Make sure there's an input.
     */
    if (!data || !(_.isArray(data))) {
      return null;
    }

    /**
     * Make sure the data is not empty.
     */
    if (data.length > 0) {

      return _.map(data, b => {
        return this.modelBlog(b);
      });
    }

    return null;
  }

  emptyAuthor() {

    return {
      name: '',
      role: ''
    }
  }

  modelAuthor(author) {
    let tmpAuthor = this.emptyAuthor();
    tmpAuthor.name = author.attributes['full-name'];
    tmpAuthor.role = author.attributes.title;

    return tmpAuthor;
  }

  extractAuthors(authors) {

    if (!authors || !(_.isArray(authors))) {
      return [this.emptyAuthor()];
    }

    /**
     * If authors is an array
     */
    if (authors.length > 0) {

      return _.map(authors, b => {
        return this.modelAuthor(b);
      });
    }

    return [this.emptyAuthor()];
  }

  emptyBlog() {

    return {
      id: null,
      title: null,
      authors: [],
      body: {
        short: null,
        full: null
      },
      tags: []
    }
  }

  modelBlog(b) {

    let newBlog = this.emptyBlog();
    newBlog.id = b.id;
    newBlog.title = b.attributes.title.en.text;

  /**
    * @todo fetch real authors
    */
    newBlog.authors = this.extractAuthors(b.authors);

    newBlog.body.short = b.attributes.body.en["short-text"];
    newBlog.body.full = b.attributes.body.en["full-text"];

  /**
    * @todo fetch real tags
    */
    newBlog.tags = [
      {id: 123456, name: 'Educators'},
      {id: 123457, name: 'Children\'s books'},
      {id: 123458, name: 'Toddlers'}
    ];

    return newBlog;
  }
}

export default new BlogsModel;
