'use strict';

// 存储每个 tab 的 Vue DevTools 解锁状态
const tabStatus: Record<number, unknown> = {};

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'VueDevtoolsStatus' && sender.tab?.id) {
    // 存储当前 tab 的解锁状态
    tabStatus[sender.tab.id] = message.payload;
    console.log(tabStatus);
    sendResponse({ success: true });
  }
});

// 监听 popup 打开事件
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    // 当 popup 连接时，查询当前活动的 tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        const tabId = tabs[0].id;
        // 发送该 tab 的状态到 popup
        port.postMessage({
          type: 'VueDevtoolsStatus',
          payload: tabStatus[tabId] || {
            success: false,
            message: '此页面尚未检测到 Vue 应用或尚未解锁 DevTools'
          }
        });
      }
    });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStatus[tabId];
});
