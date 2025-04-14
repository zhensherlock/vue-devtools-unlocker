import { injectScriptFile } from '@vue-devtools-unlocker/shared';

injectScriptFile('injectedScript.js');

window.addEventListener('message', (event) => {
  if (event.data?.source === 'vue-devtools-unlocker') {
    chrome.runtime.sendMessage(event.data);
  }
});
