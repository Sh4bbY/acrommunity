<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $t('label.flowGenerator') }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        Wollen wir einen Flow Generator?!
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import TooltipButton from '~/components/tooltip-button.vue';
import Page from './page.vue';

@Component({
  components: {TooltipButton},
})
export default class FlowGeneratorPage extends Page {

}
</script>
