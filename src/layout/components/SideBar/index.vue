<template>
  <div class="sidebar-container">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menus"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import settings from '@/../settings'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

function isDarkMode() {
  return false
}

export default {
  components: { Logo, SidebarItem },
  computed: {
    showLogo() {
      return settings.layout.showLogo
    },
    isCollapse() {
      return this.$store.state.app.sidebar === 'collapse'
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    menus() {
      const menus = []
      const routes = deepClone(this.$store.state.subscriber.routes)
      routes.forEach(route => {
        if (route.isMenu || route.path === 'dashboard') {
          menus.push(route)
        } else if (route.children) {
          for (const croute of route.children) {
            if (croute.isMenu) {
              menus.push(croute)
            }
          }
        }
      })
      return menus
    }
  }
}
</script>

<style lang="scss">
.sidebar-container {
  transition: width 0.28s;
  width: var(--sancho-sidebar-width) !important;
  background-color: var(--el-bg-color-page);
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

    &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .svg-icon {
    margin-right: 16px;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
}

.sidebar-collapse {
  .sidebar-container {
    width: var(--sancho-sidebar-width-collapse) !important;

    .el-menu {
      background-color: transparent;
    }

    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      >div {
        padding: 0 !important;
        padding: 2px 0 !important;

        .svg-icon {
          margin-left: 20px;
          font-size: 22px;
        }
      }
    }

    .el-sub-menu {
      overflow: hidden;

      &>.el-sub-menu__title {
        padding: 0 !important;
        padding: 2px 0 !important;

        .svg-icon {
          margin-left: 20px;
          font-size: 22px;
        }

        .el-sub-menu__icon-arrow {
          display: none;
        }
      }
    }

    .el-menu--collapse {
      .el-sub-menu {
        &>.el-sub-menu__title {
          &>span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
        }
      }
    }
  }

  .el-menu--collapse .el-menu .el-sub-menu {
    min-width: var(--sancho-sidebar-width) !important;
  }
}

.mobile {
  .sidebar-container {
    transition: transform .28s;
    width: var(--sancho-sidebar-width) !important;
  }

  &.sidebar-hide {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-var(--sancho-sidebar-width), 0, 0);
    }
  }
}
</style>
