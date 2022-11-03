<template>
  <div>
    <update-list-dialog v-model="dialog.update.show" :list="dialog.update.list"/>
    <create-list-dialog v-model="dialog.create.show"/>

    <div class="d-flex align-bottom my-3">
      <h2 class="mb-4">{{ $tc('p.my', 2) }} {{ $tc('p.list', 2) }}:</h2>
      <v-spacer/>
      <v-btn color="primary" @click="dialog.create.show = true">{{ $t('action.createItem', {item: $tc('p.list')}) }}</v-btn>
    </div>

    <v-card v-if="lists.length === 0">
      <v-card-text>
        {{ $t('msg.noLists') }}
      </v-card-text>
    </v-card>
    <v-card v-for="list in lists" :key="'store-'+list.id" class="mb-5">
      <v-toolbar color="primary lighten-1" dark dense>
        <v-icon class="mr-2">{{ list.icon || 'mdi-view-list' }}</v-icon>
        <v-toolbar-title>{{ list.name }}</v-toolbar-title>
        <v-spacer/>
        <context-menu :items="menuItems" @delete="onDeleteList(list)" @settings="onListSettings(list)"/>
      </v-toolbar>

      <p v-if="list.description">{{ list.description }}</p>

      <v-card-text>
        <v-row>
          <v-col v-for="listable in getListables(list)" :key="listable.type" cols="12" md="4">
            <v-card>
              <v-card-title>
                <span>{{ $tc('p.' + listable.type, 2) }}</span>
                <v-spacer/>
              </v-card-title>
              <v-list dense>
                <v-hover v-for="item in listable.items" :key="'store-'+listable.type+item.id" v-slot="{ hover }">
                  <v-list-item dense>
                    <v-list-item-content>
                      <v-list-item-title>
                        <router-link :to="{name: listable.type + '-details', params: {id: item.id}}">{{ item.name }}</router-link>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action class="pa-0 ma-0" v-if="hover">
                      <tooltip-button icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.' + listable.type)})" small
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
import {ListableType} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import CreateListDialog from '~/components/my/create-list-dialog.vue';
import UpdateListDialog from '~/components/my/update-list-dialog.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import ContextMenu from '~/components/utils/context-menu.vue';

@Component({
  components: {ContextMenu, TooltipButton, UpdateListDialog, CreateListDialog},
})
export default class MyLists extends Vue {
  dialog = {
    update: {show: false, list: null},
    create: {show: false},
  };

  getListables(list) {
    return [
      {type: ListableType.Pose, items: list.poses},
      {type: ListableType.Flow, items: list.flows},
      {type: ListableType.Skill, items: list.skills},
    ].filter(listable => listable.items.length > 0);
  }

  get menuItems() {
    return [
      {text: this.$t('label.settings'), icon: 'mdi-cog', emit: 'settings'},
      {text: this.$t('action.delete'), icon: 'mdi-delete', emit: 'delete'},
    ];
  }

  onListSettings(list) {
    this.dialog.update = {show: true, list};
  }

  async removeItemFromList(item, list, listable) {
    try {
      const payload = {listId: list.id, listableType: listable.type, listableId: item.id};
      await this.$store.dispatch('user/removeFromList', payload);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async onDeleteList(list) {
    try {
      await this.$store.dispatch('user/deleteList', list);
      this.$notify.success(this.$t('notify.deleteItemSuccess', {item: list.name}));
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get lists() {
    return this.$store.state.user.lists;
  }
}
</script>

<style lang="scss" scoped>
</style>
