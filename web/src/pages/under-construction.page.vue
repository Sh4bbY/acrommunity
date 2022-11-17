<template>
  <v-container class="under-construction">
    {{ $t('msg.underConstruction') }}
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class UnderConstructionPage extends Page {
}
</script>


<style lang="scss" scoped>
.under-construction {
  display: grid;
  place-items: center;
  height: 80%;
}
</style>
