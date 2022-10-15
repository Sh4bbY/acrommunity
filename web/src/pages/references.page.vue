<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $tc('p.reference', 2) }}</v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-subheader>
          <h3>{{ $tc('p.dictionary', 2) }}</h3>
        </v-subheader>
        <template v-for="reference in references.dictionaries">
          <v-list-item :key="reference.url">
            <v-list-item-content>
              <v-list-item-title>{{ reference.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ reference.url }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openTab(reference.url)">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider/>
        </template>

        <v-subheader class="mt-6">
          <h3>{{ $tc('p.calendar', 2) }}</h3>
        </v-subheader>
        <template v-for="reference in references.calendars">
          <v-list-item :key="reference.url">
            <v-list-item-content>
              <v-list-item-title>{{ reference.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ reference.url }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openTab(reference.url)">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider/>
        </template>
      </v-list>
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
export default class ReferencesPage extends Page {
  references = {
    dictionaries: [
      {name: 'Acropedia', url: 'https://www.acropedia.org/poses/'},
      {name: 'Acromuseum', url: 'https://www.acromuseum.com/poses.php'},
      {name: 'Acrodicted', url: 'http://www.acrodicted.com/poses'},
      {name: 'The Circus Dictionary', url: 'http://thecircusdictionary.com/moves'},
      {name: 'Partner Acrobatics', url: 'https://partneracrobatics.com/manual/l-basing'},
    ],
    calendars: [
      {name: 'Acro Event Kalender', url: 'https://kalender.digital/9290ecc26f6f5a51ddc5'},
      {name: 'Acrocalendar', url: 'https://acrocalendar.com/'},
    ],
  };

  openTab(url: string) {
    window.open(url, '_blank');
  }
}
</script>
