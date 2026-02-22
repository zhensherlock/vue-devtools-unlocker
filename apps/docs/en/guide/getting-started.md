---
layout: doc
---

# Getting Started

This guide walks you through installing Vue DevTools Unlocker and using it to enable the Vue DevTools panel on production sites.

## Install the extension

Install the extension from your browser’s store:

- [Chrome Web Store](https://chromewebstore.google.com/detail/vue-devtools-unlocker/fbihgkimpchlnlcnbffhbpcghafemopa)
- [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/vue-devtools-unlocker/lehadmjlbmlapdkapjoapbhhbcpcoepd)
- [Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/vue-devtools-unlocker/)

After installation, the Vue DevTools Unlocker icon should appear in your browser toolbar.

## Configure allowed sites

By default, **Allowed Sites** is empty, which means Vue DevTools Unlocker can unlock Vue DevTools on all sites.

If you want to limit where it runs, you can add specific hostnames or domain patterns.

1. Click the Vue DevTools Unlocker icon in the toolbar.
2. Click the **Settings** button in the popup.
3. In **Allowed Sites**, enter the hostnames or patterns where you want to enable Vue DevTools, one per line. Leave it empty to allow all sites.
4. You can use `*` as a wildcard, for example:
   - `*.example.com`
   - `app.your-domain.com`
5. Click **Save Settings**.

## Enable Vue DevTools on a page

Once the extension is installed and the site is allowed:

1. Open a page that uses Vue in production.
2. Make sure the domain matches one of your **Allowed Sites** patterns.
3. Refresh the page after changing the settings.
4. Open your browser’s DevTools (for example, `F12` or “Inspect”).
5. Switch to the **Vue** panel.

If the page is running Vue and the extension successfully unlocked DevTools, the Vue panel will show the app tree and component state.

## Browser support and limitations

- Supports Vue 2 and Vue 3 applications.
- Works in Chrome, Edge, and Firefox.
- Some security‑sensitive pages (for example, certain browser internal pages) cannot be modified by extensions and therefore cannot be unlocked.
