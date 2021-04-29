<template>
  <div class="swiperBox">
    <PageHeader
      :title="7"
      :en="'LEGAL COLUMN'"
      :color="'rgba(13, 42, 107, 0.3)'"
      :more="true"
      :active="active"
      :height="heights"
      @requestMore="requestMore"
      @handlerTitleClick="handlerTitleClick"
    >
      <!-- <div id="legal-column1" class="swiper-container" v-if="isShowSwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            @click="detailsEvent"
            v-for="item in dataList"
            :key="item.title"
          >
            <div class="mask">
              <img :src="item.icon" alt />
            </div>
            <p>{{item.title}}</p>
          </div>
        </div>
        <div class="swiper-button-prev swiper-button-prev-legal1">
          <img src="../../assets/images/home/left.png" alt />
        </div>
        <div class="swiper-button-next swiper-button-next-legal1">
          <img src="../../assets/images/home/right.png" alt />
        </div>
      </div>-->
      <div id="legal-column1" class="swiper-container" v-show="active==0">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in dataList1"
            @click="detailsEvent(item)"
            :key="index"
          >
            <div class="mask">
              <img :src="item.icon" alt />
              <!-- <img src="../../assets/images/home/swiper1.jpg" alt /> -->
            </div>
            <p :title="item.name">{{item.name}}</p>
          </div>
        </div>
        <div class="swiper-button-prev swiper-button-prev-legal1">
          <img src="../../assets/images/home/left.png" alt />
        </div>
        <div class="swiper-button-next swiper-button-next-legal1">
          <img src="../../assets/images/home/right.png" alt />
        </div>
      </div>
      <div id="legal-column2" class="swiper-container" v-show="active==1">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in dataList2"
            @click="detailsEvent(item)"
            :key="index"
          >
            <div class="mask">
              <img :src="item.icon" alt />
              <!-- <img src="../../assets/images/home/swiper1.jpg" alt /> -->
            </div>
            <p :title="item.name">{{item.name}}</p>
          </div>
        </div>
        <div class="swiper-button-prev swiper-button-prev-legal2">
          <img src="../../assets/images/home/left.png" alt />
        </div>
        <div class="swiper-button-next swiper-button-next-legal2">
          <img src="../../assets/images/home/right.png" alt />
        </div>
      </div>
    </PageHeader>
  </div>
</template>

<script>
const defaultDataList1 = [
  {
    icon: require("../../assets/images/home/swiper1.jpg"),
    name: "巩固防控成果,继续全面做好普法"
  },
  {
    icon: require("../../assets/images/home/w-active2.jpg"),
    name: "法进医院法治同行"
  },
  {
    icon: require("../../assets/images/home/w-active3.jpg"),
    name: "谁执法谁普法"
  },
  {
    icon: require("../../assets/images/home/w-active4.jpg"),
    name: "提高市场监管执法普法"
  },
  {
    icon: require("../../assets/images/home/w-active5.jpg"),
    name: "走进大场中学"
  }
];
const defaultDataList2 = [
  {
    icon: require("../../assets/images/home/w-active7.jpg"),
    name: "国家安全教育日"
  },
  {
    icon: require("../../assets/images/home/w-active6.jpg"),
    name: "守护医疗卫生你我他"
  },
  {
    icon: require("../../assets/images/home/w-active5.jpg"),
    name: "奋进新时代 机关展风采"
  },
  {
    icon: require("../../assets/images/home/w-active4.jpg"),
    name: "立足本职做贡献 履职尽责展风采"
  }
];
import Swiper from "../../../node_modules/swiper/js/swiper.min.js";
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
export default {
  name: "legal-column",
  data() {
    return {
      heights: 0,
      active: 0, // 0七五普法专栏  1履职协议
      dataList1: Object.assign([], defaultDataList1),
      dataList2: Object.assign([], defaultDataList2),
      // dataList1: [],
      // dataList2: [],
      mySwiper1: null, // 轮播
      mySwiper2: null, // 轮播
      isShowSwiper: true // 轮播是否显示
    };
  },
  created() {
    this.initDataList1();
    this.initDataList2();
  },
  mounted() {
    let winths =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (winths > 1900) {
      this.heights = 226;
    } else {
      this.heights = 0;
    }
  },
  methods: {
    // 查看更多
    requestMore() {
      if (this.active == 0) {
        this.$parent.requestData(2)
      } else {
        this.$parent.requestData(5)
      }
    },
    getSwiper1() {
      this.mySwiper1 = new Swiper("#legal-column1", {
        // 自动播放
        // autoplay: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 环路
        loop: true,
        // 按钮
        navigation: {
          nextEl: ".swiper-button-next-legal1",
          prevEl: ".swiper-button-prev-legal1"
        },
        // 切换效果
        effect: "coverflow",
        slidesPerView: 3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: true
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    },
    getSwiper2() {
      this.mySwiper2 = new Swiper("#legal-column2", {
        // 自动播放
        // autoplay: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 环路
        loop: true,
        // 按钮
        navigation: {
          nextEl: ".swiper-button-next-legal2",
          prevEl: ".swiper-button-prev-legal2"
        },
        // 切换效果
        effect: "coverflow",
        slidesPerView: 3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: true
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    },
    //   跳转
    detailsEvent(item) {
      this.$parent.requestDetails(item.id)
    },
    handlerTitleClick(val) {
      if (val == this.active) return;
      if (this.mySwiper1) this.mySwiper1.destroy();
      if (this.mySwiper2) this.mySwiper2.destroy();
      this.active = val;
      if (val == 0) {
        this.getSwiper1();
      }
      if (val == 1) {
        this.getSwiper2();
      }
    },
    // 获取七五普法专栏首屏数据
    async initDataList1() {
      let data = {
        pageNum: 1,
        pageSize: 10,
        type: 2,
        sortBy: "createTime",
        sortType: "desc"
      };
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/activities`,
        "get",
        data
      );
      this.dataList1 = res.list;
      this.$nextTick(() => {
        this.getSwiper1();
      });
    },
    // 获取履职评议首屏数据
    async initDataList2() {
      let data = {
        pageNum: 1,
        pageSize: 10,
        type: 5,
        sortBy: "createTime",
        sortType: "desc"
      };
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/activities`,
        "get",
        data
      );
      this.dataList2 = res.list;
      this.$nextTick(() => {
        this.getSwiper2();
      });
    }
  }
};
</script>

<style lang='less' scoped>
.swiperBox {
  .swiper-container {
    margin-bottom: 20px;
    .swiper-wrapper {
      width: 80%;
      height: 43%;
      margin: 8% 0 0;
      .swiper-slide {
        position: relative;
        width: 50%;
        cursor: pointer;
        .mask {
          img {
            display: block;
            width: 100%;
            opacity: 0.7;
          }
        }
        p {
          width: 90%;
          position: absolute;
          z-index: 1;
          bottom: 10%;
          left: 5%;
          color: #f9f9f9;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
<style lang="less" >
.swiperBox {
  .swiper-button-next {
    width: 6%;
    // margin-right: 4%;
    img {
      width: 100%;
    }
  }
  .swiper-button-prev {
    width: 6%;
    // margin-left: 8%;
    img {
      width: 100%;
    }
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    display: none;
  }
  .swiper-container-3d .swiper-slide-shadow-left {
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
    display: none;
  }
  .swiper-container-3d .swiper-slide-shadow-right {
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
    display: none;
  }
  .swiper-container {
    margin-bottom: 0 !important;
  }
  .swiper-slide-active {
    width: calc(63% + 2px) !important;
    margin: auto !important;
    box-shadow: 2px 0 6px 0 #255dd4, -2px 0 6px 0 #255dd4;
    margin-left: -17% !important;
    position: relative;
    top: -16px;
    .mask {
      img {
        opacity: 1 !important;
      }
    }
  }
  .swiper-slide-next {
    width: 50% !important;
    margin-top: 3% !important;
  }
  .swiper-slide-prev {
    width: 50% !important;
    margin-top: 3% !important;
  }
}

@media (min-width: 1920px) {
  .swiperBox {
    .swiper-slide-active {
      .mask {
        img {
          height: 169px;
        }
      }
    }
  }
}
</style>
