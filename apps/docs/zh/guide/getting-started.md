---
layout: doc
---

# 入门指南

本页将带你完成 Vue DevTools Unlocker 的安装与使用，在生产环境页面中启用 Vue DevTools 面板。

## 安装扩展

从浏览器扩展商店安装 Vue DevTools Unlocker：

- [Chrome 扩展商店](https://chromewebstore.google.com/detail/vue-devtools-unlocker/fbihgkimpchlnlcnbffhbpcghafemopa)
- [Edge 扩展商店](https://microsoftedge.microsoft.com/addons/detail/vue-devtools-unlocker/lehadmjlbmlapdkapjoapbhhbcpcoepd)
- [Firefox 扩展商店](https://addons.mozilla.org/zh-CN/firefox/addon/vue-devtools-unlocker/)

安装完成后，你应该能在浏览器工具栏中看到 Vue DevTools Unlocker 图标。

## 配置允许站点

默认情况下，**Allowed Sites（允许站点）** 为空，表示 Vue DevTools Unlocker 可以在所有站点上解锁 Vue DevTools。

如果你希望限制生效范围，可以填写特定主机名或域名规则。

1. 点击浏览器工具栏中的 Vue DevTools Unlocker 图标。
2. 在弹出的面板中点击「Settings」按钮。
3. 在 **Allowed Sites（允许站点）** 文本框中，一行一个地填写你希望启用 Vue DevTools 的主机名或规则。留空则表示所有站点均生效。
4. 支持使用 `*` 通配符，例如：
   - `*.example.com`
   - `app.your-domain.com`
5. 点击「Save Settings」保存设置。

## 在页面上启用 Vue DevTools

配置好允许站点后，在目标页面上启用 Vue DevTools 的步骤如下：

1. 打开一个使用 Vue 的生产环境页面。
2. 确认当前域名匹配你在 **Allowed Sites** 中配置的规则。
3. 如果刚修改完设置，请刷新页面。
4. 打开浏览器开发者工具（例如按下 `F12` 或右键选择「检查」）。
5. 切换到 **Vue** 面板。

如果页面确实在运行 Vue，且扩展已成功解锁 DevTools，你会在 Vue 面板中看到应用树和组件状态。

## 浏览器支持与限制

- 支持 Vue 2 与 Vue 3 应用。
- 支持 Chrome、Edge 与 Firefox 浏览器。
- 某些安全敏感页面（例如部分浏览器内部页面）不允许被扩展修改，因此无法被解锁。
