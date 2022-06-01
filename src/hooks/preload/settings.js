import api from '@/api'
import settings from '@/../settings.js'
import lodash from 'lodash'

export default function(app) {
  return new Promise((resolve) => {
    api.common.fetchSettings()
      .then(res => {
        const $settings = lodash.extend(settings, res.data || {})
        app.config.globalProperties['$settings'] = $settings
        window.$settings = $settings
        resolve()
      })
    })
}
