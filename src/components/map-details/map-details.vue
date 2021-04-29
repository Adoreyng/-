<template>
  <div v-if="mapDelShow" class="map-details">
    <div class="details-black">
      <header class="heade">
        <div class="back" title="返回" @click="close"></div>
        <div class="close" title="关闭" @click="close"></div>
      </header>
      <div class="details-content">
        <!-- 地图三级弹框详情页容器 -->
        <div class="map-details-content">
          <div class="info-content-top">
            <!-- <div class="unit-pic"><img :src="dattailsInfo.img" alt=""></div> -->
            <div class="unit-pic">
              <el-image
                class="unit-img"
                fit="contain"
                :src="dattailsInfo.img">
              </el-image>
            </div>
            <div class="info-content-right">
              <p :title="dattailsInfo.name" class="unit-name"><span>名称: </span>{{dattailsInfo.name}}</p>
              <p :title="dattailsInfo.type"><span>类别: </span>{{dattailsInfo.type == 0 ? '民主法治示范村' : '法治文化阵地'}}</p>
              <p :title="dattailsInfo.address"><span>地址: </span>{{dattailsInfo.address}}</p>
              <p :title="dattailsInfo.createTime"><span>时间: </span>{{dattailsInfo.createTime}}</p>
              <p :title="dattailsInfo.director"><span>负责人姓名: </span>{{dattailsInfo.director}}</p>
            </div>
          </div>
          <div class="info-content-bottom"><span>工作特色: </span> {{dattailsInfo.workFeatures}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {JUDICIAL_BACKEND} from '@/utils/baseUrl'
export default {
  name:'map-details',
  props: {
    mapDelId: Number,
    mapDelShow: Boolean
  },
  data() {
    return {
      dattailsInfo: {}
    }
  },
  methods: {
    close() {
      this.$parent.hideMapDetail();
      this.detailsHtml = ''
    },
    async initDetails(id = this.mapDelId){
      let data = await this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites/${id}`, 'get')
      this.$parent.showMapDetail()
      this.dattailsInfo = data.data
    }
  },
  watch: {
    mapDelId (val) {
      if (val) {
        this.initDetails(val)
      }
    }
  }
};
</script>
<style lang="less" scoped>
.map-details {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2020;
  .details-black {
    width: 409px;
    height: 368px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding-bottom: 3.5%;
    background: url('../../assets/images/details/map_bg.png') no-repeat;
    background-size: 100% 100%;
    .heade {
      width: 100%;
      height: 10%;
      margin-bottom: 15px;
      position: relative;
      .back {
        width: 53px;
        height: 27px;
        position: absolute;
        left: 1%;
        top: 0;
        cursor: pointer;
      }
      .close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 1%;
        top: 7%;
        background: url('../../assets/images/table-scroll/close.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
          background-image: url('../../assets/images/table-scroll/close-act.png');
        }
      }
    }
    .details-content {
      width: calc(100% - 24px);
      height: calc(100% - 12%);
      margin: auto;
      .details-top {
        height: 17.5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1 {
          font-size: 20px;
          text-align: center;
          margin-top: 10px;
          line-height: 40px;
          margin-bottom: 8px;
          font-weight: 600;
          color: #fff;
        }
        h3 {
          font-size: 14px;
          text-align: center;
          line-height: 20px;
          color: #fff;
          font-weight: 400;
          span {
            display: inline-block;
            height: 10px;
            text-align: 10px;
            margin: 0 1%;
          }
        }
      }
      .details-white {
        height: calc(100% - 17.5%);
        overflow-y: auto;
        padding: 20px 12%;
        color: #fff;
        p {
          margin-bottom: 2%;
          text-indent: 2em;
          line-height: 24px;
          text-indent: 2rem;
          font-size: 14px;
          color: #000000;
        }
        img {
          width: 85%;
          display: block;
          margin: 0 auto;
        }
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
          background: #153266;
          width: 2px;
        }
        &::-webkit-scrollbar-thumb {
          background: #9ba7b8;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: rgb(162, 162, 163);
        }
      }
      .map-details-content {
        width: 100%;
        margin: 0px auto 0;
        .info-content-top {
          display: flex;
          .unit-pic {
            width: 180px;
            flex: none;
            margin-right: 15px;
            .unit-img {
              display: block;
              width: 100%;
              height: 200px;
            }
          }
          .info-content-right {
            width: calc(100% - 195px);
            height: 200px;
            flex: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
              color: #e0f3f7;
              font-size: 14px;
              line-height: 1.5;
              letter-spacing: 1px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              span {
                color: #7086ac
              }
              &.unit-name {
                font-size: 16px;
                margin-bottom: 5px;
                flex: none;
                color: #b7ecee;
                span {
                  color: #7086ac;
                }
              }
            }
          }
        }
        .info-content-bottom {
          width: 100%;
          height: 75px;
          box-sizing: border-box;
          overflow-y: auto;
          margin-top: 30px;
          border-top: 1px solid #8afcfd;
          padding: 14px 5px;
          font-size: 14px;
          line-height: 1.5;
          letter-spacing: 1px;
          word-break: break-all;
          color: #e0f3f7;
          &::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
            background: #153266;
            width: 2px;
          }
          &::-webkit-scrollbar-thumb {
            background: #9ba7b8;
          }
          &::-webkit-scrollbar-thumb:hover {
            background: rgb(162, 162, 163);
          }
          span {
            color: #7086ac
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-image-viewer__close {
  color: #fff;
}
</style>
