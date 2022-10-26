<template>
  <v-menu offset-y bottom left v-model="parentMenu">
    <template #activator="{on}">
      <v-btn icon v-on="on" :small="small">
        <v-icon :small="small">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-menu left offset-x>
        <template #activator="{on}">
          <v-list-item v-on="on">
            <v-list-item-icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('action.addToList') }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list dense>
          <v-list-item @click="todo()">
            <v-list-item-title>{{ $t('action.createNewList') }}</v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list-item v-for="list in lists" :key="list.id" :disabled="isAlreadyListed(list)" @click="addToList(list)">
            <v-list-item-icon class="mr-3">
              <v-icon>{{ list.icon ? list.icon : 'mdi-view-list' }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ list.name }} {{ isAlreadyListed(list) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {getListables, ListableType} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import CreateListDialog from '~/components/my-lists/create-list-dialog.vue';

@Component({
  components: {CreateListDialog},
})
export default class ItemMenu extends Vue {
  @Prop({type: Boolean, default: false}) small: boolean;
  @Prop() item: any;
  @Prop({type: String}) type: string;
  parentMenu = false;

  todo() {
    this.$notify.info('Not yet implemented');
    this.parentMenu = false;
  }

  addToList(list) {
    this.$store.dispatch('user/addToList', {list, listableType: this.type, item: this.item});
    this.parentMenu = false;
  }

  isAlreadyListed(list): boolean {
    const listables = getListables(list, this.type as ListableType);
    const listable = listables.find(listable => listable.id === this.item.id);
    return !!listable;
  }

  get lists() {
    return this.$store.state.user.lists;
  }
}
</script>

<style lang="scss" scoped>
</style>
