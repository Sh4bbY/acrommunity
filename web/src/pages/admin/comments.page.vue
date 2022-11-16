<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>

      <paginated-table url="/api/comments" :headers="headers">
        <template #item.id="{item}">
          <router-link :to="{name: 'comment-details', params: {id: item.id}}">{{ item.id }}</router-link>
        </template>
        <template #item.authorId="{item}">
          <router-link :to="{name: 'user-details', params: {id: item.authorId}}">User {{ item.authorId }}</router-link>
        </template>
        <template #item.commentable="{item}">
          <router-link :to="{name: item.commentableType+'-details', params: {id: item.commentableId}}">{{ item.commentableType }} {{ item.commentableId }}</router-link>
        </template>
        <template #item.createdAt="{item}">
          <moment v-model="item.createdAt"/>
        </template>
      </paginated-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import ItemMenu from '~/components/item/item-menu.vue';
import Moment from '~/components/common/moment.vue';
import PaginatedGrid from '~/components/common/paginated-grid.vue';
import PaginatedTable from '~/components/common/paginated-table.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import Page from '../page.vue';

@Component({
  components: {PaginatedTable, PaginatedGrid, TooltipButton, ItemMenu, Moment},
})
export default class CommentsPage extends Page {
  get title() {
    return this.$tc('p.comment', 2);
  }

  get headers() {
    return [
      {text: this.$t('field.id'), value: 'id'},
      {text: this.$tc('field.author'), value: 'authorId'},
      {text: this.$tc('field.text'), value: 'text', sortable: false},
      {text: 'Commentable', value: 'commentable', sortable: false},
      {text: this.$tc('field.createdAt'), value: 'createdAt'},
    ];
  }
}
</script>

<style lang="scss" scoped>
</style>
