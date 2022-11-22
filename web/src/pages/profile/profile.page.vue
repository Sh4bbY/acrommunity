<template>
  <v-container v-if="$store.state.auth.isSignedIn">
    <profile-form/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import ProfileForm from '~/pages/profile/components/profile.form.vue';
import Page from '../page.vue';

@Component({
  components: {ProfileForm},
})
export default class ProfilePage extends Page {
  get title() {
    return this.$tc('p.profile');
  }
}
</script>
