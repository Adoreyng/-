<template>
  <div v-if="show" class="Video">
    <div class="show-video">
      <header class="heade">
        <img class="back" title="返回" @click="close" src="../../assets/images/details/back.png" alt />
        <div class="close" @click="close" title="关闭"></div>
      </header>
      <!-- 视频 -->

      <div class="video-content">
        <div class="details-top">
          <h1>{{infoData.name}}</h1>
          <h3>
            {{infoData.organization}}
            <span></span>
            发布于：{{infoData.createTime}}
          </h3>
        </div>
        <video-player
          v-if="detaId==1"
          ref="videoPlayer"
          class="video-player vjs-custom-skin newsVideo"
          :playsinline="true"
          :options="playerOptions"
        />
        <!-- contentType: 0->文本 1-> html 2-> img 3-> 视频 -->
        <el-carousel
          class="banner-list"
          v-if="detaId==2"
          :interval="5000"
          arrow="always"
          indicator-position="none"
        >
          <el-carousel-item :loop="true" v-for="(item,index) in infoData.content" :key="index">
            <img :src="item" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
let that;

export default {
  name:'video-view',
  props: {
    show: Boolean,
    VidoId: Number,
    detaId: Number // 1 法宣小视频  2 法治文化
  },
  watch: {
    // show(val) {
      // if(val){
      //   this.initDetails();
      //   setTimeout(() => {
      //     that.$refs.videoPlayer[0].player.play()
      //   }, 600);
      // }
    // },
    VidoId(val) {
      this.vodoId = val;

      if (this.show) {
        this.initDetails();
      }
    }
  },
  computed: {
  },
  mounted() {},
  created() {
    that = this;
  },
  data() {
    return {
      infoData: {},

      // 视频数据
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: require("../../assets/video/video.mp4") // url地址
          }
        ],
        // poster: './phone.png', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      vodoId: null,
      url: null,
      srcList: [
        "http://yangy-scm.oss-cn-shanghai.aliyuncs.com/philips/product/5833b8ab93a744cbb75b937f3682ea32.png?Expires=1905907981&OSSAccessKeyId=LTAI4FsgbSn3y4GUCwBwmD8s&Signature=oota59HvqKDIhSUc%2F9pXwlUj0iU%3D",
        "http://yangy-scm.oss-cn-shanghai.aliyuncs.com/product/images/cea90418a60e49108f2284abcec802ee.jpg"
      ],
      imageYu: false
    };
  },
  mounted() {},
  methods: {
    close() {
      // this.$refs.videoPlayer[0].player.pause(); // 暂停
      this.$parent.hideVideo();
    },
    // 调用接口
    async initDetails() {
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/rotationCharts/${this.vodoId}`,
        "get"
      );
      this.infoData = res;
      // contentType: 0->文本 1-> html 2-> img 3-> 视频
      // if (res.contentType == 2) {
        // this.infoData.content = JSON.parse(res.content);
        this.infoData.content = JSON.parse(this.infoData.content);
      //   debugger
      // } else 
      if (res.contentType == 3) {
        this.playerOptions.sources[0].src = this.infoData.content;
        setTimeout(() => {
          try {
            that.$refs.videoPlayer[0].player.play();
          } catch (error) {
            that.$refs.videoPlayer.player.play();
          }
        }, 600);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.Video {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2020;
  .show-video {
    width: 1092px;
    height: 630px;
    background-color: #0b2651;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 3.5%;
    background: url("../../assets/images/details/bg.png") no-repeat;
    background-size: 100% 100%;
    .heade {
      width: 100%;
      height: 10%;
      margin-bottom: 15px;
      position: relative;
      .back {
        width: 27px;
        position: absolute;
        left: 1%;
        top: 9%;
        cursor: pointer;
      }
      .close {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 1%;
        top: 7%;
        background: url("../../assets/images/table-scroll/close.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
          background-image: url("../../assets/images/table-scroll/close-act.png");
        }
      }
    }
    .video-content {
      width: 96%;
      height: calc(100% - 12%);
      margin: 2.5%;
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
    }
    .video-player.video-player.vjs-custom-skin {
      display: block;
      margin: 0 auto;
    }
  }
}
@media (min-width: 1440px) {
  .Video {
    .show-video {
      width: 1248px;
      height: 720px;
      .heade {
        .back {
          width: 30px;
          top: 9%;
        }
        .close {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
@media (min-width: 1920px) {
  .Video {
    .show-video {
      width: 1417px;
      height: 839px;
      .heade {
        .back {
          width: 35px;
          top: 10%;
        }
        .close {
          width: 20px;
          height: 20px;
          top: 7%;
        }
      }
    }
  }
}
</style>
<style lang="less">
.Video {
  .vjs-fluid {
    padding-top: 38.5% !important;
  }
  .video-js {
    background: none !important;
    width: 60% !important;
    margin: 0 auto;
  }
  .vjs-tech {
    border: none !important;
  }
  .banner-list {
    width: 60%;
    margin: 0 auto;
    .el-carousel__container {
      height: 350px;
    }
    .el-carousel__item {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px;
    }
    img {
      transform: scale(1) rotate(0deg);
      margin-left: 0px;
      margin-top: 0px;
      max-height: 100%;
      max-width: 100%;
      height: 100%;
    }
    .el-carousel__item {
      background-color: transparent !important;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
@media (min-width: 1440px) {
  .Video {
    .banner-list {
      .el-carousel__container {
        height: 400px;
      }
    }
  }
}
@media (min-width: 1920px) {
  .Video {
    .banner-list {
      .el-carousel__container {
        height: 500px;
      }
    }
  }
}
</style>
