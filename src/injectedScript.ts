import { getVueInstanceWithRetry, unlockVueDevTools } from '@/utils';

const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
if (devtools) {
  const version = window.__VUE__ ? 3 : 2;

  getVueInstanceWithRetry(version).then((res) => {
    if (res) {
      unlockVueDevTools(devtools, version, res);
    }
  });
} else {
  console.warn('Vue DevTools not found.');
}
