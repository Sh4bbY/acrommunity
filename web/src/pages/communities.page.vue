<template>
  <v-container>
    <ul>
      <li>Auflistung von whatsapp/slack/telegram/facebook gruppen</li>
      <li>Auflistung von (acro)yoga gyms?</li>
      <li>Auflistung von partner-seiten?</li>
    </ul>

    <h2>Worldmap (owned/maintained by acropedia.com)</h2>
    <iframe loading="lazy" src="https://www.google.com/maps/d/embed?mid=13LctEOyRERcHv8UUC4o1kVCZbPehgPbp&amp;z=2" width="100%" height="700px" style="border:none"/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class CommunitiesPage extends Page {

}
</script>
