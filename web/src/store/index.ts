import Vue from 'vue';
import Vuex from 'vuex';
import {appStore} from '~/store/app.store';
import {authStore} from '~/store/auth.store';
import {filterStore} from '~/store/filter.store';
import {userStore} from '~/store/user.store';

Vue.use(Vuex);
export type RootState = any;

export const store = new Vuex.Store<RootState>({
  plugins: [],
  modules: {
    app: appStore,
    auth: authStore,
    user: userStore,
    filter: filterStore,
  },
  state: {},
  mutations: {},
  actions: {},
});
