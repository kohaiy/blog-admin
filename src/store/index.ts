import { createStore } from 'vuex';

export default createStore({
  state: {
    isSideClosed: false,
  },
  mutations: {
    toggleSideStatus(state) {
      state.isSideClosed = !state.isSideClosed;
    },
  },
  actions: {
  },
  modules: {
  },
});
