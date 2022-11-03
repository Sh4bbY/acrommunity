<template>
  <v-container>
    <home-poses/>
    <home-flows/>
    <home-images/>
    <home-videos/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import HomeFlows from '~/components/home/home-flows.vue';
import HomeImages from '~/components/home/home-images.vue';
import HomePoses from '~/components/home/home-poses.vue';
import HomeVideos from '~/components/home/home-videos.vue';
import Page from './page.vue';

@Component({
  components: {HomePoses, HomeFlows, HomeImages, HomeVideos},
})
export default class HomePage extends Page {
}
</script>


<style lang="scss" scoped>
::v-deep .v-hl-btn {
  top: auto !important;
  bottom: auto !important;
}
</style>
