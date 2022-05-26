import { createI18n } from 'vue-i18n/index'
import store from '@/store'
import lodash from 'lodash'

const langs = {
  locale: store.state.app.locale,
  messages: {}
}

const moduleFiles = import.meta.globEager('./modules/*/*.js')
const langPattern = /^[a-z]{2,2}-[a-z]{2,2}$/
for (const langFilePath in moduleFiles) {
  const langFile = moduleFiles[langFilePath]
  const path_arr = langFilePath.split('/')
  const lang = path_arr[2]
  const langFileName = path_arr[3]
  const langPackName = langFileName.replace(/\.js$/, '')
  if (lang.match(langPattern)) {
    lodash.set(langs.messages, lang + '.' + langPackName, langFile.default)
  }

  console.log(`[Sancho] Language pack loaded: ${lang} - ${langPackName}`)
}

export function getAvailableLanguages() {
  const langDict = {}
  for (const lang in langs.messages) {
    langDict[lang] = langs.messages[lang].lang ? langs.messages[lang].lang.name : lang
  }
  return langDict
}

const i18n = createI18n(langs)

export function switchLanguage(locale) {
  i18n.locale = locale
  store.dispatch('app/setLocale', locale)
}

export default i18n
