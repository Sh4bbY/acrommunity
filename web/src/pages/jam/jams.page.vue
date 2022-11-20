<template>
  <v-container>
    <jam-search class="mb-5"/>
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
