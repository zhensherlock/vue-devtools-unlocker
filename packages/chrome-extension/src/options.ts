import { getAllowedSites, setAllowedSites } from '@vue-devtools-unlocker/shared';
import '@/options.scss';

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('allowedSites') as HTMLTextAreaElement;
  const saveButton = document.getElementById('save') as HTMLButtonElement;

  // Load saved settings
  getAllowedSites((text) => {
    textarea.value = text;
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    const sites = textarea.value
      .split('\n')
      .map((site) => site.trim())
      .filter((site) => site.length > 0);

    setAllowedSites(sites, () => {
      saveButton.textContent = 'Saved!';
      setTimeout(() => {
        saveButton.textContent = 'Save Settings';
      }, 2000);
    });
  });
});
