<template>
  <v-container>
    <v-card class="mb-2">
      <v-card-text>
        <div class="d-flex align-center">
          <v-text-field :label="$t('label.location')"/>
          <v-select :label="$t('label.distance')" :items="distances"/>
          <v-btn color="primary">{{ $t('action.search') }}</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mb-2">
      <v-card-text>
        <h2>Upcoming Jams:</h2>
        <v-list>
          <v-list-item v-for="jam in jams" :key="jam.id">
            <v-list-item-title>{{ jam.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-card class="mb-2">
      <v-card-text>
        <v-btn color="primary" :to="{name: 'register'}">{{ $t('action.register') }}</v-btn>
        <v-btn color="secondary" :to="{name: 'login'}">{{ $t('action.login') }}</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class LandingPage extends Page {
  get title() {
    return 'LandingPage';
  }

  get distances() {
    return [
      {text: '100 Km', value: 100000},
      {text: '50 Km', value: 50000},
      {text: '10 Km', value: 10000},
    ];
  }

  get jams() {
    return [
      {id: 1, name: 'Karitakan', city: 'Leipzig'},
    ];
  }
}
</script>
