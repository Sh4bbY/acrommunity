import {Module} from 'vuex';
import {RootState} from '~/store';


export interface AppState {
  showNavigation: boolean,
  isLoading: boolean,
  openRequests: number,
}

export const appStore: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    showNavigation: true,
    isLoading: false,
    openRequests: 0,
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
    showError(context, error: any) {
      console.log('showError', error);
      console.log('this', this);
    },
  },
  getters: {},
};
