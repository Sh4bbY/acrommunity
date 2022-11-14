<template>
  <v-app>
    <v-main>
      <transition name="page" mode="out-in">
        <slot/>
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class BlankLayout extends Vue {
}
</script>


<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s, transform 0.2s;
}

.page-enter {
  opacity: 0;
  transform: translateY(-10%);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
</style>
