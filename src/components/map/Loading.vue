<template>
  <div class="ladingBox">
    <img src="./reset.png">
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang="less">
  @-webkit-keyframes changeright {
    0% {
      -webkit-transform: rotate(0deg)
    }
    50% {
      -webkit-transform: rotate(-180deg)
    }
    100% {
      -webkit-transform: rotate(-360deg)
    }
  }
  .ladingBox {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    > img {
      width: 80px;
      height: 80px;
      -webkit-animation:changeright 2s linear infinite;
    }
  }
</style>
