import type { Vue2Instance, VueDevtoolsHook, VueInstance } from '@/types';

const getVueInstance = (version: number): VueInstance | undefined => {
  const vueKey = version === 2 ? '__vue__' : '__vue_app__';
  const elements = Array.from(document.querySelectorAll<HTMLElement & Record<string, unknown>>('*'));
  return elements.find((element) => element[vueKey])?.[vueKey] as VueInstance | undefined;
};

export const injectScriptFile = (filePath: string) => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(filePath);
  (document.head || document.documentElement).appendChild(script);
  script.onload = () => script.remove();
};

export const getVueInstanceWithRetry = async (
  version: number,
  maxRetries: number = 2,
  interval: number = 1000
): Promise<VueInstance | undefined> => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const vueInstance = getVueInstance(version);

    if (vueInstance !== undefined) {
      return vueInstance;
    }

    if (attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }

  return undefined;
};

export const unlockPinia = (vueInstance: VueInstance) => {
  if (!vueInstance?.config?.globalProperties?.$pinia) {
    return;
  }
  const pinia = vueInstance?.config?.globalProperties?.$pinia;
  console.log(pinia);
  // pinia.use(devtoolsPlugin);
  // registerPiniaDevtools(vueInstance, pinia);
};

export const unlockRouter = (vueInstance: VueInstance) => {
  if (!vueInstance?.config?.globalProperties?.$router) {
    return;
  }
  const router = vueInstance?.config?.globalProperties?.$router;
  // addDevtools(router);
  // console.log(router);
};

export const unlockVueDevTools = (devtools: VueDevtoolsHook, version: number, vueInstance: VueInstance) => {
  let vueVersion: string;
  if (version === 3) {
    // Vue 3
    vueVersion = vueInstance.version
    devtools.enabled = true;
    devtools.emit('app:init', vueInstance, vueVersion, {
      Fragment: Symbol.for('v-fgt'),
      Text: Symbol.for('v-txt'),
      Comment: Symbol.for('v-cmt'),
      Static: Symbol.for('v-stc'),
    });
    // unlockPinia(vueInstance);
    // unlockRouter(vueInstance);
  } else {
    // Vue 2
    let vue2Constructor = Object.getPrototypeOf(vueInstance).constructor as Vue2Instance;
    while (vue2Constructor.super) {
      vue2Constructor = vue2Constructor.super;
    }
    vueVersion = vue2Constructor.version
    vue2Constructor.config.devtools = true;
    devtools.emit('init', vue2Constructor);
  }
  return {
    vueVersion
  }
};
