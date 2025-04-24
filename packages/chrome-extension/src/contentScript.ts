import { injectScriptFile } from '@vue-devtools-unlocker/shared';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CheckIsAllowed' && message.isAllowed) {
    injectScriptFile('injectedScript.js');
    window.addEventListener('message', (event) => {
      if (event.data?.source === 'vue-devtools-unlocker') {
        chrome.runtime.sendMessage(event.data);
      }
    });

    sendResponse({ success: true });
  } else {
    chrome.runtime.sendMessage({
      source: 'vue-devtools-unlocker',
      type: 'VueDevtoolsStatus',
      payload: {
        success: false,
        isNotAllowed: true,
        message: 'This page is not allowed to use Vue DevTools.',
      },
    });
  }
});
