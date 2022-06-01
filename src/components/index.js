import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue';

export default {
  install: (app) => {
    app.component('SvgIcon', SvgIcon)
  }
}
