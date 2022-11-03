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
            <v-list-item-icon class="mr-5">
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('action.addToList') }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list dense>
          <v-list-item @click="createList">
            <v-list-item-title>{{ $t('action.createNewList') }}</v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list-item v-for="list in lists" :key="list.id" :disabled="isAlreadyListed(list)" @click="addToList(list)">
            <v-list-item-icon class="mr-3">
              <v-icon>{{ list.icon ? list.icon : 'mdi-view-list' }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ list.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider/>
      <v-list-item @click="toggleMark(MarkType.Favorite)">
        <v-list-item-icon class="mr-3">
          <v-icon color="red" small>{{ isMarked(MarkType.Favorite) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{
            isMarked(MarkType.Favorite) ? $t('action.removeFromItems', {items: $tc('p.favorite', 2)}) : $t('action.addToItems', {items: $tc('p.favorite', 2)})
          }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="toggleMark(MarkType.CanDo)">
        <v-list-item-icon class="mr-3">
          <v-icon small color="orange">{{ isMarked(MarkType.CanDo) ? 'mdi-arm-flex' : 'mdi-arm-flex-outline' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{
            isMarked(MarkType.CanDo) ? 'Kann ich nicht mehr' : 'Kann ich'
          }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="toggleMark(MarkType.WorkingOn)">
        <v-list-item-icon class="mr-3">
          <v-icon small color="grey">{{ isMarked(MarkType.WorkingOn) ? 'mdi-wrench' : 'mdi-wrench-outline' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{
            isMarked(MarkType.WorkingOn) ? 'Arbeite ich nicht mehr dran' : 'Arbeite ich dran'
          }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {getListables, ListableType, MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component({})
export default class ItemMenu extends Vue {
  @Prop({type: Boolean, default: false}) small: boolean;
  @Prop({required: true}) item: any;
  @Prop({type: String, required: true}) type: string;
  parentMenu = false;

  createList() {
    this.$emit('create-list');
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

  isMarked(type: MarkType) {
    return this.$store.state.user.marks.find(mark => mark.markableType === this.type && mark.markableId === this.item.id && mark.type === type);
  }

  async toggleMark(type: MarkType) {
    try {
      await this.$store.dispatch('user/toggleMark', {markableType: this.type, markableId: this.item.id, type});
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get MarkType() {
    return MarkType;
  }
}
</script>

<style lang="scss" scoped>
</style>
