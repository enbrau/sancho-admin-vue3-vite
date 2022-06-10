import { markRaw } from "vue"

const actionFiles = import.meta.globEager('./actions/*.vue')
const actions = {}
for (const moduleFilePath in actionFiles) {
  const moduleFile = actionFiles[moduleFilePath]
  actions[moduleFilePath] = markRaw(moduleFile.default)
}

export default actions