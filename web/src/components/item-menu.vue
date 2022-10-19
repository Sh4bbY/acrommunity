<template>
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
          <v-list-item @click="markAsFavorite()">Neue Liste erstellen</v-list-item>
          <v-divider/>
          <v-list-item @click="markAsFavorite()">Kann ich schon</v-list-item>
          <v-list-item @click="markAsFavorite()">Will ich lernen</v-list-item>
        </v-list>
      </v-menu>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class ItemMenu extends Vue {
  markAsFavorite() {
    console.log('fav!');
  }
}
</script>

<style lang="scss" scoped>
</style>
