import { AsyncParallelHook, SyncHook } from '@/utils/tapable'

function createHook(hookObject, hookType, hooks, tapMethod) {
  for (const hookFilePath in hooks) {
    const hook = hooks[hookFilePath]
    const hookFunc = hook.default
    const hookName = hookFilePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace(`${hookType}/`, '')
    hookObject[tapMethod](hookName, (param) => {
      return hookFunc(param)
    })

    console.log(`[Sancho] Hook added: ${hookType} - ${hookName}`)
  }
  return hookObject
}

export const preloadHook  = createHook(new AsyncParallelHook(['app']), 'preload',  import.meta.globEager('./preload/*.js'),  'tapPromise')
export const requestHook  = createHook(new SyncHook(['request']),      'request',  import.meta.globEager('./request/*.js'),  'tap')
export const responseHook = createHook(new SyncHook(['response']),     'response', import.meta.globEager('./response/*.js'), 'tap')
export const errorHook    = createHook(new SyncHook(['error']),        'error',    import.meta.globEager('./error/*.js'),    'tap')
export const beforeRouteHook = createHook(new AsyncParallelHook(['to', 'from', 'next']), 'beforeRoute', import.meta.globEager('./beforeRoute/*.js'),  'tapPromise')
export const afterRouteHook  = createHook(new AsyncParallelHook(['route']),              'afterRoute',  import.meta.globEager('./afterRoute/*.js'),   'tapPromise')
