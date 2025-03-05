interface Window {
  __VUE_DEVTOOLS_GLOBAL_HOOK__: VueDevtoolsHook;
  __VUE__: boolean;
}

interface VueDevtoolsHook {
  enabled?: boolean;
  emit: (event: string, ...args: unknown[]) => void;
}

interface Vue2Instance {
  super?: Vue2Instance;
  version: string;
  config: {
    devtools: boolean;
  };
}

interface Vue3Instance {
  version: string;
}

interface VueInstance extends Vue2Instance, Vue3Instance {}
