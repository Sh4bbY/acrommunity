import {Module} from 'vuex';
import {api} from '~/plugins/api';
import {RootState} from '~/store';

export interface AppState {
  showNavigation: boolean,
  isLoading: boolean,
  openRequests: number,
  dialog: {
    login: boolean,
    register: boolean,
    feedback: boolean,
  },
  poses: [],
}

export const appStore: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    showNavigation: true,
    isLoading: false,
    openRequests: 0,
    dialog: {
      login: false,
      register: false,
      feedback: false,
    },
    poses: [],
  },
  mutations: {
    START_REQUEST: (state) => {
      state.openRequests++;
    },
    STOP_REQUEST: (state) => {
      state.openRequests--;
    },
    SET_NAVIGATION: (state, showNavigation) => {
      state.showNavigation = showNavigation;
    },
  },
  actions: {
    showFeedbackDialog({state}) {
      state.dialog.feedback = true;
    },
    login({state}) {
      state.dialog.login = true;
    },
    register({state}) {
      state.dialog.register = true;
    },
    startRequest({commit}) {
      commit('START_REQUEST');
    },
    stopRequest({commit}) {
      commit('STOP_REQUEST');
    },
    toggleNavigation({commit, state}) {
      commit('SET_NAVIGATION', !state.showNavigation);
    },
    setNavigation({commit}, isOpen: boolean) {
      commit('SET_NAVIGATION', isOpen);
    },
    async fetchPoses(context) {
      if (context.state.poses.length === 0) {
        const response = await api.get('/api/poses/options');
        context.state.poses = response.data.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
      }
    },
  },
  getters: {},
};
