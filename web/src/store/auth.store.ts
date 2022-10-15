import {Module} from 'vuex';
import {api} from '~/plugins/api';
import {RootState} from '~/store/index';

export interface AuthState {
  isAuthPending: boolean,
  isAuthenticated: boolean,
  accessToken: string,
  refreshTimeoutId: number,
  // user?: User,
  user?: any,
}


export const authStore: Module<AuthState, RootState> = {
  namespaced: true,
  state: {
    isAuthPending: true,
    isAuthenticated: false,
    accessToken: null,
    refreshTimeoutId: null,
    user: null,
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
      state.isAuthPending = false;
    },
    updateUserProfile(state, profile) {
      Object.keys(profile).forEach(key => state.user[key] = profile[key]);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
    setAuthPending(state, isPending) {
      state.isAuthPending = isPending;
    },
  },
  actions: {
    async login({commit, dispatch}, credentials) {
      const {data} = await api.post('/api/auth/login', credentials);
      commit('setAccessToken', data.token);
      commit('setUser', data.user);
      dispatch('renewToken', data.token);
    },
    async loginByToken({commit, dispatch}) {
      try {
        const {data} = await api.post('/api/auth/refresh');
        commit('setAccessToken', data.token);
        commit('setUser', data.user);
        dispatch('renewToken', data.token);
      } catch (err) {
        commit('setAuthPending', false);
      }
    },
    async logout(context) {
      clearTimeout(context.state.refreshTimeoutId);
      await api.get('/api/auth/logout');
      context.commit('logout');
    },
    async refreshToken({commit, dispatch}) {
      const {data} = await api.post('/api/auth/refresh');
      commit('setAccessToken', data.token);
      dispatch('renewToken', data.token);
    },
    renewToken(context, token) {
      const payloadString = token.split('.')[1];
      const payload = JSON.parse(atob(payloadString));
      const expiresIn = payload.exp * 1000 - Date.now();
      const secondsBeforeExpiration = 30;
      const timeout = expiresIn - (secondsBeforeExpiration * 1000);

      if (timeout < 0) {
        console.warn('Server Time may be invalid!');
        return;
      }

      // request fresh access-token 30s before its expiration
      context.state.refreshTimeoutId = window.setTimeout(() => context.dispatch('refreshToken'), timeout);
    },
  },
  getters: {},
};
