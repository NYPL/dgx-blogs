import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class BlogStore {
  constructor() {
    this.bindListeners({

      //updateAngularApps: Actions.UPDATE_ANGULAR_APPS
    });

    this.on('init', () => {
      this.blogs = [];
    });
  }
}

export default alt.createStore(BlogStore, 'BlogStore');
