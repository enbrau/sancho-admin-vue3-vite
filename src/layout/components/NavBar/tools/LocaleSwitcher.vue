<template>
  <el-dropdown class="right-menu-item hover-effect" trigger="click" @command="switchLocale">
    <svg-icon icon-class="locale" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(locale, $key) in locales" :key="$key" :command="$key" :disabled="$key === currentLocale">
          {{ locale }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { getAvailableLanguages, switchLanguage } from '@/i18n'

export default {
  name: 'LocaleSelector',
  computed: {
    currentLocale() {
      return this.$store.state.app.locale
    },
    locales() {
      return getAvailableLanguages()
    }
  },
  methods: {
    switchLocale(locale) {
      switchLanguage(locale)
      location.reload()
    }
  }
}
</script>
