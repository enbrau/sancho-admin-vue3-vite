<template>
  <div class="navbar-container">
    <div class="navbar-item" @click="toggleSidebar">
      <svg-icon :icon-class="'hamburger-' + (isSideBarCollapse ? 'on' : 'off')" />
    </div>
    <breadcrumb />
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'

export default {
  components: { Breadcrumb },
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
    line-height: var(--sancho-navbar-height);
    vertical-align: text-bottom;
    cursor: pointer;
  }
}
</style>
