import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'Note: 7d2d', // TODO: ref package.json
    appVersion: '0.1.0',
  },
});
