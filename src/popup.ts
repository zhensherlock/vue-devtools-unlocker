'use strict';

import './popup.css';

(function () {
  // 连接到 background script
  const port = chrome.runtime.connect({ name: 'popup' });
  
  // 监听来自 background 的消息
  port.onMessage.addListener((message) => {
    if (message.type === 'VueDevtoolsStatus') {
      const statusInfo = message.payload;
      
      const statusElement = document.getElementById('test');
      if (statusElement) {
        if (statusInfo.success) {
          statusElement.innerHTML = `
          <div style="color: green;">
            Vue DevTools 已成功解锁！<br>
            Vue 版本: ${statusInfo.vueVersion}
          </div>
        `;
        } else {
          statusElement.innerHTML = `
          <div style="color: red;">
            Vue DevTools 解锁失败：${statusInfo.message || '未知错误'}
          </div>
        `;
        }
      }
    }
  });
  
  // 可以添加一个刷新按钮，让用户手动刷新状态
  const refreshButton = document.getElementById('refreshStatus');
  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'CheckVueDevtools' });
        }
      });
    });
  }
})();
