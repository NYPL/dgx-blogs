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

  emptyBlog() {

    return {
      id: null,
      title: null,
      author: {},
      body: {
        short: null,
        full: null
      },
      series: [],
      subjects: [],
    }
  }

  /**
   * Uses ES6 Destructuring to extract author's properties.
   * @returns {object}
   */
  getAuthor(obj) {
    let result;
    if (!obj && _.isEmpty(obj)) {
      return null;
    }

    try {
      const {
        ['blog-profiles']: [
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
              }
            },
            headshot: {
              attributes: {
                uri: {
                  ['full-uri']: profileImgUrl = '',
                },
              },
            },
          },
          ...rest
        ]
      } = obj;

      result = {
        id,
        displayName,
        location,
        firstName,
        lastName,
        fullName,
        unit,
        profileImgUrl,
      };
    }  catch (e) {
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
            }
          }
        } = series;

        obj = {
          title: text,
          fullUri,
          id,
        };
      }  catch (e) {
        obj = undefined;
      }

      return obj;
    });

    return result;
  }

  getSubjects(array) {
    let result;
    if (!array || array.length === 0) {
      return null;
    }

    result = _.map(array, subject => {
      return {
        id: subject.id,
        name: subject.attributes.name,
      };
    });

    return result;
  }

  modelBlog(b) {
    let newBlog = this.emptyBlog();
    newBlog.id = b.id;
    newBlog.title = b.attributes.title.en.text;

    newBlog.body.short = b.attributes.body.en['short-text'];
    newBlog.body.full = b.attributes.body.en['full-text'];

    newBlog.author = this.getAuthor(b);
    newBlog.series = this.getSeries(b['blog-series']);
    newBlog.subjects = this.getSubjects(b['blog-subjects']);

    return newBlog;
  }
}

export default new BlogsModel;
