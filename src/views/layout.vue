<template>
  <div class="mainBox">
    <!-- <header class="logo">
      <img class="top" src="../assets/images/banner-top.png" />
      <img class="top logo1" src="../assets/images/banner-logo1.png" />
      <img class="top logo2" style="opacity: 0;" src="../assets/images/banner-logo2.png" />
    </header> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  filters: {},
  created() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.mainBox {
  display: block;
  width: 100%;
  min-height: 100vh;
}
.logo {
  background: #efefef;
  height: 9.5vw;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 111;
}
.logo img {
  display: block;
  width: 100%;
}
.peugeot_wrap {
  min-height: 100vh;
  background: #efefef;
}
.logo1 {
  animation: fade 6000ms infinite;
}
.logo2 {
  animation: fade 6000ms 3000ms infinite;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  35% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>