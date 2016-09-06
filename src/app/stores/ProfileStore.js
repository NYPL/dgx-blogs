import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';
import axios from 'axios';

class ProfileStore {
  constructor() {
    this.bindListeners({
      handleProfiles: Actions.HANDLE_PROFILES,
      loadProfiles: Actions.LOAD_PROFILES,
    });

    this.state = {
      profiles: []
    };
  }

  loadProfiles() {
    axios
      .get(`http://localhost:3001/api/blogger-profiles`)
      .then(response => {
        console.log('PROFILE-STORE: ajax call result', response);

        Actions.handleProfiles(response.data);
      })
      .catch(error => {
        console.log(`PROFILE-STORE: error making ajax call: ${error}`);
      }); /* end Axios call */    
  }

  handleProfiles(profiles) {
    console.log('PROFILE-STORE: handleProfiles received profiles', profiles);
    this.setState({
      profiles: profiles,
    });
  }
}

ProfileStore.displayName = 'ProfileStore';

export default alt.createStore(ProfileStore);
