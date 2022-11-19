<template>
  <v-footer inset class="app-footer">
    <router-link :to="{name: 'imprint'}">{{ $t('label.imprint') }}</router-link>
    <v-spacer/>
    <div>
      Made with
      <v-icon color="red">mdi-heart</v-icon>
      by <a href="https://www.shabbtech.com" target="_blank">shabbtech.com</a>
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class AppFooter extends Vue {
}
</script>

<style lang="scss" scoped>
.app-footer {
  font-size: 12px;
}
</style>
