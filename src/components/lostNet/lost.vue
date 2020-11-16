<template>
  <div class="net-wrapper"
       v-show="modalShow">
    <div>
      <el-image class="net-logo"
                :src="img"
                fit="contain"></el-image>
    </div>
    <div>
      <p>{{ title }}</p>
    </div>
    <div @click="toload">
      <el-button plain>重新加载</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: require("./imgs/lost-network.png"),
      modalShow: false,
      title: ""
    };
  },
  inject: ["reload"],
  methods: {
    toload () {
      // location.reload();
      // console.log(this.reload);
      this.reload();
    },
    show (title) {
      // console.log("show");
      this.title = title;
      this.modalShow = true;
    },
    hide () {
      // console.log("hide");
      this.modalShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.net-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 10rem;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  > div {
    margin-top: 1rem;
  }
}
.net-logo {
  width: 5rem;
  height: 5rem;
}
</style>
