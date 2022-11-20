<template>
  <v-card>
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <v-select v-model="form.distance" :items="distances" :label="$t('label.distance')" style="max-width: 200px" hide-details/>
        <div>
          <v-btn v-if="$store.state.auth.isSignedIn" :to="{name: 'jam-create'}" text class="mr-5">{{ $t('action.createItem', {item: $tc('p.jam')}) }}</v-btn>
          <v-btn color="primary" @click="submit">{{ $t('action.search') }}</v-btn>
        </div>
      </div>
    </v-card-text>
    <v-card-text v-if="results.length > 0">
      <v-data-table :items="results" :headers="headers" :hide-default-footer="results.length <= 10">
        <template #item.startDate="{item}">
          <moment v-model="item.startDate" format="DD.MM.YYYY - HH:mm" no-tooltip/>
          Uhr
          <span class="text-note">{{ getDuration(item) }}</span>
        </template>
        <template #item.title="{item}">
          <router-link :to="{name: 'jam-details', params: {id: item.id}}">{{ item.title }}</router-link>
        </template>
        <template #item.distance="{item}">{{ formatDistance(item.distance) }}</template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Moment from '~/components/common/moment.vue';

@Component({
  components: {Moment},
})
export default class JamSearch extends Vue {
  form = {
    distance: 10000,
    position: null,
  };
  results = [];

  async submit() {
    try {
      const geolocation: GeolocationPosition = await new Promise(resolve => navigator.geolocation.getCurrentPosition(resolve));
      this.form.position = [geolocation.coords.latitude, geolocation.coords.longitude];
      const response = await this.$api.get('/api/jams/search', {params: this.form});
      this.results = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get distances() {
    return [5, 10, 20, 50].map(km => ({text: `weniger als ${km} Km`, value: km * 1000}));
  }

  get headers() {
    return [
      {text: this.$t('field.title'), value: 'title'},
      {text: this.$t('label.start'), value: 'startDate'},
      {text: this.$t('label.distance'), value: 'distance', width: '120px', align: 'right'},
    ];
  }

  formatDistance(distance: number) {
    if (distance < 1000) {
      return Math.round(distance) + ' m';
    }
    return new Intl.NumberFormat('de-DE', {maximumFractionDigits: 2}).format(distance / 1000) + ' km';
  }

  getDuration(jam) {
    return moment.duration(moment(jam.startDate).diff(jam.endDate)).humanize();
  }
}
</script>
