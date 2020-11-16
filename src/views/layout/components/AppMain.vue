<template>
  <div class="app-main">
    <transition name="fade-transform"
                mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view ref="currentView" />
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>
<script>
export default {
  name: 'AppMain',
  methods: {
    refresh () {
      this.$refs.currentView.refresh()
    }
  }
}
</script>
<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  /* height: 100vh; */

  /* overflow: hidden; */
  /* margin-top: 30px; */
}
</style>
