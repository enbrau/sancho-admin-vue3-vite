<template>
  <div class="navbar-container">
    <div class="navbar-item" @click="toggleSidebar">
      <svg-icon :icon-class="'hamburger-' + (isSideBarCollapse ? 'on' : 'off')" />
    </div>
    <breadcrumb />
    <div class="right-menu">
      <component :is="$key" v-for="$key in tools" :key="$key" />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :class="'user-avatar' + (isCancelImpersonateEnabled ? ' impersonate' : '')">
            <svg-icon v-if="!isCancelImpersonateEnabled" icon-class="male" />
            <svg-icon v-else icon-class="spy" />
          </el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="sancho-user-menu">
            <component :is="$key" v-for="$key in actions" :key="$key" />
            <el-divider style="margin: 0px;"></el-divider>
            <el-dropdown-item>
              <span style="display:block;" @click="logout">
                <svg-icon icon-class="exit" />
                {{ $t('common.logout') }}
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'
import tools from './tools.js'
import actions from './actions.js'

export default {
  components: { Breadcrumb, ...tools, ...actions },
  data() {
    return {
      tools,
      actions
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

      span {
        display: block;
      }

      &.hover-effect {
        cursor: pointer;
        transition: .3s;
      }

      &:focus {
        background-color: transparent !important;
      }

      &:hover {
        background-color: var(--el-fill-color-light);
      }
    }

    .avatar-container {

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;

           &.impersonate {
             background-color: var(--el-color-danger);
           }
        }

        .el-icon {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
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
