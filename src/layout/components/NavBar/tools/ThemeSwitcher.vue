<template>
  <el-button class="right-menu-item hover-effect" text trigger="click" @click="toggleThemeMode">
    <svg-icon :icon-class="'theme-' + themeMode" />
  </el-button>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  computed: {
    themeMode() {
      return this.$store.state.app.themeMode
    }
  },
  mounted() {
    this.renderThemeMode()
  },
  methods: {
    toggleThemeMode() {
      const mode = this.themeMode === 'dark' ? 'light' : 'dark'
      this.$store.dispatch('app/setThemeMode', mode)
    },
    renderThemeMode() {
      this.$store.dispatch('app/setThemeMode', this.themeMode)
    }
  }
}
</script>
