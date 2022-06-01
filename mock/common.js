import settings from './data/settings.json'
import dicts from './data/dicts.json'

export default [
  {
    url: '/common/dicts',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        flag: 0,
        data: dicts,
        msg: null
      }
    }
  },
  {
    url: '/common/settings',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        flag: 0,
        data: settings,
        msg: null
      }
    }
  }
]