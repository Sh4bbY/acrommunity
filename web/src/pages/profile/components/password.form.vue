<template>
  <v-form v-model="isValid" @submit.prevent="submit">
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="d-flex justify-center">
          <v-icon class="mr-2">mdi-lock</v-icon>
          <span>{{ $t('action.editItem', {item: $t('field.password')}) }}</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field v-model="form.password" :label="$t('field.password')" :rules="passwordRules"/>
        <v-text-field v-model="form.passwordConfirm" :label="$t('field.passwordConfirmation')" :rules="passwordConfirmRules"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" type="submit" :disabled="!isValid">{{ $t('action.updateItem', {item: $tc('field.password')}) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class PasswordForm extends Vue {
  isValid = false;
  form = {
    password: '',
    passwordConfirm: '',
  };

  async submit() {
    try {
      console.log(this.form);
      await this.$api.put('/api/profile/password', this.form);
      this.$notify.info('success');
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get passwordRules() {
    return [
      v => !!v || 'must be set',
      v => !v || v.length >= 6 || 'min length 6',
    ];
  }

  get passwordConfirmRules() {
    return [
      v => !!v || 'must match password',
      v => v === this.form.password || 'must match password',
    ];
  }
}
</script>
