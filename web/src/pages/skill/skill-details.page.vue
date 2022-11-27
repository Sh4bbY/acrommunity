<template>
  <skill-details-admin-page v-if="$store.state.auth.isAdmin"/>
  <skill-details-public-page v-else/>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import SkillDetailsAdminPage from '~/pages/skill/skill-details.admin.page.vue';
import SkillDetailsPublicPage from '~/pages/skill/skill-details.public.page.vue';
import Page from '../page.vue';

@Component({
  components: {SkillDetailsAdminPage, SkillDetailsPublicPage},
})
export default class SkillDetailsPage extends Page {
}
</script>
