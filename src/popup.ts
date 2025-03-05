'use strict';

import './popup.css';

(function () {
  // Connect to background script
  const port = chrome.runtime.connect({ name: 'popup' });

  // Connect to background script
  port.onMessage.addListener((message) => {
    if (message.type === 'VueDevtoolsStatus') {
      const data = message.payload;

      const statusElement = document.getElementById('status');
      if (statusElement) {
        if (data.success) {
          statusElement.innerHTML = `
          <div>
            Vue DevTools unlocked successfully.<br>
            Vue Version: ${data.vueVersion}
          </div>
        `;
        } else {
          statusElement.innerHTML = `
          <div>
            Vue DevTools unlock failed: ${data.message || 'Unknown error'}
          </div>
        `;
        }
      }
    }
  });
  // You can add a refresh button to let users manually refresh the status
  // const refreshButton = document.getElementById('refreshStatus');
  // if (refreshButton) {
  //   refreshButton.addEventListener('click', () => {
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       if (tabs[0] && tabs[0].id) {
  //         chrome.tabs.sendMessage(tabs[0].id, { type: 'CheckVueDevtools' });
  //       }
  //     });
  //   });
  // }
})();
