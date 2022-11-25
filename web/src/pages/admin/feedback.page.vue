<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>

      <paginated-table url="/api/feedback" :headers="headers" :options="{sortBy: ['createdAt']}">
        <template #item.authorId="{item}">
          <router-link :to="{name: 'user-details', params: {id: item.authorId}}">{{ item.author.username }}</router-link>
        </template>
        <template #item.title="{item}">
          <router-link :to="{name: 'feedback-details', params: {id: item.id}}">User {{ item.title }}</router-link>
        </template>
        <template #item.text="{item}">
          <div v-html="item.text" class="text-container"/>
        </template>
        <template #item.status="{item}">
          <span>{{ $t('feedbackStatus.' + item.status) }}</span>
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
import PaginatedTable from '~/components/common/paginated-table.vue';
import Page from '../page.vue';

@Component({
  components: {PaginatedTable, Moment},
})
export default class FeedbackPage extends Page {
  get title() {
    return this.$t('label.feedback');
  }

  get headers() {
    return [
      {text: this.$tc('field.author'), value: 'authorId'},
      {text: this.$tc('field.title'), value: 'title'},
      {text: this.$tc('field.text'), value: 'text', sortable: false},
      {text: this.$tc('field.status'), value: 'status'},
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

  ::v-deep p {
    margin-bottom: 0;
  }

  ::v-deep br {
    content: ' ';

    &:after {
      content: ' ';
    }
  }
}
</style>
