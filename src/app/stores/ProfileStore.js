import alt from 'dgx-alt-center';
import axios from 'axios';

import Actions from '../actions/Actions.js';
import appConfig from '../../../appConfig.js';

const { appBaseUrl } = appConfig;

class ProfileStore {
  constructor() {
    this.bindListeners({
      handleProfiles: Actions.HANDLE_PROFILES,
      loadProfiles: Actions.LOAD_PROFILES,
    });

    this.state = {
      profiles: [],
    };
  }

  loadProfiles() {
    axios
      .get(`${appBaseUrl}api/authors`)
      .then(response => {
        Actions.returnToReady();
        Actions.handleProfiles(response.data);
      })
      .catch(error => {
        console.log(`PROFILE-STORE: error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  handleProfiles(profiles) {
    this.setState({ profiles });
  }
}

ProfileStore.displayName = 'ProfileStore';

export default alt.createStore(ProfileStore);
