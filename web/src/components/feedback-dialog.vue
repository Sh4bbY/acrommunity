<template>
  <v-dialog v-model="show" width="auto">
    <v-card width="600px">
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $t('label.feedback') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-3">
        <v-sheet rounded outlined class="pa-2 feedback-note">
          Sind dir Fehler aufgefallen? Oder möchtest du Kritik äußern?<br/>
          Hast du Verbesserungsvorschläge, oder Ideen für neue Features?<br/>
          Hier hast du die Möglichkeit dich mitzuteilen =)
        </v-sheet>
        <v-text-field v-model="form.title" :label="$t('field.title')"/>
        <!--        <v-textarea v-model="form.text" :label="$t('field.text')"/>-->
        <rich-text-editor v-model="form.text" :label="$t('field.text')"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click="show = false">{{ $t('action.cancel') }}</v-btn>
        <v-btn color="primary" @click="submit">{{ $t('action.submit') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator';
import RichTextEditor from '~/components/common/rich-text-editor.vue';

@Component({
  components: {RichTextEditor},
})
export default class FeedbackDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;

  form = {
    title: '',
    text: '',
  };

  async submit() {
    try {
      await this.$api.post('/api/feedback', this.form);
      this.$notify.success(this.$t('msg.thankYouForFeedback'));
      this.clear();
      this.show = false;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  clear() {
    this.form.title = '';
    this.form.text = '';
  }
}
</script>

<style lang="scss" scoped>
.feedback-note {
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: rgba(#000, 0.5) !important;
}
</style>
