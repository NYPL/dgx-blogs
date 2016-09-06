import _ from 'underscore';

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
  build(data) {

    /**
     * Make sure there's an input.
     */
    if (! data || ! (_.isArray(data))) {
      console.log('PROFILE-MODEL: received data has not the proper format or is empty.');
      console.log('PROFILE-MODEL: typeof',typeof(data));
      return null;
    }

    /**
     * Make sure the data is not empty.
     */
    if (data.length > 0) {
      let completeList = _.map(data, profile => {
        return this.modelProfile(profile);
      });

      let listByAlphabet = {};
      _.each(completeList, function(modeledProfile) {

        /* @todo use first letter of last name instead of just first letter */

        if (! _.isArray(listByAlphabet[modeledProfile.id.charAt(0)])) {
          listByAlphabet[modeledProfile.id.charAt(0)] = [];
        }

        listByAlphabet[modeledProfile.id.charAt(0)].push(modeledProfile);
      });

      /* @todo order by alphabet here */

      return listByAlphabet;
    }

    return null;
  }  

  modelProfile(profile) {

    let newProfile = this.emptyProfile();
    newProfile.id = profile.id;
    newProfile.name = profile.id;
    newProfile.picture = null;
    newProfile.title = 'Harcoded title';
    newProfile.bio = profile.attributes['profile-text'].en.text;

    return newProfile;
  }
}

export default new ProfileModel;
