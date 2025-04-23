import '@/popup.scss';

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
          statusElement.className = 'status-container status-success';
          statusElement.innerHTML = `
          <div>
            <h3 style="margin-bottom: 8px; color: var(--success-color);">✅ Unlocked Successfully</h3>
            <p>Vue DevTools has been successfully unlocked!</p>
            <p style="margin-top: 8px;">
              Vue Version: <span class="version-tag">${data.vueVersion || 'Unknown'}</span>
            </p>
          </div>
        `;
        } else {
          statusElement.className = 'status-container status-error';
          statusElement.innerHTML = `
          <div>
            <h3 style="margin-bottom: 8px; color: var(--error-color);">❌ Unlock Failed</h3>
            <p>${data.message || 'Unknown error'}</p>
            <p style="margin-top: 8px; font-size: 12px; color: #666;">
              Please make sure the current page is running a Vue application
            </p>
          </div>
        `;
        }
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('openSettings');
    if (settingsButton) {
      settingsButton.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
      });
    }
  });
})();
