<template>
  <div class="rich-text-editor">
    <span class="label">{{ label }}</span>
    <vue-editor v-model="content" :editor-toolbar="toolbar"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, VModel} from 'vue-property-decorator';
import {VueEditor} from 'vue2-editor';

@Component({
  components: {VueEditor},
})
export default class RichTextEditor extends Vue {
  @VModel({default: ''}) content: string;
  @Prop({default: ''}) label: string;
  @Prop({default: '250px'}) height: string;

  toolbar = [
    ['bold', 'italic', 'underline'],
    [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
    [{list: 'ordered'}, {list: 'bullet'}],
    ['link', 'blockquote'],
    [{color: []}, {background: []}], // dropdown with defaults from theme
    ['clean'], // remove formatting button
  ];

  // defaultToolbar = [
  //   [{header: [false, 1, 2, 3, 4, 5, 6]}],
  //   ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  //   [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
  //   ['blockquote', 'code-block'],
  //   [{list: 'ordered'}, {list: 'bullet'}, {list: 'check'}],
  //   [{indent: '-1'}, {indent: '+1'}], // outdent/indent
  //   [{color: []}, {background: []}], // dropdown with defaults from theme
  //   ['link', 'image', 'video'],
  //   ['clean'], // remove formatting button
  // ];
}
</script>

<style lang="scss" scoped>

.label {
  font-size: 16px;
}

.rich-text-editor {
  ::v-deep .ql-editor {
    max-height: 250px;
  }
}


</style>
