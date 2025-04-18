import { injectScriptFile } from '@vue-devtools-unlocker/shared';

injectScriptFile('injectedScript.js');

window.addEventListener('message', (event) => {
  if (event.data?.source === 'vue-devtools-unlocker') {
    console.log('post message', event.data);
    chrome.runtime.sendMessage(event.data);
  }
});
