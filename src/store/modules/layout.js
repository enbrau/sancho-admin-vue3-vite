const ADD_VISITED_VIEW = 'ADD_VISITED_VIEW'
const DEL_VISITED_VIEW = 'DEL_VISITED_VIEW'

const state = {
  visitedViews: []
}

const mutations = {
  [ADD_VISITED_VIEW]: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) {
      return
    }
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  [DEL_VISITED_VIEW]: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  }
}

const actions = {
  addView({ commit }, view) {
    commit(ADD_VISITED_VIEW, view)
  },
  delView({ state }, view) {
    return new Promise(resolve => {
      commit(DEL_VISITED_VIEW, view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
