<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="undefined"  />
    </keep-alive>
  </router-view>
</template>

<script>
export default {

}
</script>
