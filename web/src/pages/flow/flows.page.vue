<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer/>
        <v-btn :to="{name: 'flow-create'}" icon small class="mr-1">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table :items="flows" :headers="headers">
        <template #item.name="{item}">
          <router-link :to="{name: 'flow-details', params: {id: item.id}}">{{ item.name }}</router-link>
        </template>
        <template #item.actions="{item}">
          <tooltip-button color="red" small
                          :tooltip="isFavorite(item) ? $t('action.removeFromItems', {items: $tc('p.favorite', 2)}) : $t('action.addToItems', {items: $tc('p.favorite', 2)})"
                          :icon="isFavorite(item) ? 'mdi-heart' : 'mdi-heart-outline'"
                          @click="toggleFavorite(item)"
          />
          <v-menu offset-x left>
            <template #activator="{on}">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="markAsFavorite">
                Mark as ...
              </v-list-item>
              <v-menu left offset-x>
                <template #activator="{on}">
                  <v-list-item v-on="on">
                    <v-list-item-icon>
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Zu Liste hinzufügen</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list>
                  <v-list-item @click="markAsFavorite()">Liste A</v-list-item>
                  <v-list-item @click="markAsFavorite()">Liste B</v-list-item>
                </v-list>
              </v-menu>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import TooltipButton from '~/components/tooltip-button.vue';
import Page from '../page.vue';

@Component({
  components: {TooltipButton},
})
export default class FlowsPage extends Page {
  flows = [];
  favorites = [];

  async mounted() {
    try {
      const response = await this.$api.get('/api/flows');
      this.flows = response.data.rows;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.$tc('p.flow', 2);
  }

  get headers() {
    return [
      {text: this.$t('field.name'), value: 'name'},
      {text: this.$t('field.difficulty'), value: 'difficulty'},
      {text: this.$tc('p.action', 2), value: 'actions', sortable: false, align: 'right'},
    ];
  }

  isFavorite(item) {
    return this.favorites.includes(item.id);
  }

  toggleFavorite(item) {
    if (this.isFavorite(item)) {
      const index = this.favorites.indexOf(item.id);
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(item.id);
    }
  }

  markAsFavorite() {
    console.log('fav!');
  }
}
</script>
