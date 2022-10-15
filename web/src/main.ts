import Vue from 'vue';
import App from './App.vue';
import {i18n, vuetify} from './plugins';
import './registerServiceWorker';
import {router} from './router';
import {store} from './store';

Vue.config.productionTip = false;

registerLayouts();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');


function registerLayouts() {
  const requireLayout = require.context(
    '~/layouts',               // components path
    false,                     // include sub-directories
    /\w+(-\w+)*\.vue$/,        // file-matcher
  );

  requireLayout.keys().forEach(filePath => {
    const layout = requireLayout(filePath);
    const fileName = filePath.split('/').pop().replace(/\.\w+$/, '');

    Vue.component(fileName, layout.default || layout);  // Register globally
  });
}
