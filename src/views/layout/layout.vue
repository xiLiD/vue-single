<template>
  <div>
    <app-main ref="appMain"
              class='app-main' />
  </div>
</template>
<script>
import { AppMain } from "./components";
export default {
  name: "Layout",
  components: {
    AppMain
  },
  methods: {
    refreshPage () {
      this.$refs.appMain.refresh();
    }
  }
};
</script>
<style lang="less" scoped>
</style>
