import {AxiosInstance} from 'axios';
import {Framework} from 'vuetify';

declare module '*.vue' {
  interface Vue {
    $vuetify: Framework,
  }

  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosInstance;
  }
}
