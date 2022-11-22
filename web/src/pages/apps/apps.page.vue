<template>
  <v-container>
    <h2 class="text-center">{{ $tc('p.app', 2) }}</h2>
    <v-row>
      <v-col v-for="(card, idx) in cards" :key="idx" cols="12" sm="4" class="pb-0 pt-4">
        <v-card :to="card.to">
          <v-img :src="card.img" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="170px">
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-subtitle>{{ card.subTitle }}</v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from '../page.vue';

@Component({})
export default class GamesPage extends Page {
  get title() {
    return this.$tc('p.app', 2);
  }

  get cards() {
    return [
      {
        to: {name: 'flow-generator'},
        title: this.$t('label.flowGenerator'),
        subTitle: 'Neue Flows mit nur einem Knopfdruck',
        img: 'https://images.pexels.com/photos/4700391/pexels-photo-4700391.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        to: {name: 'acroulette'},
        title: this.$t('label.acroulette'),
        subTitle: 'Versuche die Posen Nachzumachen',
        img: 'https://images.pexels.com/photos/3894215/pexels-photo-3894215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        to: {name: 'acro-quiz'},
        title: this.$t('label.acroQuiz'),
        subTitle: 'Kennst du die Namen der Posen?',
        img: 'https://static.vecteezy.com/system/resources/previews/002/187/596/large_2x/quiz-neon-signs-style-text-free-vector.jpg',
      },
    ];
  }
}
</script>
