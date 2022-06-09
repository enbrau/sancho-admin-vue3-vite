<template>
  <div class="view-body-wrapper">
    <ul class="demo-icon-list">
      <li class="icon-item" v-for="icon in icons" :key="icon">
        <span class="demo-svg-icon">
          <svg-icon :icon-class="icon"/>
          <span class="icon-name">{{icon}}</span>
        </span>
      </li>
    </ul>
  </div>
  
</template>

<script>
import { icons } from '@/components'

export default {
  computed: {
    icons() {
      return icons
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0!important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(7,1fr);
  margin: 0;
  line-height: 1.7;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;

  .icon-item {
    display: list-item;
    text-align: center;
    color: var(--el-text-color-regular);
    height: 90px;
    font-size: 13px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);

    &:hover {
      background-color: var(--el-border-color-extra-light);
      color: var(--brand-color-light);
    }

    .demo-svg-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;

      .svg-icon {
        --color: inherit;
        height: 1em;
        width: 1em;
        line-height: 1em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        fill: currentColor;
        color: var(--color);
        font-size: 20px;
      }

      .icon-name {
        margin-top: 8px;
      }
    }
  }
}
</style>
