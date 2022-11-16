<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $tc('p.user', 2) }}</v-toolbar-title>
      </v-toolbar>

      <paginated-table url="/api/users" :headers="headers">
        <template #item.username="{item}">
          <router-link :to="{name: 'user-details', params: {id: item.id}}">{{ item.username }}</router-link>
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
import Moment from '~/components/moment.vue';
import PaginatedGrid from '~/components/paginated-grid.vue';
import PaginatedTable from '~/components/paginated-table.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import Page from '../../page.vue';

@Component({
  components: {PaginatedTable, PaginatedGrid, TooltipButton, ItemMenu, Moment},
})
export default class UsersPage extends Page {
  users = [];

  get title() {
    return this.$tc('p.user', 2);
  }

  get headers() {
    return [
      {text: this.$t('field.id'), value: 'id'},
      {text: this.$t('field.username'), value: 'username'},
      {text: this.$t('field.email'), value: 'email'},
      {text: this.$t('field.createdAt'), value: 'createdAt'},
    ];
  }
}
</script>

<style lang="scss" scoped>
</style>
