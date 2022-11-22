<template>
  <div>
    <v-dialog v-model="dialog.password" max-width="400px">
      <password-form/>
    </v-dialog>
    <v-dialog v-model="dialog.email" max-width="400px">
      <email-form/>
    </v-dialog>

    <v-form v-model="isValid" @submit.prevent="submit">
      <v-card>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{ $tc('p.profile') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <div class="d-inline-flex flex-column justify-center align-center mb-4 w-100">
                <v-img :src="preview || form.avatar" :key="preview || form.avatar" alt="avatar" max-height="200" max-width="200" width="100%" contain class="mb-2 elevation-2"/>
                <div v-if="preview">
                  {{ fileSize | filesize }}
                </div>
                <upload-button v-model="file" only-image/>
              </div>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-text-field v-model="form.username" :label="$t('field.username')"/>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="flex-wrap">
          <v-btn text class="mt-2 mr-2" @click="dialog.email = !dialog.email">{{ $t('action.changeItem', {item: $tc('field.email')}) }}</v-btn>
          <v-btn text class="mt-2 mr-2" @click="dialog.password = !dialog.password">{{ $t('action.changeItem', {item: $tc('field.password')}) }}</v-btn>
          <v-spacer/>
          <v-btn color="primary" type="submit" :disabled="!isValid">{{ $t('action.updateItem', {item: $tc('p.profile')}) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import UploadButton from '~/components/upload/upload-button.vue';
import EmailForm from '~/pages/profile/components/email.form.vue';
import PasswordForm from '~/pages/profile/components/password.form.vue';
import {filesize} from '~/utils';

@Component({
  components: {UploadButton, EmailForm, PasswordForm},
  filters: {filesize},
})
export default class ProfileForm extends Vue {
  isValid = true;
  file = null;
  dialog = {
    password: false,
    email: false,
  };
  form = {
    uploadRef: undefined,
    username: '',
    avatar: '',
  };

  mounted() {
    this.form.username = this.$store.state.auth.user.username;
    this.form.avatar = this.$store.state.auth.user.avatar;
  }

  async submit() {
    try {
      if (this.file) {
        const data = new FormData();
        data.set('file', this.file);
        const response = await this.$api.post('/api/file/upload', data);
        this.form.uploadRef = response.data.ref;
      }
      const profileResponse = await this.$api.put('/api/profile', this.form);
      this.$store.commit('auth/updateUserProfile', profileResponse.data);
      this.form.username = this.$store.state.auth.user.username;
      this.form.avatar = this.$store.state.auth.user.avatar;
      this.file = null;
      this.$notify.info('success');
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get preview() {
    return this.file ? URL.createObjectURL(this.file) : null;
  }

  get fileSize() {
    return this.file?.size;
  }
}
</script>
