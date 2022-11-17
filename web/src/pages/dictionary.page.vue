<template>
  <v-container class="dictionary">
    <h2 class="text-center">{{ $t('label.dictionary') }}</h2>
    <v-row>
      <v-col v-for="(card, idx) in cards" :key="idx" cols="6" class="pb-0 pt-4">
        <v-card :to="card.to">
          <v-img :src="card.img" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)" height="170px">
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
import Page from './page.vue';

@Component({})
export default class DictionaryPage extends Page {
  get title() {
    return this.$t('label.dictionary');
  }

  get cards() {
    return [
      {
        to: {name: 'poses'},
        title: this.$tc('p.pose', 2),
        subTitle: 'Entdecke neue Posen',
        img: 'https://image.brigitte.de/12436490/t/b6/v3/w1440/r1.7778/-/acro-yoga--perfektes-training-zu-zweit-bild.jpg',
      },
      {to: {name: 'flows'}, title: this.$tc('p.flow', 2), subTitle: 'Lerne neue Waschmaschienen', img: 'https://i.ytimg.com/vi/n1S0ytDg-W8/maxresdefault.jpg'},
      // {to: {name: 'skills'}, title: this.$tc('p.skill', 2), subTitle: 'Lorem ipsum dolor sit amet...', img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'},
      {
        to: {name: 'images'},
        title: this.$tc('p.image', 2),
        subTitle: 'Lass dich von Bildern inspirieren',
        img: 'https://www.acromuseum.com/in/ph/1/full/175689459_1099165810595135_1372100590095231995_n.jpg',
      },
      {
        to: {name: 'videos'},
        title: this.$tc('p.video', 2),
        subTitle: 'Schau dir von Videos etwas ab',
        img: 'https://www.acromuseum.com/2019/instagram/posters/195444062_2929149197359279_2324454178287638085_n.jpg',
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
</style>
