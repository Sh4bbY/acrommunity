// import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue';
import Vuetify from 'vuetify';
import de from 'vuetify/src/locale/de';
import en from 'vuetify/src/locale/en';

Vue.use(Vuetify);

export const vuetify = new Vuetify({
  treeShake: true,
  lang: {
    locales: {de, en},
    current: 'de',
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#1b4e75',
        'primary-light': '#2d71a8',
        secondary: '#cc7e00',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#cc7a00',
        secondary: '#7a7a89',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});
