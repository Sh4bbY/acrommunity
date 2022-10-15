<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field v-model="form.title" :label="$t('field.title')"/>
          <v-textarea v-model="form.description" :label="$t('field.description')" rows="3"/>

          <v-expansion-panels v-model="openPanels" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>{{ $t('label.when') }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="form.date" :label="$t('field.date')" append-outer-icon="mdi-calendar"/>
                    <div class="d-flex align-center">
                      <v-autocomplete v-model="form.startTime" :label="$t('field.startTime')" :items="times"/>
                      <span class="mx-3">-</span>
                      <v-autocomplete v-model="form.endTime" :label="$t('field.endTime')" :items="times"/>
                    </div>
                    <v-select v-model="form.recurringType" :items="recurringTypes"/>
                  </v-col>

                  <v-col cols="12" md="6" class="d-flex justify-center">
                    <v-date-picker v-model="form.date" :label="$t('field.date')" :min="today" elevation="2" :events="events"/>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>{{ $t('label.where') }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" md="8">
                    <div class="d-flex align-center">
                      <v-text-field v-model="form.location.input" :label="$t('field.location')"/>
                      <v-btn @click="findLocation" class="ml-2">Find Location</v-btn>
                    </div>
                    <v-btn @click="getCurrentLocation" class="ma-1">Get current Location</v-btn>
                    <leaflet-map :position="mapPosition" @click="form.location.address = $event.address"/>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-list dense>
                      <v-list-item v-for="(result, idx) in searchResults" @click="onSearchResultClick(result)" :key="idx">
                        <v-list-item-title>{{ result.display_name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="form.location.address" :label="$tc('p.address')"/>
                    <pre>{{ form.location.address }}</pre>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="submit">{{ $t('action.createItem', {item: $tc('p.jam')}) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import moment from 'moment';
import {Component} from 'vue-property-decorator';
import LeafletMap from '~/components/leaflet-map.vue';
import Page from '../page.vue';


export enum RECURRING_TYPE {
  ONCE = 'once',
  WEEKLY = 'weekly',
}

@Component({
  components: {LeafletMap},
})
export default class JamCreatePage extends Page {
  form = {
    title: '',
    description: '',
    date: new Date().toISOString().substring(0, 10),
    startTime: '18:00',
    endTime: '21:00',
    recurringType: RECURRING_TYPE.WEEKLY,
    location: {
      input: '',
      address: '',
    },
  };

  openPanels = [0, 1];
  times = [];
  searchResults = [];
  mapPosition = [51.5, 0];

  mounted() {
    this.setTimes();
  }

  setTimes() {
    const mins = ['00', '15', '30', '45'];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < mins.length; m++) {
        let time = `${h}:${mins[m]}`;
        this.times.push({text: time, value: time});
      }
    }
  }

  async submit() {
    try {
      const response = await this.$api.post('/api/jams', this.form);
      console.log(response.data);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async findLocation() {
    try {
      const response = await this.$api.get('/api/geolocation/search', {params: {q: this.form.location.input}});
      this.searchResults = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  onSearchResultClick(result) {
    this.mapPosition = [result.lat, result.lon];
    console.log(result.address);
    this.form.location.address = result.address;
  }

  async getCurrentLocation() {
    const pos: any = await new Promise(resolve => navigator.geolocation.getCurrentPosition(resolve));
    this.mapPosition = [pos.coords.latitude, pos.coords.longitude];
  }

  get recurringTypes() {
    return Object.values(RECURRING_TYPE).map(value => ({text: this.$t('recurringType.' + value), value}));
  }

  get today() {
    return new Date().toISOString().substring(0, 10);
  }

  events(date) {
    if (date < this.today) {
      return false;
    }
    if (this.form.recurringType === RECURRING_TYPE.WEEKLY && moment(date).day() === moment(this.form.date).day()) {
      return 'red';
    }
    return false;
  }

  get title() {
    return this.$t('action.createItem', {item: this.$tc('p.jam')});
  }
}
</script>
