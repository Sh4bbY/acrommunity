<template>
  <v-dialog v-model="show" max-width="400px">
    <v-form @submit.prevent="submit">
      <v-card>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{ $t('action.login') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="d-flex row justify-center mb-5">
            <v-btn class="login-btn ma-2" width="250px" @click="$store.dispatch('auth/requestGoogleAuthentication')">
              <v-img src="/img/brand/google.svg" max-width="20px" class="mr-3"/>
              {{ $t('label.continueWithItem', {item: 'Google'}) }}
            </v-btn>
          </div>
          <v-text-field v-model="form.email" :label="$t('field.email')" prepend-icon="mdi-email"/>
          <v-text-field v-model="form.password" :label="$t('field.password')" prepend-icon="mdi-lock" type="password"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="clearAndClose()">{{ $t('action.cancel') }}</v-btn>
          <v-btn color="primary" type="submit">{{ $t('action.login') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class LoginDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;

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
      this.clearAndClose();
    } catch (e) {
      this.$notify.error(e);
    }
  }

  clearAndClose() {
    this.clear();
    this.show = false;
  }

  clear() {
    this.form.email = '';
    this.form.password = '';
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
  font-family: Roboto, sans-serif;
}
</style>
