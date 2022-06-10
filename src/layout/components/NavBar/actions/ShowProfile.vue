<template>
  <el-dropdown-item>
    <span style="display:block;" @click="$router.push('/profile')">
      <svg-icon icon-class="user" />
      {{$t('common.profile')}}
    </span>
  </el-dropdown-item>
</template>