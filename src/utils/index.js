import lodash from 'lodash'

export function getCookie(name) {
  return `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift()
}

export function setCookie(name,value){
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*30);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

export function clearCookies() {
  document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
}

export function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function deepClone(source, strict) {
  if (strict) {
    return lodash.deepClone(source)
  }
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
