<template>
  <v-container>
    <flow-generator/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import FlowGenerator from '~/components/flow-generator/flow-generator.vue';
import Page from '../page.vue';

@Component({
  components: {FlowGenerator},
})
export default class FlowGeneratorPage extends Page {

}
</script>
