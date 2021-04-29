<template>
  <div class="union-matrix">
    <PageHeader
      id="LawInShanghai"
      :title="4"
      :en="'The system input'"
      :color="'rgba(13, 42, 107, 0.3)'"
      :height="374"
      :unionData="unionData"
    >
      <div class="panl-content">
        <div class="swiper-container-union">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in dataList.list" :key="index">
              <el-row :gutter="10" style="margin-top:7px">
                <el-col :span="6" v-for="(ite, i) in item" :key="i">
                  <div class="union-item grid-content bg-purple" @click="handleClick(ite.id)">
                    <img class="image1" :src="ite.logo" :title="ite.name" :alt="ite.name" />
                    <!-- <img class="image2" :src="ite.qrCode" :title="ite.name" :alt="ite.name" /> -->
                    <img class="image2" src="http://yangy-scm.oss-cn-shanghai.aliyuncs.com/philips/product/bef96199b89c45efb4787f065306c936.png?Expires=1907664403&OSSAccessKeyId=LTAI4FsgbSn3y4GUCwBwmD8s&Signature=14%2BW24MOlpXD8wOVKKPTZQ5DPs4%3D" :title="ite.name" :alt="ite.name" />
                    <span :title="ite.name">{{ite.name}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  </div>
</template>
<script>
import Swiper from "../../../node_modules/swiper/js/swiper.min.js";
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";

const defaultQueryBody = {
  name: "",
  pageNum: 1,
  pageSize: 100,
  sortType: "desc"
};
export default {
  name: "union-matrix",
  data() {
    return {
      queryBody: Object.assign({}, defaultQueryBody),
      swiper: null,
      activeImg: "",
      dataList: {
        total: null,
        list: []
      },
      unionData: {
        isNeed: true,
        q: null,
        j: null,
        m: null
      },
      infoData: [
        {
          name1: "晓骏",
          name2: "闵晓法",
          name3: "嘉定法宝",
          name4: "法治浦东",
          url1: require("../../assets/images/home/1.png"),
          url2: require("../../assets/images/home/2.png"),
          url3: require("../../assets/images/home/3.png"),
          url4: require("../../assets/images/home/4.png")
        },
        {
          name1: "宝山法宣",
          name2: "长宁法宣",
          name3: "法治徐家汇",
          name4: "小贤说法",
          url1: require("../../assets/images/home/5.png"),
          url2: require("../../assets/images/home/6.png"),
          url3: require("../../assets/images/home/7.png"),
          url4: require("../../assets/images/home/8.png")
        },
        {
          name1: "虹豌豆",
          name2: "法治松江",
          name3: "金山-法治金山",
          name4: "瀛洲法宣",
          url1: require("../../assets/images/home/9.png"),
          url2: require("../../assets/images/home/10.png"),
          url3: require("../../assets/images/home/11.png"),
          url4: require("../../assets/images/home/12.png")
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    handleClick(val) {
      // console.log(val);
      this.$parent.tableActiveIdShow(val);
    },
    async getList() {
      let data = {
        ...this.queryBody
      };
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/officialAccountDatas`,
        "get",
        data
      );
      let list = [];
      let i = 0;
      let activeIndex = 4;
      for (
        let index = 0;
        index < res.list.length;
        index = index + activeIndex
      ) {
        list.push([]);
        for (let ii = 0; ii < activeIndex; ii++) {
          if (res.list[index + ii]) {
            list[i].push(res.list[index + ii]);
          }
        }
        i++;
      }
      this.dataList.total = res.pager.total;
      this.dataList.list = list;
      this.initSwiper();

      this.request(
        `${JUDICIAL_BACKEND}/judicial/officialAccountDatas/count`,
        "get"
      ).then(ress => {
        this.unionData = {
          isNeed: true,
          q: ress[0].count,
          j: ress[1].count,
          m: ress[2].count
        };
      });
    },
    initSwiper() {
      let _this = this;
      _this.activeImg = _this.infoData[0].url;
      this.swiper = new Swiper(".swiper-container-union", {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        direction: "vertical",
        roundLengths: true,
        // loop: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        on: {
          slideChangeTransitionStart: function() {
            _this.activeImg = _this.infoData[this.activeIndex].url;
          }
        }
      });
    },
    vidoList() {
      this.$parent.showVidoList();
    }
  }
};
</script>
<style lang='less' scoped>
.union-matrix {
  .panl-content {
    width: 100%;
    height: 100%;
    // background-color: #011a50;
  }
  .panl-header {
    color: #7589b2;
    font-size: 13px;
    text-align: center;
    border-bottom: 1px solid #152c5b;
    height: 12%;
    .law-articl-title {
      text-align: left;
      color: #fff;
      font-size: 15px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
  .swiper-container-union {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .swiper-slide {
    width: 95%;
    height: 100%;
    text-align: center;
    font-size: 15px;
    color: #effeff;
    line-height: 36px;
    margin: 0 auto;
    // .swiper-slide-active{
    //   height: 100px !important;
    // }
    cursor: pointer;
    &:nth-child(2n) {
      // background-color: #06235c;
    }
    .law-articl {
      padding: 0 10px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .union-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      .image1 {
        display: block;
      }
      .image2 {
        display: none;
      }
      img {
        transition: all 1s;
        flex: none;
        display: block;
        width: 56px;
      }
      span {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover {
        .image1 {
          display: none;
        }
        .image2 {
          display: block;
        }
        img {
          transform: scale(1.4);
        }
      }
    }
  }
}
</style>