<template>
  <v-container v-if="$store.state.auth.isAuthenticated">
    <v-row>
      <v-col cols="12">
        <profile-form/>
      </v-col>
      <v-col cols="12" md="6">
        <email-form/>
      </v-col>
      <v-col cols="12" md="6">
        <password-form/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import EmailForm from '~/pages/profile/components/email.form.vue';
import PasswordForm from '~/pages/profile/components/password.form.vue';
import ProfileForm from '~/pages/profile/components/profile.form.vue';
import Page from '../page.vue';

@Component({
  components: {ProfileForm, EmailForm, PasswordForm},
})
export default class ProfilePage extends Page {
  get title() {
    return this.$tc('p.profile');
  }
}
</script>
