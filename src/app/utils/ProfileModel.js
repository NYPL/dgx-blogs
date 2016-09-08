import { each as _each, isArray as _isArray, map as _map } from 'underscore';

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
    if (! data || ! (_isArray(data))) {
      console.log('PROFILE-MODEL: received data has not the proper format or is empty.');
      return null;
    }

    /**
     * Make sure the data is not empty.
     */
    if (data.length > 0) {

      /* parse the included for an easier reading */
      const parsedIncludedFields = this.parseIncluded(included);

      let completeList = _map(data, profile => {
        return this.modelProfile(profile, parsedIncludedFields);
      });

      let listByAlphabet = {};
      _each(completeList, function(modeledProfile) {

        if (! _isArray(listByAlphabet[modeledProfile.authorData.attributes['last-name'].charAt(0)])) {
          listByAlphabet[modeledProfile.authorData.attributes['last-name'].charAt(0)] = [];
        }

        console.log('PROFILE-MODEL: modeled profile when ordering', modeledProfile);

        listByAlphabet[modeledProfile.authorData.attributes['last-name'].charAt(0)].push(modeledProfile);
      });

      /* authors separated by letter, converting to array for sorting */
      let orderedArray = [];
      _each(listByAlphabet, function(arrayByLetter, index) {
        orderedArray.push({
          letter: index,
          authors: arrayByLetter,
        });

        /* sort arrays by letter by alphabet to show them in the right order */
        orderedArray.sort(function(a,b){ 
          let x = a.letter < b.letter ? -1:1; 
          return x; 
        });
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
    let authorId = profile.relationships.author.data.id;
    newProfile.authorData = parsedIncludedFields.authors[authorId];

    /* a new array with all the blog posts for this profile */
    newProfile.postsData = [];
    /* loop the author's blog posts and add them to a new array */
    _each(profile.relationships['blog-posts'].data, function(postMeta) {

      newProfile.postsData.push(parsedIncludedFields.blogs[postMeta.id]);
    });

    console.log('PROFILE-MODEL: modeling profile', newProfile);

    return newProfile;
  }

  destructureBlog(blog) {
    let result;
    if (! blog) {
      return null;
    }

    try {
      const {
        id: id = '',
        attributes: {
          title: {
            en: {
              text: title = '',
            },
          },
          ['date-created']: date = ''
        },
      } = blog;

      result = {
        title,
        date,
      };
    } catch (e) {
      console.log('PROFILE-MODEL: error destructuring blog', e)
      result = undefined;
    }

    return result;
  }  

  parseIncluded(included) {

    const _this = this;

    let parsedIncludedFields = {
      authors: {},
      blogs: {},
    };

    _each(included, function(includedField, i) {

      if (includedField.type === 'author') {
        parsedIncludedFields.authors[includedField.id] = includedField;
      }

      if (includedField.type === 'blog') {

        let destructuredBlog = _this.destructureBlog(includedField);
        destructuredBlog.date = _this.convertDate(destructuredBlog.date);

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
