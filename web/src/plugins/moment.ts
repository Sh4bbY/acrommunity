import moment from 'moment';
import Vue from 'vue';

export class Moment {
  static install(Vue) {
    Vue.prototype.$moment = moment;
  }
}

Vue.use(Moment);

declare module 'vue/types/vue' {
  interface Vue {
    $moment: typeof moment;
  }
}
