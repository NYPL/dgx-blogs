import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';
import axios from 'axios';

import appConfig from '../../../appConfig.js';
const { appBaseUrl, port } = appConfig;

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
      title: title,
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
