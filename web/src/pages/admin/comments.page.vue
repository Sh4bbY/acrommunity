<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>

      <paginated-table url="/api/comments" :headers="headers" :options="{sortBy: ['createdAt']}">
        <template #item.authorId="{item}">
          <router-link :to="{name: 'user-details', params: {id: item.authorId}}">{{ item.author.username }}</router-link>
        </template>
        <template #item.text="{item}">
          <div class="text-container">
            <router-link :to="{name: 'comment-details', params: {id: item.id}}">
              <span v-html="item.text"/>
            </router-link>
          </div>
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
import Moment from '~/components/common/moment.vue';
import PaginatedGrid from '~/components/common/paginated-grid.vue';
import PaginatedTable from '~/components/common/paginated-table.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
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
      {text: this.$tc('field.author'), value: 'authorId'},
      {text: this.$tc('field.text'), value: 'text', sortable: false},
      {text: 'Commentable', value: 'commentable', sortable: false},
      {text: this.$tc('field.createdAt'), value: 'createdAt'},
    ];
  }
}
</script>

<style lang="scss" scoped>
.text-container {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 40px;
  max-width: 300px;

  ::v-deep br {
    content: ' ';

    &:after {
      content: ' ';
    }
  }
}
</style>
