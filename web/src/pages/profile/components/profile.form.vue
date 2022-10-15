<template>
  <v-form v-model="isValid" @submit.prevent="submit">
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>{{ $tc('p.profile') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-img :src="form.avatar" alt="avatar" max-height="100" max-width="100" contain/>
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

@Component({
  components: {},
})
export default class ProfileForm extends Vue {
  isValid = true;
  form = {
    username: '',
    avatar: '',
  };

  mounted() {
    this.form.username = this.$store.state.auth.user.username;
    this.form.avatar = this.$store.state.auth.user.avatar;
  }

  async submit() {
    try {
      await this.$api.put('/api/profile', this.form);
      this.$store.commit('auth/updateUserProfile', this.form);
      this.$notify.info('success');
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>
