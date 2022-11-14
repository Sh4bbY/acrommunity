<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <div class="mt-10">
        <v-card max-width="500px" class="mx-auto">
          <v-toolbar dense dark color="primary">
            <v-toolbar-title>{{ $t('action.login') }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field v-model="form.email" :label="$t('field.email')" prepend-icon="mdi-email"/>
            <v-text-field v-model="form.password" :label="$t('field.password')" prepend-icon="mdi-lock" type="password"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text exact :to="{name: 'landing'}">{{ $t('action.cancel') }}</v-btn>
            <v-btn color="primary" type="submit">{{ $t('action.login') }}</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from '../page.vue';

@Component({
  components: {},
})
export default class LoginPage extends Page {
  form = {
    email: '',
    password: '',
  };

  get title() {
    return this.$t('action.login');
  }

  async submit() {
    try {
      await this.$store.dispatch('auth/login', this.form);
      await this.$router.push({name: 'home'});
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>
