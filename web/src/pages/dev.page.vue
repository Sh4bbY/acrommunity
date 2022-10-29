<template>
  <v-container>
    <v-btn @click="exportLBasePoses">export l-base poses</v-btn>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class DevPage extends Page {
  async exportLBasePoses() {
    try {
      const response = await this.$api.get('/api/admin/export/pose/lbase');
      console.log('GOT it', response.data);
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>
