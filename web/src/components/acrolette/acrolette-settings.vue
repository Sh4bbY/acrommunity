<template>
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{ $t('label.acrolette') }} - Settings</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-sheet outlined rounded class="pa-2">
            <v-radio-group v-model="settings.imageSwitch.type" label="Next Image" class="mt-0" hide-details>
              <v-radio value="button" label="Button"/>
              <div class="d-flex">
                <v-radio value="timer" label="Timer" class="mr-5"/>
                <v-text-field v-model="settings.imageSwitch.duration" label="Timer Duration" :disabled="settings.imageSwitch.type !== 'timer'" type="number">
                  <template #append>sek</template>
                </v-text-field>
              </div>
            </v-radio-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click="$emit('start')">{{ 'Starten' }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator';
import {IAcroletteSettings} from '~/components/acrolette/IAcroletteSettings';

@Component
export default class AcroletteSettings extends Vue {
  @VModel() settings: IAcroletteSettings;
}
</script>
