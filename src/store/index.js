import Vue from 'vue';
import Vuex from 'vuex';

import ItemList from './itemlist';

const pkg = require('@/../package.json');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'Note: 7d2d',
    appVersion: pkg.version,
    target7d2dVersion: 'Alpha 19.1',
    itemList: new ItemList(),
  },
});
