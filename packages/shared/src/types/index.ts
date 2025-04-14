export interface VueDevtoolsHook {
  enabled?: boolean;
  emit: (event: string, ...args: unknown[]) => void;
}

export interface Vue2Instance {
  super?: Vue2Instance;
  version: string;
  config: {
    devtools: boolean;
    globalProperties: {
      $pinia?: {
        use: () => void;
      };
      $router?: {
        use: () => void;
      };
    };
  };
}

export interface Vue3Instance {
  version: string;
}

export interface VueInstance extends Vue2Instance, Vue3Instance {}
