import { checkAllowedStatus } from '@vue-devtools-unlocker/shared';

// Store Vue DevTools unlock status for each tab
const tabStatus: Record<number, unknown> = {};

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'VueDevtoolsStatus' && sender.tab?.id) {
    // Store unlock status for current tab
    tabStatus[sender.tab.id] = message.payload;
    sendResponse({ success: true });
  }
});

// Listen for popup open event
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    port.postMessage({
      type: 'VueDevtoolsStatus',
      payload: {
        loading: true,
      },
    });
    // When popup connects, query the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        const tabId = tabs[0].id;
        let retryCount = 0;
        const MAX_RETRIES = 5; // (5 * 500ms = 2500ms)

        const checkStatus = () => {
          if (tabStatus[tabId]) {
            port.postMessage({
              type: 'VueDevtoolsStatus',
              payload: tabStatus[tabId],
            });
          } else if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(checkStatus, 500);
          } else {
            // 超时后发送错误状态
            port.postMessage({
              type: 'VueDevtoolsStatus',
              payload: {
                success: false,
                message: 'Unable to detect Vue application status. Please refresh the page and try again.',
              },
            });
          }
        };

        checkStatus();
      }
    });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStatus[tabId];
});

chrome.tabs.onUpdated.addListener((tabId, _changeInfo, tab) => {
  delete tabStatus[tabId];
  if (tab.url) {
    checkAllowedStatus(tabId, tab.url);
  }
});
