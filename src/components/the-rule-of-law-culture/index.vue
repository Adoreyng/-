<template>
  <div class="the-rule-of-law-culture">
    <PageHeader
      :title="10"
      :en="'The rule of law culture'"
      style="margin-bottom: 0;margin-top: 35px;"
      :color="'rgba(13, 42, 107, 0.35)'"
      :height="heights"
      :more="true"
      @VidoListEvent="VidoListEvent(kind)"
    >
      <div class="panl-content">
        <div id="culture" class="swiper-container" style="margin-bottom: 10px;">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide swiper-slide-top"
              v-for="(item, index) in infoDatas"
              :key="index"
            >
              <div class="video-name">
                <p :title="item.name">{{item.name}}</p>
              </div>
              <img style="display: block" :src="item.url" />
            </div>
          </div>
          <div class="swiper-button-prev-the swiper-button-white"></div>
          <div class="swiper-button-next-the swiper-button-white"></div>
        </div>
        <div id="thumbs1" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide video-box" v-for="(item, index) in infoDatas" :key="index">
              <img style="display: block" :src="item.url" />
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  </div>
</template>
<script>
import Swiper from "../../../node_modules/swiper/js/swiper.min.js";
let that;
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
export default {
  name: "the-rule-of-law-culture",
  data() {
    return {
      swiper: null,
      activeImg: "",
      pageNum: 1, //当前页
      pageSize: 10, //每页条数
      kind: 2, //种类
      sortBy: "desc", //排序字段名
      createTime: "", //时间
      infoDatas: [],
      heights: null,
      activeIndex: 0 // 当前是第几个轮播图
    };
  },
  created() {
    that = this;
  },
  mounted() {
    let winths =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (winths > 1900) {
      this.heights = 374;
    } else {
      this.heights = 0;
    }
    this.initData();
  },
  methods: {
    setSwiper() {
      this.swipers = new Swiper("#culture", {
        // 自动播放
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        spaceBetween: 10,
        loop: true, //无限切换
        thumbs: {
          swiper: {
            el: "#thumbs1",
            spaceBetween: 10,
            slidesPerView: 3,
            watchSlidesVisibility: true /* 避免出现bug */
          },
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-container-thumbs"
        },
        navigation: {
          nextEl: ".swiper-button-next-the",
          prevEl: ".swiper-button-prev-the"
        },
        on: {
          click: function() {
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            // console.log(this); // -> Swiper
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            that.handlerClickEvent(this);
          }
        }
      });
    },
    handlerClickEvent(vm) {
      let index = vm.realIndex
      // // console.log(index);
      // // console.log(this.infoDatas[index]);
      this.$parent.level = 2;
      this.$parent.requestVidoId(this.infoDatas[index].id);
      this.$parent.showVideo(this.kind);
    },
    VidoListEvent(kind) {
      this.$parent.showVidoList(kind);
    },
    // 接口调用
    async initData() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        kind: this.kind,
        sortBy: 'createTime',
        sortBy: this.sortBy
      };
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/rotationCharts`,
        "get",
        data
      );
      // // console.log(res.pager);
      this.infoDatas = res.list;

      setTimeout(() => {
        this.setSwiper();
      }, 500);
    }
  }
};
</script>
<style lang='less' scoped>
.the-rule-of-law-culture {
  .panl-content {
    width: 100%;
    height: 100%;
    // background-color: #061d54;
    .video-list {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  .panl-header {
    color: #7589b2;
    font-size: 13px;
    text-align: center;
    border-bottom: 1px solid #152c5b;
    height: 12%;
  }
}
</style>
<style lang="less">
.the-rule-of-law-culture {
  .swiper-container {
    width: 100%;
    height: auto;
  }
  .swiper-wrapper {
    height: auto;
  }
  .swiper-slide img {
    width: 100%;
    display: block;
  }
  .swiper-container-thumbs .swiper-slide-thumb-active img {
    opacity: 1;
  }
  .swiper-container-thumbs img {
    opacity: 0.5;
  }
  .swiper-slide-top {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    img {
      transition: all 0.5s;
    }
    &:hover {
      img{
        transform: scale(1.1);
      }
    }
    .video-name {
      width: 90%;
      height: 25px;
      position: absolute;
      bottom: 0%;
      left: 2%;
      z-index: 1;
      cursor: pointer;
      p {
        overflow: hidden;
        color: #fff;
        font-size: 13px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .video-box {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    img {
      transition: all 0.5s;
    }
    &:hover {
      img{
        transform: scale(1.1);
      }
    }
    .video {
      width: 100%;
      display: block;
      transition: all 1s;
    }
    .video-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      cursor: pointer;
      img {
        transition: all 0.5s;
        display: block;
        width: 100%;
      }
    }
  }
}
@keyframes btnsc {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
</style>