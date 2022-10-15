import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Vue from 'vue';
import {TranslateResult} from 'vue-i18n';
import {i18n} from './vueI18n';

export enum NotifyType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

interface NotifyOptions {
  type?: NotifyType;
  title?: string;
  timeout?: number;
  message: string;
}

export class Notify {
  create(options: NotifyOptions) {
    switch (options.type) {
      case NotifyType.Success:
        iziToast.success(options);
        break;
      case NotifyType.Info:
        iziToast.info(options);
        break;
      case NotifyType.Warning:
        iziToast.warning(options);
        break;
      case NotifyType.Error:
        iziToast.error(options);
        break;
      default:
        iziToast.show(options);
    }
  }

  getErrorMessageTitle(statusCode: number) {
    if (!statusCode) {
      return i18n.t('notify.error').toString();
    }
    if (statusCode === 401) {
      return i18n.t('notify.unauthorized').toString();
    }
    if (statusCode === 404) {
      return i18n.t('notify.notFound').toString();
    }
    if (statusCode.toString().startsWith('5')) {
      return i18n.t('notify.serverError').toString();
    }
    if (statusCode.toString().startsWith('4')) {
      return i18n.t('notify.clientError').toString();
    }
  }

  error(err: any) {
    iziToast.error({
      title: this.getErrorMessageTitle(err?.response?.status),
      message: err?.response?.data?.message || err?.message || i18n.t('notify.unknownError').toString(),
      timeout: 5000,
    });
  }

  success(msg: string | TranslateResult) {
    iziToast.success({
      title: i18n.t('notify.success').toString(),
      message: String(msg),
      timeout: 5000,
    });
  }

  info(msg: string | TranslateResult, title = '') {
    iziToast.info({
      title: title || i18n.t('notify.info').toString(),
      message: String(msg),
      timeout: 5000,
    });
  }
}

export class NotifyPlugin {
  static install(Vue) {
    Vue.prototype.$notify = new Notify();
  }
}

Vue.use(NotifyPlugin);

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify;
  }
}
