# Sancho Admin Vue3 Vite

English | [中文](README_zh_CN.md)

## Overview

Sancho Admin Vue3 Vite is an out-of-the-box frontend scalfold for back-stage management which is based on [Sancho Seed Vue3 Vite](https://github.com/enbrau/sancho-seed-vue3-vite), and two different UI library: Element Plus and Vant.

## Features

- Common Function and Libraries Ready

  Vue Router, Vuex, I18n, Axios, Mock Server are installed and configured. Libraries like dayjs or lodash are loaded as Vue3 global properties.

- Multiple Development and Packaging Modes Ready

- Throw-In  

  You can add `route`, `store`, `i18n`, `hooks` and `mock` files in certain folder and the scalfold will automatically load them. 

- Project Hooks  

  We provide several hooks for different kinds of life circles, such as `What to do before Vue initialized` or `What to do before and after axios request`. 

- Utiltity Functions

## Install and Run

```
# Install
npm install

# Run for development with mock server
npm run dev

# Run for development with proxy server
npm run dev:online

# Build for Production
npm build
```

## Project Structure

```
.
├── mock                     # (Throw-In Available) Mock API
├── public                   # Static assets (copy only)
├── src                      # 
    ├── api                  # (Throw-In Available) Axios API functions
    ├── assets               # Static assets
    ├── components           # Common components
    ├── consts               # Constants
    ├── hooks                # (Throw-In Available) Hooks
    ├── i18n                 # (Throw-In Available) Translations
    ├── layout               # UI Layout
        ├── components       # Layout components
            ├── NavBar       # Layout component: NavBar
                ├── tools    # (Throw-In Available) NavBar tools
                └── ...
            └── ...
        └── ...
    ├── router               # (Throw-In Available) Routes
    ├── store                # (Throw-In Available) State management
    ├── utils                # Common functions
    ├── views                # View components
    ├── App.vue              # Entrance component
    └── main.js              # Entrance file
├── .env.development         # Environment parameters for development with mock server
├── .env.online              # Environment parameters for development with proxy server
├── .env.production          # Environment parameters for production
├── settings.js              # Project config file
├── vite.config.js           # Vite config file
└── ...
```

## Links

[Vite](https://vitejs.dev/)  [Vue3](https://v3.vuejs.org/)  [Vuex](https://next.vuex.vuejs.org/)  [Vue Router](https://router.vuejs.org/)
