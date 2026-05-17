import type { PiniaInstance, PiniaStore, Vue2Instance, VueDevtoolsHook, VueInstance } from '@/types';

type UnknownRecord = Record<string, unknown>;
type PropertyPath = Array<string | number>;

interface DevtoolsInspectorNode {
  id: string;
  label: string;
  tags?: Array<{
    label: string;
    textColor: number;
    backgroundColor: number;
  }>;
}

interface DevtoolsInspectorStateEntry {
  editable: boolean;
  key: string;
  value: unknown;
}

interface DevtoolsInspectorTreePayload {
  app?: VueInstance;
  inspectorId: string;
  filter?: string;
  rootNodes: DevtoolsInspectorNode[];
}

interface DevtoolsInspectorStatePayload {
  app?: VueInstance;
  inspectorId: string;
  nodeId: string;
  state?: Record<string, DevtoolsInspectorStateEntry[]>;
}

interface DevtoolsEditInspectorStatePayload {
  app?: VueInstance;
  inspectorId: string;
  nodeId: string;
  path: PropertyPath;
  state: {
    value: unknown;
  };
  set?: (target: unknown, path: PropertyPath, value: unknown) => void;
}

interface DevtoolsPluginApi {
  addInspector: (options: UnknownRecord) => void;
  notifyComponentUpdate?: () => void;
  sendInspectorState: (inspectorId: string) => void;
  sendInspectorTree: (inspectorId: string) => void;
  on: {
    editInspectorState: (handler: (payload: DevtoolsEditInspectorStatePayload) => void) => void;
    getInspectorState: (handler: (payload: DevtoolsInspectorStatePayload) => void) => void;
    getInspectorTree: (handler: (payload: DevtoolsInspectorTreePayload) => void) => void;
  };
}

const PINIA_INSPECTOR_ID = 'vue-devtools-unlocker:pinia';
const PINIA_ROOT_ID = '_root';
const PINIA_ROOT_LABEL = 'Pinia (root)';
const PINIA_UNLOCKER_KEY = '__vueDevtoolsUnlockerPinia';
const PINIA_STORE_UNLOCKER_KEY = '__vueDevtoolsUnlockerPiniaStore';

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === 'object' && value !== null;
};

const isPiniaInstance = (value: unknown): value is PiniaInstance => {
  return isRecord(value) && value._s instanceof Map && isRecord(value.state) && isRecord(value.state.value);
};

const isPiniaStore = (value: unknown): value is PiniaStore => {
  return isRecord(value) && typeof value.$id === 'string' && isRecord(value.$state);
};

const getPiniaStores = (pinia: PiniaInstance): PiniaStore[] => {
  return Array.from(pinia._s?.values() ?? []).filter(isPiniaStore);
};

const setByPath = (target: unknown, path: PropertyPath, value: unknown) => {
  if (!isRecord(target) || path.length === 0) {
    return;
  }

  let current: unknown = target;
  for (const key of path.slice(0, -1)) {
    if (!isRecord(current)) {
      return;
    }
    current = current[key];
  }

  if (!isRecord(current)) {
    return;
  }

  current[path[path.length - 1]] = value;
};

const normalizeInspectorPath = (path: PropertyPath) => {
  return path[0] === 'state' ? path.slice(1) : path;
};

const formatPiniaTreeNode = (store: PiniaStore | PiniaInstance): DevtoolsInspectorNode => {
  if (isPiniaStore(store)) {
    return {
      id: store.$id,
      label: store.$id,
    };
  }

  return {
    id: PINIA_ROOT_ID,
    label: PINIA_ROOT_LABEL,
  };
};

const formatStoreState = (store: PiniaStore): Record<string, DevtoolsInspectorStateEntry[]> => {
  const state: Record<string, DevtoolsInspectorStateEntry[]> = {
    state: Object.keys(store.$state).map((key) => ({
      editable: true,
      key,
      value: store.$state[key],
    })),
  };

  const getterNames = Array.isArray(store._getters) ? store._getters.filter((key) => typeof key === 'string') : [];
  if (getterNames.length > 0) {
    state.getters = getterNames.map((key) => ({
      editable: false,
      key,
      value: store[key],
    }));
  }

  return state;
};

const formatPiniaRootState = (pinia: PiniaInstance): Record<string, DevtoolsInspectorStateEntry[]> => {
  return {
    state: getPiniaStores(pinia).map((store) => ({
      editable: true,
      key: store.$id,
      value: pinia.state?.value[store.$id] ?? store.$state,
    })),
  };
};

const notifyPiniaInspector = (api: DevtoolsPluginApi) => {
  api.notifyComponentUpdate?.();
  api.sendInspectorTree(PINIA_INSPECTOR_ID);
  api.sendInspectorState(PINIA_INSPECTOR_ID);
};

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

export const getAllowedSites = (callback: (text: string) => void) => {
  chrome.storage.sync.get('allowedSites', (result) => {
    if (result.allowedSites) {
      const text = (result.allowedSites as string[])?.join('\n') || '';
      callback(text);
    }
  });
};

export const setAllowedSites = (allowedSites: string[], callback: () => void) => {
  chrome.storage.sync.set({ allowedSites }, () => {
    callback();
  });
};

export const checkAllowedStatus = (tabId: number, url: string) => {
  chrome.storage.sync.get({ allowedSites: [] }, (data) => {
    const allowedSites = data.allowedSites as string[];
    const isAllowed = isUrlAllowed(url, allowedSites);

    chrome.tabs.sendMessage(tabId, { type: 'CheckIsAllowed', isAllowed }).catch(() => {});
  });
};

export const isUrlAllowed = (url: string, allowedDomains: string[]) => {
  if (!allowedDomains || allowedDomains.length === 0) {
    return true;
  }

  try {
    const hostname = new URL(url).hostname;

    return allowedDomains.some((domainPattern) => {
      if (domainPattern.startsWith('*.')) {
        const baseDomain = domainPattern.substring(2);
        return hostname === baseDomain || hostname.endsWith('.' + baseDomain);
      }
      return hostname === domainPattern;
    });
  } catch {
    console.error('Invalid URL:', url);
    return false;
  }
};

export const unlockPinia = (devtools: VueDevtoolsHook, vueInstance: VueInstance) => {
  const pinia = vueInstance?.config?.globalProperties?.$pinia;
  if (!isPiniaInstance(pinia)) {
    return;
  }

  if (pinia[PINIA_UNLOCKER_KEY]) {
    return;
  }
  pinia[PINIA_UNLOCKER_KEY] = true;

  const registerStore = (api: DevtoolsPluginApi, store: PiniaStore) => {
    if (store[PINIA_STORE_UNLOCKER_KEY]) {
      return;
    }

    store[PINIA_STORE_UNLOCKER_KEY] = true;
    store.$subscribe?.(() => notifyPiniaInspector(api), { detached: true });
    notifyPiniaInspector(api);
  };

  devtools.emit(
    'devtools-plugin:setup',
    {
      id: 'vue-devtools-unlocker.pinia',
      label: 'Pinia',
      logo: 'https://pinia.vuejs.org/logo.svg',
      packageName: 'pinia',
      homepage: 'https://pinia.vuejs.org',
      componentStateTypes: getPiniaStores(pinia).map((store) => `Pinia ${store.$id}`),
      app: vueInstance,
    },
    (api: DevtoolsPluginApi) => {
      api.addInspector({
        id: PINIA_INSPECTOR_ID,
        label: 'Pinia',
        icon: 'storage',
        treeFilterPlaceholder: 'Search stores',
        nodeActions: [
          {
            icon: 'restore',
            tooltip: 'Reset store state',
            action: (nodeId: string) => {
              const store = pinia._s?.get(nodeId);
              if (store?.$reset) {
                store.$reset();
                notifyPiniaInspector(api);
              }
            },
          },
        ],
      });

      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId !== PINIA_INSPECTOR_ID || (payload.app && payload.app !== vueInstance)) {
          return;
        }

        const filter = payload.filter?.toLowerCase();
        const stores = getPiniaStores(pinia);
        const nodes = [formatPiniaTreeNode(pinia), ...stores.map(formatPiniaTreeNode)];
        payload.rootNodes = filter ? nodes.filter((node) => node.label.toLowerCase().includes(filter)) : nodes;
      });

      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== PINIA_INSPECTOR_ID || (payload.app && payload.app !== vueInstance)) {
          return;
        }

        if (payload.nodeId === PINIA_ROOT_ID) {
          payload.state = formatPiniaRootState(pinia);
          return;
        }

        const store = pinia._s?.get(payload.nodeId);
        if (store) {
          payload.state = formatStoreState(store);
        }
      });

      api.on.editInspectorState((payload) => {
        if (payload.inspectorId !== PINIA_INSPECTOR_ID || (payload.app && payload.app !== vueInstance)) {
          return;
        }

        const path = normalizeInspectorPath(payload.path);
        const set = payload.set ?? setByPath;

        if (payload.nodeId === PINIA_ROOT_ID) {
          set(pinia.state?.value, path, payload.state.value);
        } else {
          const store = pinia._s?.get(payload.nodeId);
          if (store) {
            set(store.$state, path, payload.state.value);
          }
        }

        notifyPiniaInspector(api);
      });

      getPiniaStores(pinia).forEach((store) => registerStore(api, store));
      pinia.use?.(({ store }) => registerStore(api, store));

      const globalTarget = globalThis as typeof globalThis & {
        $pinia?: PiniaInstance;
      };
      globalTarget.$pinia = pinia;
      notifyPiniaInspector(api);
    }
  );
};

export const unlockRouter = (vueInstance: VueInstance) => {
  if (!vueInstance?.config?.globalProperties?.$router) {
    return;
  }
  // const router = vueInstance?.config?.globalProperties?.$router;
  // addDevtools(router);
  // console.log(router);
};

export const unlockVueDevTools = (devtools: VueDevtoolsHook, version: number, vueInstance: VueInstance) => {
  let vueVersion: string;
  if (version === 3) {
    // Vue 3
    vueVersion = vueInstance.version;
    devtools.enabled = true;
    devtools.emit('app:init', vueInstance, vueVersion, {
      Fragment: Symbol.for('v-fgt'),
      Text: Symbol.for('v-txt'),
      Comment: Symbol.for('v-cmt'),
      Static: Symbol.for('v-stc'),
    });
    unlockPinia(devtools, vueInstance);
    // unlockRouter(vueInstance);
  } else {
    // Vue 2
    let vue2Constructor = Object.getPrototypeOf(vueInstance).constructor as Vue2Instance;
    while (vue2Constructor.super) {
      vue2Constructor = vue2Constructor.super;
    }
    vueVersion = vue2Constructor.version;
    vue2Constructor.config.devtools = true;
    devtools.emit('init', vue2Constructor);
  }
  return {
    vueVersion,
  };
};
