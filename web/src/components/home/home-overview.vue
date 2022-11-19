<template>
  <v-card class="mb-5">
    <v-card-text>
      <v-row>
        <v-col v-for="stat in stats" :key="stat.title" cols="4">
          <div class="d-flex flex-column align-center">
            <router-link class="stat-title" :to="stat.to">{{ stat.title }}</router-link>
            <v-progress-circular v-model="stat.value" :color="stat.color" size="100" width="20">
              {{ stat.value }}
            </v-progress-circular>
          </div>
        </v-col>
      </v-row>
      <!--      <p>-->
      <!--        Du hast {{ favorites.length }} Favoriten. In deinem Repertoire sind aktuell {{ repertoire.length }} Elemente und auf deinem Trainingsplan stehen {{ training.length }}-->
      <!--      </p>-->
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class HomeOverview extends Vue {
  get stats() {
    return [
      {title: this.$tc('p.favorite', 2), value: this.favorites.length, color: 'red', to: {name: 'my-favorites'}},
      {title: this.$tc('p.trainingPlan', 1), value: this.training.length, color: 'gray', to: {name: 'my-training'}},
      {title: this.$tc('p.repertoire', 1), value: this.repertoire.length, color: 'orange', to: {name: 'my-repertoire'}},
    ];
  }

  get favorites() {
    return this.marks.filter(m => m.type === MarkType.Favorite);
  }

  get repertoire() {
    return this.marks.filter(m => m.type === MarkType.CanDo);
  }

  get training() {
    return this.marks.filter(m => m.type === MarkType.WorkingOn);
  }

  get marks() {
    return this.$store.state.user.marks;
  }
}
</script>

<style lang="scss" scoped>
.stat-title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 8px;
}
</style>
