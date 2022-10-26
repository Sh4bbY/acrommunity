<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component
export default class Page extends Vue {
  public error = '';

  @Watch('title')
  watchTitle() {
    document.title = String(this.title);
  }

  public created() {
    document.title = String(this.title);
  }

  get title(): any {
    return 'Acrommunity';
  }
}
</script>
