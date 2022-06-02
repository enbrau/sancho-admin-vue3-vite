<template>
  <div class="sidebar-container">
    <logo v-if="showLogo" :collapse="isCollapse" />
  </div>
</template>

<script>
import settings from '@/../settings'
import Logo from './Logo.vue'

export default {
  components: { Logo },
  computed: {
    showLogo() {
      return settings.layout.showLogo
    },
    isCollapse() {
      return this.$store.state.app.sidebar === 'collapse'
    }
  }
}
</script>