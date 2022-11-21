<template>
  <v-container>
    <v-sheet class="pa-5 d-flex align-center justify-center" height="400">
      <div class="d-flex align-center">
        <v-progress-circular indeterminate color="primary" size="70" width="10" class="mr-5"/>
        <h3>Authenticating</h3>
      </div>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from '../page.vue';

@Component({
  components: {},
})
export default class GoogleAuthCallbackPage extends Page {
  async mounted() {
    try {
      await this.$store.state.auth.authPendingPromise;
      if (!this.$store.state.auth.isSignedIn && this.$route.query.code && this.$route.query.prompt) {
        await this.$store.dispatch('auth/handleGoogleAuthCallback', this.$route.query);
      } else {
        await this.$router.push({name: 'landing'});
      }
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
