<template>
  <v-container>
    <v-card>
      <v-card-text>
        <p>Herzlich willkommen bei Acrommunity!</p>
        <p>Wir wollen dich für deine nächste Jam inspirieren und dir helfen, schnell und einfach, auf das zuzugreifen woran du gerade Arbeitest</p>
        <p>
          Diese Plattform bietet dir die Möglichkeit verschiedene
          <router-link :to="{name: 'poses'}">Posen</router-link>
          und
          <router-link :to="{name: 'flows'}">Flows</router-link>
          nach zu schlagen.<br>

          Du kannst dich aber auch einfach von
          <router-link :to="{name: 'images'}">Bildern</router-link>
          und
          <router-link :to="{name: 'videos'}">Videos</router-link>
          inspirieren lassen.

        <p>
          Hast dust auf neue Flows? Probiere unseren
          <router-link :to="{name: 'flow-generator'}">Flow-Generator</router-link>
          oder spiele eine Runde
          <router-link :to="{name: 'acrolette'}">Acrolette</router-link>
        </p>
        <p>
          Kennst du die Namen vieler Posen nicht oder fällt es dir Schwer dir diese zu merken? Probiere das
          <router-link :to="{name: 'acro-quiz'}">Acro-Quiz</router-link>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class LandingPage extends Page {
  get title() {
    return 'Acrommunity';
  }
}
</script>
