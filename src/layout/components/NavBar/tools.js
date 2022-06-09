import { markRaw } from "vue"

const toolFiles = import.meta.globEager('./tools/*.vue')
const tools = {}
for (const moduleFilePath in toolFiles) {
  const moduleFile = toolFiles[moduleFilePath]
  tools[moduleFilePath] = markRaw(moduleFile.default)
}

export default tools