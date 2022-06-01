import request from '@/utils/request'

export function fetchDicts() {
  return request({
    url: '/common/dicts',
    method: 'get'
  })
}

export function fetchSettings() {
  return request({
    url: '/common/settings',
    method: 'get'
  })
}
