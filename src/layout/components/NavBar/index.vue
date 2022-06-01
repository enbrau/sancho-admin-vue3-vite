<template>
  <div class="navbar-container">
    <div class="navbar-item" @click="toggleSidebar">
      <svg-icon :icon-class="'hamburger-' + (isSideBarCollapse ? 'on' : 'off')" />
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    isSideBarCollapse() {
      return this.$store.state.app.sidebar === 'collapse'
    }
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app/setSidebarMode', (this.isSideBarCollapse ? '' : 'collapse'))
    }
  }
}
</script>

<style lang="scss">
.navbar-container {
  .navbar-item {
    display: inline-block;
    padding: 0 10px;
    height: 100%;
    font-size: 18px;
    line-height: 50px;
    vertical-align: text-bottom;
    cursor: pointer;
  }
}
</style>
