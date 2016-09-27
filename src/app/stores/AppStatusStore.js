import alt from 'dgx-alt-center';
import Actions from '../actions/Actions.js';

class AppStatusStore {
  constructor() {
    this.bindListeners({
      switchToLoading: Actions.SWITCH_TO_LOADING,
      returnToReady: Actions.RETURN_TO_READY,
    });

    this.state = {
      status: 'ready',
      title: '',
    };
  }

  switchToLoading(title) {
    this.setState({
      status: 'loading',
      title,
    });
  }

  returnToReady() {
    this.setState({
      status: 'ready',
      title: '',
    });
  }
}

AppStatusStore.displayName = 'AppStatusStore';

export default alt.createStore(AppStatusStore);
