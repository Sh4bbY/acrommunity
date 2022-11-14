import {Module} from 'vuex';
import {api} from '~/plugins/api';
import {RootState} from '~/store';


export interface AppState {
  title: string,
  showNavigation: boolean,
  isLoading: boolean,
  openRequests: number,
  poses: [],
}

export const appStore: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    title: 'Acrommunity',
    showNavigation: true,
    isLoading: false,
    openRequests: 0,
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
