import {
  map as _map,
  isArray as _isArray,
  isEmpty as _isEmpty,
} from 'underscore';

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
    if (!data || !(_isArray(data))) {
      return null;
    }

    /**
     * Make sure the data is not empty.
     */
    if (data.length > 0) {
      return _map(data, b => this.modelBlog(b));
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
  getHeadshotImage(obj) {
    let result;
    if (!obj || _isEmpty(obj)) {
      return null;
    }

    try {
      const {
        headshot: {
          attributes: {
            uri: {
              ['full-uri']: profileImgUrl = '',
            },
          },
        },
      } = obj;

      result = profileImgUrl;
    } catch (e) {
      result = undefined;
    }

    return result;
  }

  /**
   * Uses ES6 Destructuring to extract author's headshot image.
   * @returns {object}
   */
  getText(obj) {
    let result;
    if (!obj || _isEmpty(obj)) {
      return null;
    }

    try {
      const {
        attributes: {
          ['profile-text']: {
            en: {
              text: profileText = '',
            },
          },
        },
      } = obj;

      result = profileText;
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

    const blogAuthor = array[0];

    try {
      const {
        id: id,
        attributes: {
          ['profile-slug']: slug = '',
        },
        author: {
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
      } = blogAuthor;

      result = {
        id,
        displayName,
        location,
        firstName,
        lastName,
        fullName,
        unit,
        title,
        profileImgUrl: this.getHeadshotImage(blogAuthor),
        slug,
        profileText: this.getText(blogAuthor),
      };
    } catch (e) {
      // console.log(e);
      // result = null;
      result = undefined;
    }

    return result;
  }

  getSeriesImg(series) {
    let result;
    if (!series || _isEmpty(series)) {
      return null;
    }

    try {
      const {
        image: {
          attributes: {
            width: width = 0,
            height: height = 0,
            uri: {
              'full-uri': url = '',
              description: description = '',
            },
          },
        },
      } = series;

      result = {
        description,
        width,
        height,
        url,
      };
    } catch (e) {
      result = undefined;
    }

    return result;
  }

  getRssFullUri(series) {
    try {
      const {
        attributes: {
            'rss-uri': {
            'full-uri': fullUri = '',
          },
        },
      } = series;

      return fullUri;
    } catch (e) {
      //console.log(e)
      return undefined;
    }
  }

  getSeries(array) {
    let result;
    if (!array || array.length === 0) {
      return null;
    }

    result = _map(array, series => {
      let obj;
      try {
        const {
          id: id = '',
          attributes: {
            title: {
              en: {
                text: title = '',
              },
            },
            body: {
              en: {
                'full-text': body = '',
              },
            },
            audience: audience = '',
            subjects: subjects = '',
          },
        } = series;

        obj = {
          image: this.getSeriesImg(series),
          fullUri: this.getRssFullUri(series),
          title,
          body,
          id,
        };
      } catch (e) {
        console.log(e);
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

    result = _map(array, subject => {
      try {
        return {
          id: subject.id,
          name: subject.attributes.name.en.text,
        };
      } catch (e) {
        return undefined;
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
    newBlog.date = this.convertDate(b.attributes.uri);
    newBlog.mainPicture = b.attributes['featured-image'] ? b.attributes['featured-image'] : {};

    return newBlog;
  }
}

export default new BlogsModel;
