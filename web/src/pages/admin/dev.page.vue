<template>
  <v-container>
    <v-btn @click="exportData" class="ma-2">Export Data</v-btn>
    <v-btn @click="backupData" class="ma-2">Backup Data</v-btn>
    <v-btn @click="dev" class="ma-2">Do Dev Stuff</v-btn>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from '../page.vue';

@Component({
  components: {},
})
export default class DevPage extends Page {
  async exportData() {
    try {
      const response = await this.$api.get('/api/admin/export/data', {responseType: 'blob'});
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'data.json'); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async backupData() {
    try {
      await this.$api.get('/api/admin/backup/data');
      this.$notify.success('Data backup complete');
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async dev() {
    try {
      await this.$api.get('/api/admin/dev');
      this.$notify.success('Dev stuff complete');
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>
