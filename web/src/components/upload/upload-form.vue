<template>
  <div>
    Uploader
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class UploadForm extends Vue {
  // onImageChange(file) {
  //   const filetype = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  //   const allowedFiletypes = ['.jpg', '.jpeg', '.png'];
  //   if (!allowedFiletypes.includes(filetype)) {
  //     this.$notify.error(`Invalid filetype "${filetype}"`);
  //     return;
  //   }
  //   const maxFileSizeInMB = 3;
  //   const maxBytes = maxFileSizeInMB * Math.pow(1024, 2);
  //   if (file.size > maxBytes) {
  //     this.$notify.error(`Image to Large (${Math.round(file.size / 1024)} kb). max: ${maxFileSizeInMB} MB`);
  //     return;
  //   }
  //
  //   // this.logo = file;
  // }

  // resumableUpload(file: File): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     this.resumable = new Resumable({
  //       target: '/api/upload/resumable',
  //       headers: {Authorization: 'Bearer ' + this.$store.state.auth.accessToken},
  //       maxFiles: 1,
  //     });
  //     if (!this.resumable.support) {
  //       console.warn('resumable.js not supported, use fallback instead');
  //       return reject('resumable.js not supported');
  //     }
  //     this.resumable.on('fileError', (file: any, message: any) => {
  //       console.error('resumable fileError', file, message);
  //       return reject(message);
  //     });
  //     this.resumable.on('progress', () => this.uploadProgress = Math.round((this.resumable?.progress() || 0) * 100));
  //     this.resumable.on('fileSuccess', (_file: Resumable.ResumableFile, responseData: any) => {
  //       const data = JSON.parse(responseData);
  //       this.uploadProgress = 0;
  //       resolve(data.uploadIdentifier);
  //     });
  //     this.resumable.on('fileAdded', () => {
  //       this.resumable?.upload();
  //     });
  //     this.resumable.addFile(file);
  //   });
  // }

  // async submit() {
  //   try {
  //     if (this.logo) {
  //       this.form.uploadIdentifier = await this.resumableUpload(this.logo);
  //     }
  //     let data;
  //     if (this.data?.id) {
  //       data = await this.model.update(this.data.id, this.formSubmission);
  //       this.$notify.success(this.$t('notify.updateItemSuccess', {item: this.$tc(`p.${this.model.translationKey}`)}));
  //     } else {
  //       data = await this.model.asyncCreate(this.formSubmission);
  //       this.$notify.success(this.$t('notify.createItemSuccess', {item: this.$tc(`p.${this.model.translationKey}`)}));
  //     }
  //     this.$emit('success', data);
  //   } catch (err) {
  //     this.$notify.error(err);
  //     this.$emit('error', err);
  //   }
  // }
}
</script>

<style lang="scss" scoped>
</style>
