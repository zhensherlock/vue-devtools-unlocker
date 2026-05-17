export interface VueDevtoolsHook {
  enabled?: boolean;
  emit: (event: string, ...args: unknown[]) => void;
}

export interface PiniaStore {
  $id: string;
  $state: Record<string, unknown>;
  $patch?: (partialStateOrMutator: Record<string, unknown> | ((state: Record<string, unknown>) => void)) => void;
  $reset?: () => void;
  $subscribe?: (
    callback: (mutation: unknown, state: unknown) => void,
    options?: {
      detached?: boolean;
    }
  ) => () => void;
  [key: string]: unknown;
}

export interface PiniaInstance {
  _s?: Map<string, PiniaStore>;
  state?: {
    value: Record<string, unknown>;
  };
  use?: (
    plugin: (context: {
      app: VueInstance;
      store: PiniaStore;
      pinia: PiniaInstance;
      options: Record<string, unknown>;
    }) => void
  ) => PiniaInstance;
  [key: string]: unknown;
}

export interface Vue2Instance {
  super?: Vue2Instance;
  version: string;
  config: {
    devtools: boolean;
    globalProperties: {
      $pinia?: PiniaInstance;
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
