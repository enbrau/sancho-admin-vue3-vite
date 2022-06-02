import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue';

const iconNames = []
const moduleFiles = import.meta.globEager('../icons/*.svg')
for (const moduleFileName in moduleFiles) {
  const iconName = moduleFileName.replace(/^\.\/(.*)\.\w+$/, '$1').replace('../icons/', '').replace('.svg', '')
  iconNames.push(iconName)
  console.log(`[Sancho] Icon loaded: ${iconName}`)
}

export const icons = iconNames

export default {
  install: (app) => {
    app.component('SvgIcon', SvgIcon)
  }
}
