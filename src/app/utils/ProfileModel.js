import {
  each as _each,
  isArray as _isArray,
  map as _map,
} from 'underscore';

class ProfileModel {

  emptyProfile() {
    return {
      id: null,
    };
  }

  /**
   * build(data)
   * It is the initial function of Model class.
   * It gets the data from the Refinery, and returns an object in the end.
   * it returns null if the input is invalid.
   *
   * @param (Array) data
   */
  build(data, included) {
    /**
     * Make sure there's an input.
     */
    if (!data || !(_isArray(data))) {
      console.log('PROFILE-MODEL: received data has not the proper format or is empty.');
      return null;
    }

    /**
     * Make sure the data is not empty.
     */
    if (data.length > 0) {
      /* parse the included for an easier reading */
      const parsedIncludedFields = this.parseIncluded(included);
      const completeList = _map(data, profile => this.modelProfile(profile, parsedIncludedFields));

      const listByAlphabet = {};
      _each(completeList, (modeledProfile) => {
        const firstCharLastName = modeledProfile.authorData.attributes['last-name'].charAt(0);

        if (!_isArray(listByAlphabet[firstCharLastName])) {
          listByAlphabet[firstCharLastName] = [];
        }

        listByAlphabet[firstCharLastName].push(modeledProfile);
      });

      /* authors separated by letter, converting to array for sorting */
      let orderedArray = [];
      _each(listByAlphabet, (arrayByLetter, index) => {
        orderedArray.push({
          letter: index,
          authors: arrayByLetter,
        });

        /* sort arrays by letter by alphabet to show them in the right order */
        orderedArray.sort((a, b) => (a.letter < b.letter ? -1 : 1));
      });

      return orderedArray;
    }

    return null;
  }

  /**
   * Model each one of the profiles.
   */
  modelProfile(profile, parsedIncludedFields) {
    let newProfile = this.emptyProfile();
    newProfile.id = profile.id;
    newProfile.name = profile.id;
    newProfile.picture = null;
    newProfile.title = 'Harcoded title';
    newProfile.bio = profile.attributes['profile-text'].en.text;

    /* get the author id and get it from included fields */
    const authorId = profile.relationships.author.data.id;
    newProfile.authorData = parsedIncludedFields.authors[authorId];

    /* a new array with all the blog posts for this profile */
    newProfile.postsData = [];
    /* loop the author's blog posts and add them to a new array */
    _each(profile.relationships['blog-posts'].data, (postMeta) => {
      newProfile.postsData.push(parsedIncludedFields.blogs[postMeta.id]);
    });

    return newProfile;
  }

  destructureBlog(blog) {
    let result;
    if (! blog) {
      return null;
    }

    try {
      const {
        attributes: {
          title: {
            en: {
              text: title = '',
            },
          },
          ['date-created']: date = '',
          alias: url = '',
        },
      } = blog;

      result = {
        url,
        title,
        date,
      };

      /* remove the /blog/ part on the alias because it fails when /blog/beta is used */
      result.url = result.url.replace('blog/', '');

      /* generate a slug to build the links */
      let splittedAlias = result.url.split('/');
      result.id = splittedAlias.pop();
    } catch (e) {
      console.log('PROFILE-MODEL: error destructuring blog', e);
      result = undefined;
    }

    return result;
  }

  parseIncluded(included) {
    let parsedIncludedFields = {
      authors: {},
      blogs: {},
    };

    _each(included, (includedField) => {
      if (includedField.type === 'author') {
        parsedIncludedFields.authors[includedField.id] = includedField;
      }

      if (includedField.type === 'blog') {
        let destructuredBlog = this.destructureBlog(includedField);
        destructuredBlog.date = this.convertDate(destructuredBlog.date);

        parsedIncludedFields.blogs[includedField.id] = destructuredBlog;
      }
    });

    return parsedIncludedFields;
  }

  convertDate(dateStr) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateStr);

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
}

export default new ProfileModel;
