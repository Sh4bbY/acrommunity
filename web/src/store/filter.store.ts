import {BaseType} from '@acrommunity/common';
import {Module} from 'vuex';
import {RootState} from '~/store';

export interface FilterState {
  videos: {
    persons: number,
    bases: number,
    baseType: BaseType,
  },
  images: {
    persons: number,
    bases: number,
    baseType: BaseType,
  },
}

const videoFilterString = window.localStorage.getItem('filter.videos');
const videoFilter = videoFilterString ? JSON.parse(videoFilterString) : {};
const imageFilterString = window.localStorage.getItem('filter.images');
const imageFilter = imageFilterString ? JSON.parse(imageFilterString) : {};

export const filterStore: Module<FilterState, RootState> = {
  namespaced: true,
  state: {
    videos: {
      persons: videoFilter.persons || 2,
      bases: videoFilter.bases || 1,
      baseType: videoFilter.baseType || null,
    },
    images: {
      persons: imageFilter.persons || 2,
      bases: imageFilter.bases || 1,
      baseType: imageFilter.baseType || null,
    },
  },
  mutations: {
    updateVideosFilter(state, filter) {
      state.videos = filter;
      window.localStorage.setItem('filter.videos', JSON.stringify(filter));
    },
    updateImagesFilter(state, filter) {
      state.images = filter;
      window.localStorage.setItem('filter.images', JSON.stringify(filter));
    },
  },
  actions: {},
  getters: {},
};
