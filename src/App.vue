<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './assets/style/normal.less';
#app {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
body .el-table th.gutter{
    display: table-cell !important;
}
 body .el-table colgroup.gutter{
    display: table-cell !important;
}
.el-table__header{
  width: calc(100% + 17px) !important;
}
.el-message--success {
  z-index: 2022 !important;
}
</style>

