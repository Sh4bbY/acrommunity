<template>
  <v-container v-if="jam">
    <v-form>
      <v-text-field v-model="form.title" :label="$t('field.title')"/>
      <v-expansion-panels v-model="openPanels" multiple accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h4>{{ $t('label.when') }}</h4>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.date" :label="$t('field.date')" append-outer-icon="mdi-calendar"/>
                <div class="d-flex align-center">
                  <v-autocomplete v-model="form.startTime" :label="$t('field.startTime')" :items="times"/>
                  <span class="mx-3">-</span>
                  <v-autocomplete v-model="form.endTime" :label="$t('field.endTime')" :items="times"/>
                </div>
                <v-select v-model="form.recursionType" :items="recursionTypes"/>
              </v-col>

              <v-col cols="12" md="6" class="d-flex justify-center">
                <v-date-picker v-model="form.date" :label="$t('field.date')" :min="today" elevation="2" :events="events"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <h4>{{ $t('label.where') }}</h4>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="6">
                <leaflet-define-position :position="form.coordinates" @move="onMapMove"/>
                <div class="mb-2">
                  <label class="mr-2">{{ $t('label.suggestion') }}:</label>
                  <span v-html="location.suggestion" style="color: #777; font-size:13px"/>
                </div>
                <v-btn x-small @click="form.address = location.suggestion">{{ $t('action.applySuggestion') }}</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="location.input" :label="$t('action.findLocation')" :placeholder="$t('label.location')" hide-details @keyup.enter="findLocation"
                              clearable @click:clear="onAddressClear"/>
                <v-sheet class="search-results">
                  <v-list dense v-if="location.results.length > 0">
                    <v-list-item v-for="(result, idx) in location.results" :key="idx" @click="onSearchResultClick(result)">
                      <v-list-item-content>
                        <span>{{ result.display_name }}</span>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea v-model="form.address" :label="$tc('p.address')"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea v-model="form.locationInfo" :label="$tc('label.additionalInfo')"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <h4>{{ $t('label.details') }}</h4>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12">
                <v-textarea v-model="form.description" :label="$t('field.description')" rows="3"/>
                <v-text-field v-model="form.contact" :label="$t('label.contact')"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <div class="d-flex pa-3">
            <v-btn v-if="!isCancelled" color="error" class="mr-4" @click="cancelJam">{{ $t('action.cancelJam') }}</v-btn>
            <v-spacer/>
            <v-btn text :to="{name: 'jam-details', params: {id: jam.id}}" class="mr-4">{{ $t('action.cancel') }}</v-btn>
            <v-btn color="primary" @click="submit">{{ $t('action.updateItem', {item: $tc('p.jam')}) }}</v-btn>
          </div>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {IJam, JamStatus, RecursionType} from '@acrommunity/common';
import moment from 'moment';
import {Component} from 'vue-property-decorator';
import LeafletDefinePosition from '~/components/leaflet/leaflet-define-position.vue';
import Page from '../page.vue';

@Component({
  components: {LeafletDefinePosition},
})
export default class JamEditPage extends Page {
  jam: IJam = null;
  form = {
    title: '',
    description: '',
    date: null,
    startTime: '',
    endTime: '',
    recursionType: RecursionType.Once,
    coordinates: [0, 0],
    address: '',
    locationInfo: '',
    contact: '',
  };

  location = {
    input: '',
    results: [],
    result: null,
    suggestion: '',
    position: [51.5, 0],
  };

  openPanels = [0, 1, 2];
  times = [];

  async mounted() {
    await this.$store.state.user.stateLoaded;
    this.jam = this.$store.state.user.jams.find(jam => jam.id === Number(this.$route.params.id));

    if (!this.jam) {
      return;
    }
    this.setTimes();
    this.resetForm();
  }

  resetForm() {
    this.form.title = this.jam.title;
    this.form.description = this.jam.description;
    const startDate = moment(this.jam.startDate);
    const endDate = moment(this.jam.endDate);
    this.form.date = this.jam.startDate.substring(0, 10);
    this.form.startTime = startDate.format('H:mm');
    this.form.endTime = endDate.format('H:mm');
    this.form.recursionType = this.jam.recursionType;
    this.form.address = this.jam.address;
    this.form.locationInfo = this.jam.locationInfo;
    this.form.contact = this.jam.contact;
    this.form.coordinates = this.jam.latlng.coordinates;
  }

  setTimes() {
    const mins = ['00', '15', '30', '45'];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < mins.length; m++) {
        const time = `${h}:${mins[m]}`;
        this.times.push({text: time, value: time});
      }
    }
  }

  async submit() {
    try {
      const response = await this.$api.put(`/api/jams/${this.jam.id}/update`, this.form);
      await this.$store.dispatch('user/updateJam', response.data);
      await this.$router.push({name: 'jam-details', params: {id: String(this.jam.id)}});
      this.$notify.success(this.$t('notify.updateItemSuccess', {item: this.$tc('p.jam')}));
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async cancelJam() {
    try {
      const response = await this.$api.put(`/api/jams/${this.jam.id}/cancel`);
      await this.$store.dispatch('user/updateJam', response.data);
      await this.$router.push({name: 'jam-details', params: {id: String(this.jam.id)}});
      this.$notify.success(this.$t('notify.updateItemSuccess', {item: this.$tc('p.jam')}));
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async findLocation() {
    try {
      const response = await this.$api.get('/api/geolocation/search', {params: {q: this.location.input}});
      this.location.results = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async resolvePosition() {
    try {
      const response = await this.$api.get('/api/geolocation/reverse', {params: {lat: this.form.coordinates[0], lng: this.form.coordinates[1]}});
      this.location.result = response.data.address;
      this.location.suggestion = this.getAddressSuggestion(response.data.address);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  getAddressSuggestion(addressObject: any) {
    const {road, house_number, postcode, town, city, country, municipality} = addressObject;
    return `${road || ''} ${house_number || ''}\n${postcode || ''} ${municipality || town || city}\n${country}`.trim();
  }

  onMapMove(latLng) {
    if (latLng.lat !== this.form.coordinates[0] || latLng.lng !== this.form.coordinates[1]) {
      this.form.coordinates = [latLng.lat, latLng.lng];
      this.resolvePosition();
    }
  }

  onSearchResultClick(result) {
    this.form.coordinates = [result.lat, result.lon];
    this.location.result = result.address;
    this.location.suggestion = this.getAddressSuggestion(result.address);
    this.location.position = [result.lat, result.lon]; // update map
  }

  get recursionTypes() {
    return Object.values(RecursionType).map(value => ({text: this.$t('recursionType.' + value), value}));
  }

  get today() {
    return new Date().toISOString().substring(0, 10);
  }

  get isCancelled() {
    return this.jam.status === JamStatus.Cancelled;
  }

  onAddressClear() {
    this.location.input = '';
    this.location.results = [];
  }

  events(date) {
    if (date < this.today) {
      return false;
    }
    if (this.form.recursionType === RecursionType.Weekly && moment(date).day() === moment(this.form.date).day()) {
      return 'red';
    }
    return false;
  }

  get title() {
    return this.$t('action.createItem', {item: this.$tc('p.jam')});
  }
}
</script>

<style lang="scss" scoped>
.search-results {
  max-height: 250px;
  overflow: auto;
  font-family: Roboto, sans-serif;

  .v-list-item {
    min-height: auto;
    padding-left: 6px;

    span {
      font-size: 13px;
    }
  }
}
</style>
