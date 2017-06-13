// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateBlogs(data) {
    return data;
  }

  addMoreBlogs(data) {
    return data;
  }

  updateBlogPost(data) {
    return data;
  }

  fromCache(cacheKey) {
    return cacheKey;
  }

  turnToLoadingState(data) {
    return data;
  }

  handleProfiles(data) {
    return data;
  }

  loadProfiles() {
    return;
  }

  /* Actions for app status */
  switchToLoading(title) {
    return title;
  }

  returnToReady() {
    return;
  }
}

export default alt.createActions(Actions);
