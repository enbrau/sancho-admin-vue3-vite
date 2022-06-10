<template>
  <div class="view-body-wrapper" style="text-align: center; padding-top: 8em;">
    <span style="font-size: 21rem; font-weight: 600; color: var(--el-text-color-secondary);">404</span><br>
    <span style="font-size: 3rem; line-height: 1.25em; font-weight: 500; color: var(--el-text-color-secondary);">
      {{$t('common.tips.page_not_found')}}
    </span><br>
    <span v-html="$t('common.tips.page_not_found_solutions')" style="color: var(--el-text-color-secondary)">
    </span>
  </div>
</template>