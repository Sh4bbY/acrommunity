<template>
  <div>
    <input ref="input" type="file" :multiple="multiple" :accept="acceptedTypes" class="d-none">
    <v-btn small @click="onUploadClick">{{ $t('action.selectItem', {item: $tc('p.image')}) }}</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, VModel} from 'vue-property-decorator';

@Component
export default class UploadButton extends Vue {
  @Prop({default: false, type: Boolean}) readonly multiple!: boolean;
  @Prop({type: String}) readonly type!: string;
  @Prop({type: Boolean, default: false}) readonly onlyImage!: boolean;
  @VModel({}) data!: File | FileList;
  types = {
    image: ['image/*'],
  };

  mounted() {
    this.inputRef.addEventListener('change', this.fileChange);
  }

  onUploadClick() {
    this.inputRef.dispatchEvent(new MouseEvent('click'));
  }

  fileChange(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.data = this.multiple ? event.target.files : event.target.files[0];
  }

  get inputRef() {
    return this.$refs.input as HTMLInputElement;
  }

  get acceptedTypes() {
    if (this.onlyImage) {
      return this.types.image.join(', ');
    }
    return '';
  }
}
</script>

<style lang="scss" scoped>
.label {
  font-size: 13px;
  color: rgba(#000, 0.6);
}
</style>
