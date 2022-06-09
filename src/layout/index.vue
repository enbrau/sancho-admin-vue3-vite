<template>
  <div class="app-wrapper" :class="appStatus">
    <side-bar />
    <div class="view-container">
      <div class="view-head">
        <nav-bar />
        <tag-bar />
      </div>
      <div class="view-body">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="undefined"  />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import TagBar from './components/TagBar/index.vue'

export default {
  components: { SideBar, NavBar, TagBar },
  computed: {
    appStatus() {
      return {
        'sidebar-collapse': this.$store.state.app.sidebar === 'collapse'
      }
    }
  },
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .sidebar-container {
    transition: width 0.28s;
    width: var(--sancho-sidebar-width);
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .view-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: var(--sancho-sidebar-width);
    position: relative;

    .view-head {
      .navbar-container {
        height: var(--sancho-navbar-height);
      }
      .tagbar-container {
        height: var(--sancho-tagbar-height);
      }
    }
  }

  &.sidebar-collapse {
    .sidebar-container {
      width: var(--sancho-sidebar-width-collapse);
    }

    .view-container {
      margin-left: var(--sancho-sidebar-width-collapse);
    }
  }
}

.mobile {
  .main-container {
    margin-left: 0px;
  }
}
</style>
