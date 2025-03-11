<p align="center">
  <img src="public/icons/icon_128.png" width="128">
</p>

<div align="center">

[![][chrome-web-store-version]][chrome-web-store-link]
[![][chrome-web-store-size]][chrome-web-store-link]
[![][chrome-web-store-last-updated]][chrome-web-store-link]
[![][github-action-build-shield]][github-action-build-link]
[![][github-license-shield]][github-license-link]

</div>

# Vue DevTools Unlocker
> 一个能够在生产环境中启用 Vue DevTools 的 Chrome 扩展。

## 功能特性

- 🔑 在生产环境中解锁 Vue DevTools
- 🌐 同时支持 Vue 2 和 Vue 3
- 📦 显示 Vue 版本信息

## 安装

[**Chrome** 扩展商店](https://chromewebstore.google.com/detail/vue-devtools-unlocker/fbihgkimpchlnlcnbffhbpcghafemopa)

[//]: # ([**Edge** 扩展商店]&#40;https://chromewebstore.google.com/detail/vue-devtools-unlocker/fbihgkimpchlnlcnbffhbpcghafemopa&#41;)

## 使用方法

1. 从 Chrome 网上应用店安装扩展
2. 访问任何使用 Vue.js 的生产环境网站
3. 打开 Chrome DevTools (F12 或右键点击 "检查")
4. 在 DevTools 中查看 Vue 面板

## 工作原理

该扩展通过修改 Vue 实例的配置，在运行时启用开发者工具，即使在生产环境中也能正常工作。

## 兼容性

- Chrome 88+
- Vue.js 2.x 和 3.x

## 维护者

[@zhensherlock](https://github.com/zhensherlock)。

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/zhensherlock/vue-devtools-unlocker/issues/new/choose) 或者提交一个 Pull Request。

标准 Readme 遵循 [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) 行为规范。

### 贡献者

感谢以下参与项目的人：

<a href="https://github.com/zhensherlock/vue-devtools-unlocker/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zhensherlock/vue-devtools-unlocker" />
</a>

## 使用许可

[MIT](LICENSE) © MichaelSun

[chrome-web-store-link]: https://chromewebstore.google.com/detail/vue-devtools-unlocker/fbihgkimpchlnlcnbffhbpcghafemopa
[chrome-web-store-version]: https://img.shields.io/chrome-web-store/v/fbihgkimpchlnlcnbffhbpcghafemopa?color=1677FF&labelColor=black&logo=chromewebstore&logoColor=white&style=flat-square
[chrome-web-store-size]: https://img.shields.io/chrome-web-store/size/fbihgkimpchlnlcnbffhbpcghafemopa?color=1677FF&labelColor=black&logo=chromewebstore&logoColor=white&style=flat-square
[chrome-web-store-last-updated]: https://img.shields.io/chrome-web-store/last-updated/fbihgkimpchlnlcnbffhbpcghafemopa?color=1677FF&labelColor=black&logo=chromewebstore&logoColor=white&style=flat-square
[github-action-build-link]: https://github.com/zhensherlock/vue-devtools-unlocker/actions/workflows/build.yml
[github-action-build-shield]: https://img.shields.io/github/actions/workflow/status/zhensherlock/vue-devtools-unlocker/build.yml?branch=main&color=1677FF&label=build&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-license-link]: https://github.com/zhensherlock/vue-devtools-unlocker/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/zhensherlock/vue-devtools-unlocker?color=1677FF&labelColor=black&style=flat-square
