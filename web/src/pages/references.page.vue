<template>
  <v-container>
    <v-list>
      <template v-for="reference in references">
        <v-subheader :key="reference.title">
          <h3>{{ reference.title }}</h3>
        </v-subheader>
        <v-list-item :key="reference.title + '-items'" class="mb-5">
          <v-row>
            <v-col v-for="item in reference.items" :key="item.url" cols="12" sm="6" md="4" lg="3">
              <v-card :href="item.url" target="_blank" flat outlined>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle v-if="item.description">{{ item.description }}</v-card-subtitle>
                <v-card-subtitle class="pt-0">{{ item.url }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import TooltipButton from '~/components/common/tooltip-button.vue';
import Page from './page.vue';

@Component({
  components: {TooltipButton},
})
export default class ReferencesPage extends Page {
  references = [{
    title: this.$tc('p.dictionary', 2),
    items: [
      {name: 'christiangieger', url: 'https://www.christiangieger.de/acroyoga-poses', description: 'Dictionary verschiedener Posen'},
      {name: 'Acropedia', url: 'https://www.acropedia.org/poses'},
      {name: 'Acromuseum', url: 'https://www.acromuseum.com/poses.php'},
      {name: 'Acrodicted', url: 'http://www.acrodicted.com/poses'},
      {name: 'The Circus Dictionary', url: 'http://thecircusdictionary.com/moves'},
      {name: 'Partner Acrobatics', url: 'https://partneracrobatics.com/manual/l-basing'},
    ],
  }, {
    title: this.$tc('p.calendar', 2),
    items: [
      {name: 'Acro Event Kalender', url: 'https://kalender.digital/9290ecc26f6f5a51ddc5'},
      {name: 'Acrocalendar', url: 'https://acrocalendar.com'},
    ],
  }, {
    title: this.$tc('p.community', 2),
    items: [
      {name: 'Acro Map', url: 'https://www.acropedia.org/communities'},
      {name: 'Acromaps', url: 'https://acromaps.com'},
    ],
  }];

  openTab(url: string) {
    window.open(url, '_blank');
  }
}
</script>
