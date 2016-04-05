// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateBlogs(data) {
    this.dispatch(data);
  }
}

export default alt.createActions(Actions);
