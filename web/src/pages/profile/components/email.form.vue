<template>
  <v-form v-model="isValid" @submit.prevent="submit">
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="d-flex justify-center">
          <v-icon class="mr-2">mdi-email</v-icon>
          <span>{{ $t('action.editItem', {item: $t('field.email')}) }}</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field v-model="form.email" :label="$t('field.email')" :rules="emailRules"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" type="submit" :disabled="!hasChanged || !isValid">{{ $t('action.updateItem', {item: $tc('field.email')}) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import tlds from '@sideway/address/lib/tlds';
import Joi from 'joi';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class EmailForm extends Vue {
  isValid = true;
  form = {
    email: '',
  };

  mounted() {
    this.form.email = this.$store.state.auth.user.email;
  }

  async submit() {
    try {
      await this.$api.put('/api/profile/email', this.form);
      this.$store.commit('auth/updateUserProfile', this.form);
      this.$notify.info('success');
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get emailRules() {
    return [
      v => Joi.string().label('email').email({tlds: {allow: tlds}})
          .validate(v).error?.message || true,
    ];
  }

  get hasChanged() {
    return this.form.email !== this.$store.state.auth.user.email;
  }
}
</script>
