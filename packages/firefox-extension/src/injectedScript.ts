import { getVueInstanceWithRetry, unlockVueDevTools } from '@vue-devtools-unlocker/shared';

const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

const postMessageToExtension = (type: string = 'VueDevtoolsMessage', payload: unknown) => {
  window.postMessage({
    source: 'vue-devtools-unlocker',
    type,
    payload,
  }, '*');
};

if (devtools) {
  const version = window.__VUE__ ? 3 : 2;

  getVueInstanceWithRetry(version).then((instance) => {
    if (instance) {
      const { vueVersion } = unlockVueDevTools(devtools, version, instance);
      postMessageToExtension('VueDevtoolsStatus', {
        success: true,
        message: 'Vue DevTools unlocked successfully.',
        vueVersion,
      });
    } else {
      postMessageToExtension('VueDevtoolsStatus', {
        success: false,
        message: 'Vue instance not found.',
      });
    }
  });
} else {
  postMessageToExtension('VueDevtoolsStatus', {
    success: false,
    message: 'Vue DevTools not found.'
  });
}
