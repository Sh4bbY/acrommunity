<template>
  <flow-details-admin-page v-if="$store.state.auth.isAdmin"/>
  <flow-details-public-page v-else/>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import FlowDetailsAdminPage from '~/pages/flow/flow-details.admin.page.vue';
import FlowDetailsPublicPage from '~/pages/flow/flow-details.public.page.vue';
import Page from '../page.vue';

@Component({
  components: {FlowDetailsAdminPage, FlowDetailsPublicPage},
})
export default class FlowDetailsPage extends Page {
}
</script>
