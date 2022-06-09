import { SESSION_STORAGE_KEYS } from "@/consts"
import { isSystemDarkMode } from '@/utils'
import settings from '@/../settings'

const SET_WINDOW_INNER_HEIGHT = 'SET_WINDOW_INNER_HEIGHT'
const SET_WINDOW_INNER_WIDTH  = 'SET_WINDOW_INNER_WIDTH'
const SET_LOCALE              = 'SET_LOCALE'
const SET_THEME_MODE          = 'SET_THEME_MODE'
const SET_SIDEBAR_MODE        = 'SET_SIDEBAR_MODE'

const state = {
  windowInnerWidth: window.innerWidth,
  windowInnerHeight: window.innerHeight,
  size: 'default',
  locale: (window.sessionStorage.getItem(SESSION_STORAGE_KEYS.LOCALE) || navigator.language || navigator.userLanguage || 'zh-cn').toLowerCase(),
  themeMode: window.sessionStorage.getItem(SESSION_STORAGE_KEYS.THEME_MODE) || (isSystemDarkMode() ? 'dark' : 'light'),
  sidebar: window.sessionStorage.getItem(SESSION_STORAGE_KEYS.SIDEBAR_MODE) || settings.layout.defaultSideBarMode || 'collapse'
}

const mutations = {
  [SET_WINDOW_INNER_HEIGHT]: (state, windowInnerHeight) => {
    state.windowInnerHeight = windowInnerHeight
  },
  [SET_WINDOW_INNER_WIDTH]: (state, windowInnerWidth) => {
    state.windowInnerWidth = windowInnerWidth
  },
  [SET_LOCALE]: (state, locale) => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.LOCALE, locale.toLowerCase())
    state.locale = locale
  },
  [SET_THEME_MODE]: (state, themeMode) => {
    state.themeMode = themeMode
  },
  [SET_SIDEBAR_MODE]: (state, sidebar) => {
    state.sidebar = sidebar
  },
}

const actions = {
  updateWindowSize({ commit }) {
    commit(SET_WINDOW_INNER_HEIGHT, window.innerHeight)
    commit(SET_WINDOW_INNER_WIDTH, window.innerWidth)
  },
  setLocale({ commit }, locale) {
    commit(SET_LOCALE, locale)
  },
  setThemeMode({ commit }, themeMode) {
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.THEME_MODE, themeMode)
    commit(SET_THEME_MODE, themeMode)
  },
  setSidebarMode({ commit }, sidebarMode) {
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.SIDEBAR_MODE, sidebarMode)
    commit(SET_SIDEBAR_MODE, sidebarMode)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
