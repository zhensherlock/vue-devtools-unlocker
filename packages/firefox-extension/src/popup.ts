import '@/popup.scss';

(function () {
  // Connect to background script
  const port = chrome.runtime.connect({ name: 'popup' });

  // Connect to background script
  port.onMessage.addListener((message) => {
    if (message.type === 'VueDevtoolsStatus') {
      const data = message.payload;

      const statusElement = document.getElementById('status');
      if (!statusElement) {
        return;
      }
      if (data.loading) {
        statusElement.className = 'status-container';
        statusElement.innerHTML = `
          <div class="loading">
            <div class="spinner"></div>
            <span>Checking Vue DevTools status...</span>
          </div>`;
        return;
      }
      if (data.success) {
        statusElement.className = 'status-container status-success';
        statusElement.innerHTML = `
          <div>
            <h3>✅ Unlocked Successfully</h3>
            <p>Vue DevTools has been successfully unlocked!</p>
            <p class="version-info">
              Vue Version: <span class="version-tag">${data.vueVersion || 'Unknown'}</span>
            </p>
          </div>`;
      } else {
        statusElement.className = 'status-container status-error';
        statusElement.innerHTML = `
          <div>
            <h3>❌ Unlock Failed</h3>
            <p>${data.message || 'Unknown error'}</p>
            ${
              data.isNotAllowed
                ? `
            <p class="guide-text">
              To enable Vue DevTools on this page:
              <ol class="guide-steps">
                <li>Click the "Settings" button below</li>
                <li>Add this website to the allowed sites list</li>
                <li>Refresh this page</li>
              </ol>
            </p>`
                : ''
            }
          </div>
        `;
      }
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const settingsButton = document.getElementById('openSettings');
  if (settingsButton) {
    settingsButton.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
    });
  }
});
