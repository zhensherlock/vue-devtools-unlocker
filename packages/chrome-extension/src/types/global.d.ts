import type { VueDevtoolsHook } from '@vue-devtools-unlocker/shared';

declare global {
  interface Window {
    __VUE_DEVTOOLS_GLOBAL_HOOK__: VueDevtoolsHook;
    __VUE__: boolean;
  }
}
