<template>
  <v-form v-model="isValid" @submit.prevent="submit">
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>{{ $tc('p.profile') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div class="d-inline-flex flex-column justify-center align-center mb-4">
          <v-img :src="preview || form.avatar" alt="avatar" max-height="200" max-width="200" contain class="mb-2"/>
          <div v-if="preview">
            {{ fileSize | filesize }}
          </div>
          <upload-button v-model="file" only-image/>
        </div>
        <v-text-field v-model="form.username" :label="$t('field.username')"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" type="submit" :disabled="!isValid">{{ $t('action.updateItem', {item: $tc('p.profile')}) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import UploadButton from '~/components/upload/upload-button.vue';
import {filesize} from '~/utils';

@Component({
  components: {UploadButton},
  filters: {filesize},
})
export default class ProfileForm extends Vue {
  isValid = true;
  file = null;
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
