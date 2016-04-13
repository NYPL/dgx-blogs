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

  modelAuthor(author) {
    const tmpAuthor = this.emptyAuthor();
    tmpAuthor.name = author.attributes['full-name'];
    tmpAuthor.role = author.attributes.title;

    return tmpAuthor;
  }

  emptyBlog() {
    return {
      id: null,
      title: null,
      author: {},
      body: {
        short: null,
        full: null,
      },
      series: [],
      subjects: [],
      uri: null,
    };
  }

  /**
   * Uses ES6 Destructuring to extract author's headshot image.
   * @returns {object}
   */
  getHeadshotImage(array) {
    let result;
    if (!array || array.length === 0) {
      return null;
    }

    try {
      const [
        {
          headshot: {
            attributes: {
              uri: {
                ['full-uri']: profileImgUrl = '',
              },
            },
          },
        },
        ...rest
      ] = array;

      result = profileImgUrl;
    } catch (e) {
      result = undefined;
    }

    return result;
  }

  /**
   * Uses ES6 Destructuring to extract author's properties.
   * @returns {object}
   */
  getAuthor(array) {
    let result;
    if (!array || array.length === 0) {
      return undefined;
    }

    try {
      const [
        {
          author: {
            id: id = '',
            attributes: {
              ['display-name']: displayName = '',
              location: location = '',
              ['first-name']: firstName = '',
              ['last-name']: lastName = '',
              ['full-name']: fullName = '',
              unit: unit = '',
              title: title = '',
            },
          },
        },
        ...rest
      ] = array;

      result = {
        id,
        displayName,
        location,
        firstName,
        lastName,
        fullName,
        unit,
        title,
        profileImgUrl: this.getHeadshotImage(array),
      };
    } catch (e) {
      console.log(e);
      // result = null;
      result = undefined;
    }

    return result;
  }

  getSeries(array) {
    let result;
    if (!array || array.length === 0) {
      return null;
    }

    result = _.map(array, series => {
      let obj;
      try {
        const {
          id: id = '',
          attributes: {
            title: {
              en: {
                text: text = '',
              },
            },
            'rss-uri': {
              'full-uri': fullUri = '',
            },
          },
        } = series;

        obj = {
          title: text,
          fullUri,
          id,
        };
      } catch (e) {
        obj = undefined;
      }

      return obj;
    });

    return result;
  }

  getSubjects(array) {
    let result;
    if (!array || array.length === 0) {
      return [];
    }

    result = _.map(array, subject => {
      try {
        return {
          id: subject.id,
          name: subject.attributes.name.en.text,
        };
      } catch (e) {
        console.log(e);
      }
    });

    return result;
  }

  getSlug(uriObject) {
    const slug = uriObject['full-uri'].split('/blog/').pop();

    return slug;
  }

  convertDate(uriObject) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const dateStr = this.getSlug(uriObject).substring(0, 10);
    const date = new Date(dateStr);

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  modelBlog(b) {
    let newBlog = this.emptyBlog();
    newBlog.id = b.id;
    newBlog.title = b.attributes.title.en.text;

    newBlog.body.short = b.attributes.body.en['short-text'];
    newBlog.body.full = b.attributes.body.en['full-text'];

    newBlog.author = this.getAuthor(b['blog-profiles']);
    newBlog.series = this.getSeries(b['blog-series']);
    newBlog.subjects = this.getSubjects(b['blog-subjects']);
    newBlog.slug = this.getSlug(b.attributes.uri);

    /* @todo harcoded date for now, update when available from ref */
    newBlog.date = this.convertDate(b.attributes.uri);

    newBlog.mainPicture = b.attributes['featured-image'];

    /* @todo harcoded pictures for now update when availaber from refinery */
    newBlog.coverPicture = 'http://placekitten.com/1500/300';

    return newBlog;
  }
}

export default new BlogsModel;
