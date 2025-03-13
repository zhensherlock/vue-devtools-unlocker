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
        use: Function;
      };
      $router?: {
        use: Function;
      };
    }
  };
}

export interface Vue3Instance {
  version: string;
}

export interface VueInstance extends Vue2Instance, Vue3Instance {}
