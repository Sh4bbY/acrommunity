<template>
  <v-container>
    <v-card>
      <v-toolbar dark dense color="primary">
        <v-toolbar-title>
          {{ $t('label.myJams') }}
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn text :to="{name: 'jam-create'}">{{ $t('action.createItem', {item: $tc('p.jam')}) }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-data-table :items="$store.state.user.jams" :headers="headers">
        <template #item.title="{item}">
          <router-link :to="{name: 'jam-details', params: {id: item.id}}">{{ item.title }}</router-link>
        </template>
        <template #item.startDate="{item}">
          <moment v-model="item.startDate"/>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Moment from '~/components/common/moment.vue';
import Page from '../page.vue';

@Component({
  components: {Moment},
})
export default class MyJamsPage extends Page {
  get title() {
    return this.$t('label.myJams');
  }

  get headers() {
    return [
      {text: this.$t('field.title'), value: 'title'},
      {text: this.$tc('p.address'), value: 'address'},
      {text: this.$tc('label.when'), value: 'startDate'},
    ];
  }
}
</script>
