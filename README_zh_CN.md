# Sancho Admin Vue3 Vite

[English](README.md) | 中文

## 概述

Sancho Admin Vue3 Vite 是一套开箱即用的为后端管理应用而打造的脚手架，基于 [Sancho Seed Vue3 Vite](https://github.com/enbrau/sancho-seed-vue3-vite) 脚手架以及两套 UI 框架：Element Plus 和 Vant。

## 特性

- 已内置常用功能

  Vue Router, Vuex, I18n, Axios, Mock Server 等已经安装并配置好。 像 dayjs 或 lodash 等常用函数库已加载为 Vue3 全局变量，方便调用。  

- 多种开发和打包模式

- "丢入即可"  

  你可以将 `route`, `store`, `i18n`, `hooks` and `mock` 等类型的文件丢入特定的文件夹，脚手架会自动加载他们。  

- 项目级钩子  

  我们为项目中不同类型的生命周期提供了特定的钩子，比如 `Vue 实例化前` 或 `Axios 请求发送的前后` 等等。  

- 通用函数

## 安装与运行

```
# 安装
npm install

# 基于 Mock Server 开发
npm run dev

# 基于真实后端服务开发
npm run dev:online

# 生产打包
npm build
```

## 项目结构

```
.
├── mock                     # (丢入即可) 测试桩
├── public                   # 静态资源（仅拷贝）
├── src                      # 
    ├── api                  # (丢入即可) Axios API 封装函数
    ├── assets               # 静态资源
    ├── components           # 公共组件
    ├── consts               # 常量
    ├── hooks                # (丢入即可) 钩子
    ├── i18n                 # (丢入即可) 翻译
    ├── layout               # UI 布局
        ├── components       # UI 布局组件 
            ├── NavBar       # UI 布局组件：导航栏
                ├── tools    # (丢入即可) 导航栏工具
                └── ...
            └── ...
        └── ...
    ├── router               # (丢入即可) 路由
    ├── store                # (丢入即可) 状态管理
    ├── utils                # 公共函数
    ├── views                # 视图组件
    ├── App.vue              # 入口组件
    └── main.js              # 入口文件
├── .env.development         # 环境变量：开发环境（离线开发）
├── .env.online              # 环境变量：开发环境（联机开发）
├── .env.production          # 环境变量：生产环境
├── settings.js              # 项目配置文件
├── vite.config.js           # Vite 配置文件
└── ...
```

## 链接

[Vite](https://vitejs.dev/)  [Vue3](https://v3.vuejs.org/)  [Vuex](https://next.vuex.vuejs.org/)  [Vue Router](https://router.vuejs.org/)  [Element-Plus](https://element-plus.gitee.io/)
