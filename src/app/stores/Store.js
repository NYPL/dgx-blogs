import BookActions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class BlogStore {
  constructor() {
    this.bindListeners({
      //updateAngularApps: BookActions.UPDATE_ANGULAR_APPS,
      //updateReactApps: BookActions.UPDATE_REACT_APPS,
    });

    this.on('init', () => {
      this.sampleBlogs = {
        data: [
          {
            title: "Women's History Month: Celebrating Black Women in Jazz at the Schomburg",
            body: "This year, our series features performances from great artists such as Shelley Nicole, Mal Devisa, Alicia Hall Moran, Camille A. Brown, Bernice Reagon Johnson, and many others."
          },
          {
            title: "Feminist YA Fiction",
            body: "Novels that feature strong, female characters who either confront sexism, defy the patriarchal order, subvert gender expectations or celebrate female solidarity, or all of the above."
          }
        ]
      };
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
