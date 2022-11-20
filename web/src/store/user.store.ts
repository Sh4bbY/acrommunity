import {getListables, IJam, IList, ListableType, MarkableType, MarkType} from '@acrommunity/common';
import {ActionContext, Module} from 'vuex';
import {api} from '~/plugins/api';
import {RootState} from '~/store';

export interface UserState {
  loaded: Promise<void>,
  marks: {
    id: number,
    type: MarkType,
    markableId: number,
    markableType: MarkableType,
    userId: string,
  }[],
  lists: {
    id: number,
    name: string,
    description: string,
    icon: string,
    poses: any[],
    flows: any[],
    skills: any[],
  }[],
  jams: IJam[],
}

let resolveStateLoaded = null;
export const userStore: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    loaded: new Promise((resolve) => resolveStateLoaded = resolve),
    lists: [],
    marks: [],
    jams: [],
  },
  mutations: {},
  actions: {
    async updateState(context: ActionContext<UserState, RootState>) {
      const response = await api.get('/api/my/state');
      context.state.lists = response.data.lists;
      context.state.marks = response.data.marks;
      context.state.jams = response.data.jams;
      resolveStateLoaded();
    },
    async toggleMark({state, dispatch}: ActionContext<UserState, RootState>, payload: { markableType: MarkableType, markableId: number, type: MarkType }) {
      if (state.marks.find(mark => mark.markableType === payload.markableType && mark.markableId === payload.markableId && mark.type === payload.type)) {
        return await dispatch('removeMark', payload);
      } else {
        return await dispatch('addMark', payload);
      }
    },
    async addMark(context: ActionContext<UserState, RootState>, payload: { markableType: MarkableType, markableId: number, type: MarkType }) {
      const response = await api.post(`/api/my/mark`, {
        markableType: payload.markableType,
        markableId: payload.markableId,
        type: payload.type,
      });
      const mark = response.data;
      context.state.marks.push(mark);
      return mark;
    },
    async removeMark(context: ActionContext<UserState, RootState>, payload: { markableType: MarkableType, markableId: number, type: MarkType }) {
      const response = await api.delete(`/api/my/mark/${payload.markableType}/${payload.markableId}/${payload.type}`);
      const mark = response.data;
      const idx = context.state.marks.findIndex(mark => mark.markableId === payload.markableId && mark.markableType === payload.markableType && mark.type === payload.type);
      context.state.marks.splice(idx, 1);
      return mark;
    },
    async removeFromList(context: ActionContext<UserState, RootState>, payload: { listId: number, listableType: ListableType, listableId: number }) {
      await api.delete(`/api/my/list/${payload.listId}/${payload.listableType}/${payload.listableId}`);
      const list = context.state.lists.find(l => l.id === payload.listId);
      const listables = getListables(list, payload.listableType);
      const idx = listables.findIndex(i => i.id === payload.listableId);
      listables.splice(idx, 1);
    },
    async addToList(context: ActionContext<UserState, RootState>, payload: { list: IList, listableType: ListableType, item: any }) {
      await api.put(`/api/my/list/${payload.list.id}/add`, {listableType: payload.listableType, listableId: payload.item.id});
      const list = context.state.lists.find(l => l.id === payload.list.id);
      const listables = getListables(list, payload.listableType);
      listables.push(payload.item);
      return payload.item;
    },
    async updateList(context: ActionContext<UserState, RootState>, payload: { list: IList, form: any }) {
      await api.put('/api/my/list/' + payload.list.id, payload.form);
      const list = context.state.lists.find(l => l.id === payload.list.id);
      Object.assign(list, payload.form);
      return list;
    },
    async deleteList(context: ActionContext<UserState, RootState>, list: IList) {
      await api.delete('/api/my/list/' + list.id);
      const idx = context.state.lists.findIndex(l => l.id === list.id);
      context.state.lists.splice(idx, 1);
      return list;
    },
    async createList(context: ActionContext<UserState, RootState>, form: any) {
      const response = await api.post('/api/my/list', form);
      const list = Object.assign({poses: [], flows: [], skills: []}, response.data);
      context.state.lists.push(list);
      return list;
    },
    async updateJam(context: ActionContext<UserState, RootState>, jam: IJam) {
      const storedJam = context.state.jams.find(j => j.id === jam.id);
      Object.assign(storedJam, jam);
      return storedJam;
    },
  },
  getters: {},
};
