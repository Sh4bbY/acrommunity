<template>
  <pose-details-admin-page v-if="$store.state.auth.isAdmin"/>
  <pose-details-public-page v-else/>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import PoseDetailsAdminPage from '~/pages/pose/pose-details.admin.page.vue';
import PoseDetailsPublicPage from '~/pages/pose/pose-details.public.page.vue';
import Page from '../page.vue';

@Component({
  components: {PoseDetailsPublicPage, PoseDetailsAdminPage},
})
export default class PoseDetailsPage extends Page {
}
</script>
