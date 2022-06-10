<template>
  <div class="navbar-container">
    <div class="navbar-item" @click="toggleSidebar">
      <svg-icon :icon-class="'hamburger-' + (isSideBarCollapse ? 'on' : 'off')" />
    </div>
    <breadcrumb />
    <div class="right-menu">
      <component :is="$key" v-for="$key in tools" :key="$key" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'
import tools from './tools.js'

export default {
  components: { Breadcrumb, ...tools },
  data() {
    return {
      tools
    }
  },
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
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 10px;
      height: 100%;
      font-size: 18px;
      line-height: var(--sancho-navbar-height);
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: .3s;
      }

      &:focus {
        background-color: transparent !important;
      }
    }
  }
}

.navbar-item {
  display: inline-block;
  padding: 0 10px;
  height: 100%;
  font-size: 18px;
  line-height: var(--sancho-navbar-height);
  vertical-align: text-bottom;
  cursor: pointer;

  &.hover-effect {
    cursor: pointer;
    transition: .3s;
  }
}
</style>
