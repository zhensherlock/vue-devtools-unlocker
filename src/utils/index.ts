export const getVueInstance = (version: number): any | undefined => {
  const vueKey = version === 2 ? '__vue__' : '__vue_app__';
  const elements = Array.from(document.querySelectorAll<(HTMLElement & Record<string, any>)>('*'));
  return elements.find((element) => element[vueKey])?.[vueKey];
};

export const injectScriptFile = (filePath: string) => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(filePath);
  (document.head || document.documentElement).appendChild(script);
  script.onload = () => script.remove();
};

export const getVueInstanceWithRetry = async (
  version: number,
  maxRetries: number = 10,
  interval: number = 1000
): Promise<any | undefined> => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const vueInstance = getVueInstance(version);

      if (vueInstance !== undefined) {
        return vueInstance;
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    } catch (error) {
      console.error(`Failed to get Vue instance (attempt ${attempt + 1}):`, error);
    }
  }

  console.warn('Max retries reached. Vue instance not found.');
  return undefined;
};

export const unlock = (version: number, vue: any) => {
  const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  if (version === 2) {
    vue = Object.getPrototypeOf(vue).constructor;
    while (vue.super) {
      vue = vue.super;
    }
    vue.config.devtools = true;
    devtools.emit('init', vue);
  } else {
    devtools.enabled = true;
    const version = vue.version;
    devtools.emit('app:init', vue, version, {
      Fragment: Symbol.for('v-fgt'),
      Text: Symbol.for('v-txt'),
      Comment: Symbol.for('v-cmt'),
      Static: Symbol.for('v-stc'),
    });
  }
}
