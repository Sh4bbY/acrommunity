import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import Vue from 'vue';
import {store} from '~/store';

export const api = axios.create({
  headers: {},
});

export class Api {
  static install(Vue) {
    async function requestHandler(config: AxiosRequestConfig) {
      await store.dispatch('app/startRequest');

      if (store.state.auth.accessToken) {
        config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`;
      }

      return config;
    }

    async function requestErrorHandler(err: AxiosError) {
      await store.dispatch('app/stopRequest');
      throw err;
    }

    async function responseHandler(res: AxiosResponse) {
      await store.dispatch('app/stopRequest');
      return res;
    }

    async function responseErrorHandler(err: AxiosError) {
      await store.dispatch('app/stopRequest');
      throw err;
    }

    api.interceptors.request.use(requestHandler, requestErrorHandler);
    api.interceptors.response.use(responseHandler, responseErrorHandler);

    Vue.prototype.$api = api;
  }
}

Vue.use(Api);
