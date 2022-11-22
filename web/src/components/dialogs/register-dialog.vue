<template>
  <v-dialog v-model="show" max-width="400px">
    <v-form @submit.prevent="submit">
      <v-card>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{ $t('action.register') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="d-flex row justify-center mb-5">
            <v-btn class="login-btn ma-2" width="250px" @click="$store.dispatch('auth/requestGoogleAuthentication')">
              <v-img src="/img/brand/google.svg" max-width="20px" class="mr-3"/>
              {{ $t('label.continueWithItem', {item: 'Google'}) }}
            </v-btn>
            <v-btn class="login-btn ma-2" width="250px" @click="$store.dispatch('auth/requestFacebookAuthentication')">
              <v-img src="/img/brand/facebook.svg" max-width="20px" class="mr-3"/>
              {{ $t('label.continueWithItem', {item: 'Facebook'}) }}
            </v-btn>
          </div>
          <v-form>
            <v-text-field v-model="form.username" :label="$t('field.username')"/>
            <v-text-field v-model="form.email" :label="$t('field.email')"/>
            <v-text-field v-model="form.password" :label="$t('field.password')" type="password"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="clearAndClose">{{ $t('action.cancel') }}</v-btn>
          <v-btn color="primary" type="submit">{{ $t('action.register') }}</v-btn>
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
export default class RegisterDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;
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
      await this.$api.post('/api/auth/register', this.form);
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
    this.form.username = '';
    this.form.email = '';
    this.form.password = '';
  }
}
</script>
