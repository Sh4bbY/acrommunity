<template>
  <v-container>
    <jam-search class="mb-5"/>

    <!--    <v-card>-->
    <!--      <v-toolbar color="primary" dense dark>-->
    <!--        <v-toolbar-title>{{ $tc('p.jam', 2) }}</v-toolbar-title>-->
    <!--        <v-spacer/>-->
    <!--        <v-btn :to="{name: 'jam-create'}" icon small class="mr-1">-->
    <!--          <v-icon>mdi-plus</v-icon>-->
    <!--        </v-btn>-->
    <!--      </v-toolbar>-->

    <!--      <v-data-table :items="jams.rows" :headers="headers">-->
    <!--        <template #item.title="{item}">-->
    <!--          <router-link :to="{name: 'jam-details', params: {id: item.id}}">{{ item.title }}</router-link>-->
    <!--        </template>-->
    <!--        <template #item.startDate="{item}">-->
    <!--          <moment v-model="item.startDate"/>-->
    <!--        </template>-->
    <!--      </v-data-table>-->
    <!--    </v-card>-->
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Moment from '~/components/common/moment.vue';
import JamSearch from '~/components/jam-search.vue';
import Page from '../page.vue';

@Component({
  components: {Moment, JamSearch},
})
export default class JamsPage extends Page {
  jams = [];

  get title() {
    return this.$tc('p.jam', 2);
  }

  async mounted() {
    try {
      const response = await this.$api.get('/api/jams');
      this.jams = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get headers() {
    return [
      {text: this.$t('field.title'), value: 'title'},
      {text: this.$t('field.date'), value: 'startDate'},
    ];
  }
}
</script>
