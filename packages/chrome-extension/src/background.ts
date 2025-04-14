// Store Vue DevTools unlock status for each tab
const tabStatus: Record<number, unknown> = {};

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'VueDevtoolsStatus' && sender.tab?.id) {
    // Store unlock status for current tab
    tabStatus[sender.tab.id] = message.payload;
    console.log(tabStatus);
    sendResponse({ success: true });
  }
});

// Listen for popup open event
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    // When popup connects, query the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        const tabId = tabs[0].id;
        // Send tab status to popup
        port.postMessage({
          type: 'VueDevtoolsStatus',
          payload: tabStatus[tabId] || {
            success: false,
            message: 'No Vue application detected or DevTools not unlocked on this page',
          },
        });
      }
    });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStatus[tabId];
});
