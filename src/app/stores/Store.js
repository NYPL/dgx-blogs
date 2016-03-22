import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class BlogStore {
  constructor() {
    this.bindListeners({

      updateAngularApps: Actions.UPDATE_ANGULAR_APPS,
      updateReactApps: Actions.UPDATE_REACT_APPS,
    });

    this.on('init', () => {
      this._angularApps = [];
      this._reactApps = [];
      this.blogs = [];
    });
  }

  updateAngularApps(data) {
    this._angularApps = data;
  }

  updateReactApps(data) {
    this._reactApps = data;
  }
}

export default alt.createStore(BlogStore, 'BlogStore');
