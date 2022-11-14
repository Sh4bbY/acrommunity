<template>
  <v-container>
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>{{ $t('action.register') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field v-model="form.username" :label="$t('field.username')"/>
          <v-text-field v-model="form.email" :label="$t('field.email')"/>
          <v-text-field v-model="form.password" :label="$t('field.password')" type="password"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text exact :to="{name: 'landing'}">{{ $t('action.cancel') }}</v-btn>
        <v-btn color="primary" @click="submit">{{ $t('action.register') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from '../page.vue';

@Component({
  components: {},
})
export default class RegisterPage extends Page {
  form = {
    username: '',
    email: '',
    password: '',
  };

  get title() {
    return this.$t('action.register');
  }

  async submit() {
    try {
      const response = await this.$api.post('/api/auth/register', this.form);
      console.log(response.data);
      this.$notify.info('success');
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>
