<template>
  <v-container>
    <update-pose-form v-model="pose"/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import UpdatePoseForm from '~/components/forms/update-pose-form.vue';
import Page from '../page.vue';

@Component({
  components: {UpdatePoseForm},
})
export default class PoseEditPage extends Page {
  pose = null;

  async mounted() {
    try {
      const response = await this.$api.get('/api/poses/' + this.$route.params.id);
      this.pose = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.$t('action.editItem', {item: this.$tc('p.pose')});
  }
}
</script>
