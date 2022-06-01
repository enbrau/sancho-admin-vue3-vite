import api from '@/api'

export default function(app) {
  return new Promise((resolve) => {
    api.common.fetchDicts()
      .then(res => {
        const dicts = res.data || []
        dicts.convert = function(dictName, dictKey, fallbackDict) {
          const dict = dicts[dictName] || fallbackDict || {}
          return dict[dictKey] || dictKey
        }
        app.config.globalProperties['$dicts'] = dicts
        resolve()
      })
    })
}
