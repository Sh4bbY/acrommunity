<template>
  <div>
    <update-list-dialog v-model="dialog.update.show" :list="dialog.update.list" @success="onUpdateSuccess"/>
    <create-list-dialog v-model="dialog.create.show" @success="onCreateSuccess"/>
    <add-listable-dialog v-model="dialog.add.show" :list="dialog.add.list" @success="onAddListableSuccess"/>

    <div class="d-flex align-bottom my-3">
      <h2 class="mb-4">{{ $tc('p.my', 2) }} {{ $tc('p.list', 2) }}:</h2>
      <v-spacer/>
      <v-btn color="primary" @click="dialog.create.show = true">{{ $t('action.createItem', {item: $tc('p.list')}) }}</v-btn>
    </div>

    <v-card v-for="list in lists" :key="list.id" class="mb-5">
      <v-toolbar color="primary lighten-1" dark dense>
        <v-icon class="mr-2">{{ list.icon || 'mdi-view-list' }}</v-icon>
        <v-toolbar-title>{{ list.name }}</v-toolbar-title>
        <v-spacer/>
        <context-menu :items="menuItems" @delete="onDeleteList(list)" @settings="onListSettings(list)"/>
      </v-toolbar>

      <p v-if="list.description">{{ list.description }}</p>

      <v-card-text>
        <v-row>
          <v-col v-for="listable in getListables(list)" :key="listable.name" cols="12" md="4">
            <v-card>
              <v-card-title>
                <span>{{ $tc('p.' + listable.name, 2) }}</span>
                <v-spacer/>
                <tooltip-button icon="mdi-plus" :tooltip="$t('action.addItem', {item: $tc('p.' + listable.name)})" @click="dialog.add = {show: true, list}"/>
              </v-card-title>
              <v-list dense>
                <v-hover v-for="item in listable.items" :key="item.id" v-slot="{ hover }">
                  <v-list-item dense>
                    <v-list-item-content>
                      <v-list-item-title>
                        <router-link :to="{name: listable.name + '-details', params: {id: item.id}}">{{ item.name }}</router-link>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action class="pa-0 ma-0" v-if="hover">
                      <tooltip-button icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.' + listable.name)})" small
                                      @click="removeItemFromList(item, list, listable)"/>
                    </v-list-item-action>
                  </v-list-item>
                </v-hover>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AddListableDialog from '~/components/my-lists/add-listable-dialog.vue';
import CreateListDialog from '~/components/my-lists/create-list-dialog.vue';
import UpdateListDialog from '~/components/my-lists/update-list-dialog.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import ContextMenu from '~/components/utils/context-menu.vue';

@Component({
  components: {ContextMenu, TooltipButton, UpdateListDialog, CreateListDialog, AddListableDialog},
})
export default class MyLists extends Vue {
  lists = [];
  dialog = {
    update: {show: false, list: null},
    create: {show: false},
    add: {show: false, list: null},
  };

  async mounted() {
    try {
      const response = await this.$api.get('/api/my/lists');
      this.lists = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  getListables(list) {
    return [
      {name: 'pose', items: list.poses},
      {name: 'flow', items: list.flows},
      {name: 'skill', items: list.skills},
    ].filter(listable => listable.items.length > 0);
  }

  get menuItems() {
    return [
      {text: this.$t('label.settings'), icon: 'mdi-cog', emit: 'settings'},
      {text: this.$t('action.delete'), icon: 'mdi-delete', emit: 'delete'},
    ];
  }

  async onDeleteList(list) {
    try {
      await this.$api.delete(`/api/my/list/${list.id}`);
      const idx = this.lists.findIndex(l => l.id === list.id);
      this.lists.splice(idx, 1);
      this.$notify.success(this.$t('notify.deleteItemSuccess', {item: list.name}));
    } catch (e) {
      this.$notify.error(e);
    }
  }

  onListSettings(list) {
    this.dialog.update = {show: true, list};
  }

  onUpdateSuccess(list) {
    const oldList = this.lists.find(l => l.id === list.id);
    Object.assign(oldList, list);
  }

  onCreateSuccess(list) {
    this.lists.push(list);
  }

  onAddListableSuccess(listables) {
    console.log('TODO: handle added listables', listables);
    listables.forEach(listable => this.dialog.add.list.poses.push(listable));
  }

  async removeItemFromList(item, list, listable) {
    try {
      await this.$api.delete(`/api/my/list/${list.id}/${listable.name}/${item.id}`);
      const idx = listable.items.findIndex(i => i.id === item.id);
      listable.items.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
