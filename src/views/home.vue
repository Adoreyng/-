<template>
  <div class="homeBox">
    <div class="homeBox" :style="filterBlur?'filter: blur(5px)':''">
      <header class="header">
        <img src="../assets/images/home/top.png" alt />
      </header>
      <div class="top-info">
        <h1 class="logo-top">
          <div>
            <img src="../assets/images/home/logo.png" alt />
          </div>
          <div v-if="showLawInShanghai">
            <img class="logo-shanghai-law" src="../assets/images/home/shanghai-law.png" alt />
          </div>
        </h1>
        <p class="teday">
          {{time}}
          <span>
            <img :src="weatherImg" />
            {{weather || 0}} ℃
          </span>
        </p>
      </div>
      <div class="map">
        <map-box @choose="chooseMapItem"></map-box>
      </div>
      <div id="ScrollContent" class="content clearfix">
        <div class="left-content">
          <!-- 系统录入情况 -->
          <system-input @send="send"></system-input>
          <!-- 常用普法类型 -->
          <general-law-type></general-law-type>
          <!-- 精彩活动回顾 -->
          <wonderful-activities></wonderful-activities>
          <!-- 联盟矩阵 -->
          <!-- <union-matrix></union-matrix> -->
          <!-- 法宣小视频 -->
          <!-- <law-promotion-video></law-promotion-video> -->
        </div>
        <div class="right-content">
          <!-- 专项活动 -->
          <special-activities></special-activities>
          <!-- 七五普法专栏 -->
          <legal-column></legal-column>
          <!-- 委办局风采 -->
          <elegant-demeanour></elegant-demeanour>
          <!-- 法宣案例库 -->
          <!-- <putted-forward></putted-forward> -->
          <!-- 法治文化 -->
          <!-- <the-rule-of-law-culture></the-rule-of-law-culture> -->
        </div>
      </div>
    </div>
    <Video ref="Video" :VidoId="VidoId" :detaId="detaId" :show="showVideoVis"></Video>
    <Table :type="dataType" :activeId="tableActiveId" :show="showTableVis"></Table>
    <vidoList :detaKind="detaKind" :vshow="showVidoLists"></vidoList>
    <!-- 三级详情弹框 -->
    <Details :detailsId="detailsId" :type="detailsType" :dshow="showDetails"></Details>
    <system-details :systemId="systemId" :type="systemType" :sshow=showSystem></system-details>
    <!-- 地图三级弹框 -->
    <map-del :mapDelId="mapDelId" :mapDelShow="mapDelShow"></map-del>
    <menu-table :show="menuTableBox" :childIndex="childIndex" :childValue="childValue"></menu-table>
  </div>
</template>
<script>
import Swiper from "../../node_modules/swiper/js/swiper.min.js";
import mapBox from "@/components/map/Map.vue";
import SystemInput from "@/components/system-input";
import SpecialActivities from "@/components/special-activities";
import ElegantDemeanour from "@/components/elegant-demeanour";
import PuttedForward from "@/components/putted-forward";
import WonderfulActivities from "@/components/wonderful-activities";
import UnionMatrix from "@/components/union-matrix";
import LawPromotionVideo from "@/components/law-promotion-video";
import TheRuleOfLawCulture from "@/components/the-rule-of-law-culture";
import legalColumn from "@/components/legal-column";
import generalLawType from "@/components/general-law-type";
import menuTable from "@/components/menu-table/menu-table";
import vidoList from "@/components/video-list/video-list";
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
import systemDetails from '@/components/system-details/system-details'

export default {
  components: {
    mapBox,
    SystemInput, // 系统录入情况
    generalLawType, // 常用普法类型
    SpecialActivities, // 专项活动
    legalColumn, //七五普法专栏
    ElegantDemeanour, // 委办局风采
    PuttedForward, // 法宣案例库
    WonderfulActivities, // 精彩活动回顾
    UnionMatrix, // 联盟矩阵
    LawPromotionVideo, // 法宣小视频
    TheRuleOfLawCulture, // 法治文化
    menuTable, // 系统录入情况详情
    vidoList, //视频列表详情
    systemDetails//小程序和指标
  },
  data() {
    return {
      time: "",
      dataType: 0, // 数据类型
      detailsId: null, // 详情id
      systemId:null, // 小程序和指标详情id
      detailsType: null, // 详情类型
      systemType:null, //小程序和指标详情类型
      VidoId: null, //视频详情
      detaKind: null, //视频列表种类
      level: null, // 弹框层级
      mapDelShow: false,
      mapDelId: null,
      activeIndex: 0,
      showVideoVis: false,
      showTableVis: false,
      showDetails: false,
      showSystem:false,
      showVidoLists: false,
      menuTableBox: false,
      showLawInShanghai: false, // 法治上海logo 显示隐藏
      filterBlur: false, // 增加蒙版
      tableActiveId: 0, // 点击微信公众号
      weather: {},
      weatherImg: require("../assets/images/cake/qing.png"),
      detaId: null,
      childIndex: 0,
      childValue: ""
    };
  },
  watch: {},
  computed: {},
  filters: {},
  created() {
    this.getweather();
  },
  mounted() {
    this.getNewTime();
    // 监听页面滚动  展示或隐藏法治上海logo
    document
      .querySelector("#ScrollContent")
      .addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 地图三级弹框点击事件
    chooseMapItem (id) {
      this.requestMapDetails(id, 2)
    },
    // 向地图详情页面传递id
    requestMapDetails(id, level = 2) {
      this.mapDelId = id;
      this.level = level;
    },
    // 展示地图详情页面
    showMapDetail() {
      this.mapDelShow = true;
      if (this.level === 2) {
        this.filterBlur = true;
      }
    },
    // 隐藏地图详情页面
    hideMapDetail() {
      this.mapDelShow = false;
      this.mapDelId = null
      if (this.level === 2) {
        this.filterBlur = false;
      }
    },
    // 接收子组件的数据
    send(index, value) {
      // console.log('oooooo',index);
      this.childIndex = index,
      this.childValue = value;
    },
    // 获取天气
    async getweather() {
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/sysInput/weather`,
        "get"
      );
      this.weather = JSON.parse(res).tem;
      let weatherImg = JSON.parse(res).wea_img;
      this.weatherImg = require(`../assets/images/cake/${weatherImg}.png`);
    },
    tableActiveIdShow(val) {
      this.dataType = 998;
      this.tableActiveId = val;
      // this.showTableVis = true;
    },
    tableActiveIdHidden() {
      this.dataType = -1;
      this.tableActiveId = 0;
      this.showTableVis = false;
    },
    // 监听页面滚动  展示或隐藏法治上海logo
    handleScroll() {
      let scrollTop =
        document.querySelector("#ScrollContent").pageYOffset ||
        document.querySelector("#ScrollContent").scrollTop;
      let offsetTop = document.querySelector("#LawInShanghai").offsetTop;
      if (offsetTop - scrollTop < 100) {
        this.showLawInShanghai = true;
      } else {
        this.showLawInShanghai = false;
      }
    },
    // 获取当前时间
    getNewTime() {
      Date.prototype.Format = function(fmt) {
        let o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      this.time = new Date().Format("yyyy-MM-dd HH:mm:ss");
      setInterval(() => {
        this.time = new Date().Format("yyyy-MM-dd HH:mm:ss");
      }, 1000);
    },
    requestData(type) {
      this.dataType = type;
    },
    // 展示二级弹窗数据
    showTable() {
      this.showTableVis = true;
      this.filterBlur = true;
    },
    // 隐藏二级弹窗数据
    hideTable() {
      this.dataType = -1;
      this.showTableVis = false;
      this.filterBlur = false;
    },
    // 向视频播放详情传id
    requestVidoId(id) {
      this.VidoId = id;
      // // console.log(this.VidoId);
    },
    // 展示视频播放弹框
    showVideo(val = 1) {
      this.showVideoVis = true;
      this.detaId = val;

      if (this.level === 2) {
        this.filterBlur = true;
      }
    },
    // 接收视频列表值
    showVidoList(kind) {
      this.detaKind = kind;
    },
    // 隐藏视频播放弹框
    hideVideo() {
      this.showVideoVis = false;
      if (this.level === 2) {
        this.filterBlur = false;
      }
    },
    // 展示视频列表
    showVidoListss(kind) {
      this.showVidoLists = true;
      if (this.level === 2) {
        this.filterBlur = true;
      }
    },
    // 隐藏视频列表
    hideVidoList() {
      this.showVidoLists = false;
      if (this.level === 2) {
        this.filterBlur = false;
      }
    },
    // 系统录入情况
    requestSysDetails(id, type = 1, level = 2) {
      // type: 1 -- 普通新闻/活动    2 -- 公众号文章   3 -- 地图三级页面 4 -- 系统录入情况详情
      this.systemType = type;
      this.systemId = id;
      this.level = level;
    },
    // 展示详情页面
    showSysDetail() {
      this.showSystem = true;
      if (this.level === 2) {
        this.filterBlur = true;
      }
    },
    // 隐藏详情页面
    hideSysDetail() {
      this.showSystem = false;
      this.systemId = null;
      if (this.level === 2) {
        this.filterBlur = false;
      }
    },
    // 向详情页面传递id
    requestDetails(id, type = 1, level = 2) {
      // type: 1 -- 普通新闻/活动    2 -- 公众号文章   3 -- 地图三级页面 4 -- 系统录入情况详情
      this.detailsType = type;
      this.detailsId = id;
      this.level = level;
    },
    // 展示详情页面
    showDetail() {
      this.showDetails = true;
      if (this.level === 2) {
        this.filterBlur = true;
      }
    },
    // 隐藏详情页面
    hideDetail() {
      this.showDetails = false;
      this.detailsId = null;
      if (this.level === 2) {
        this.filterBlur = false;
      }
    },
    menuTableBoxFun() {
      this.menuTableBox = !this.menuTableBox;
      this.filterBlur = !this.filterBlur;
    }
  }
};
</script>
<style lang='less' scoped>
.homeBox {
  width: 100%;
  height: 100vh;
  background: url("../assets/images/home/bg.jpg") no-repeat;
  background-size: 100% 100%;
  .header {
    width: 100%;
    height: 11%;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      margin: 0 auto;
      height: auto;
    }
  }
  .top-info {
    width: 100%;
    height: 4%;
    margin-top: -23px;
    padding: 0 2.9%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-top {
      font-size: 16px;
      display: flex;
      align-items: center;
      font-family: "宋体";
      color: #e1e9ff;
      > div {
        display: flex;
        align-items: center;
      }
      img {
        width: 154px;
        margin-right: 5px;
        display: inline-block;
        &.logo-shanghai-law {
          width: 120px;
          display: inline-block;
          margin: 0 5px;
          margin-left: 13px;
        }
      }
    }
    .teday {
      width: 50%;
      font-size: 17px;
      color: #e1e9ff;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: center;
      color: #b5bedb;
      margin-top: -5px;
      span {
        flex: none;
        color: #fff;
        font-weight: bold;
        padding-left: 1%;
        padding-right: 0.6%;
        display: flex;
        align-items: center;
      }
      img {
        display: inline-block;
        width: 21px;
        height: 21px;
        margin: 0 5px;
      }
    }
  }

  .map {
    width: 40%;
    background: transparent;
    position: fixed;
    top: 20%;
    left: 30%;
    height: 77%;
    /*这里 我 left - width / 2 了, transform 影响里面做fixed*/
    /*transform: translateX(-50%);*/
    z-index: 2;
  }
  #ScrollContent {
    opacity: 0.98
  }
  .content {
    width: 100%;
    padding: 0 2.9%;
    height: calc(100% - 17.5%);
    overflow-y: auto;
    margin: 0;
    perspective: 700px;
    -webkit-perspective: 700px;
    // 测试滑轮是否能滑动
    // z-index: 3;
    // position: fixed;
    // 测试滑轮是否能滑动

    /* 浏览器滚动条样式 */
    /* width */
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
      // background: rgb(255, 255, 255);
      border-radius: 8px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      // background: transparent;
      background: rgb(201, 201, 202);
      border-radius: 8px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgb(162, 162, 163);
    }
    .left-content {
      float: left;
      width: calc((100% - 50%) / 2);
      padding-top: 15px;
      transform: rotateY(6deg);
      -webkit-transform: rotateY(6deg);
      transform-origin: left 50% 0;
      -webkit-transform-origin: left 50% 0;
    }
    .right-content {
      float: right;
      width: calc((100% - 50%) / 2);
      padding-top: 15px;
      transform: rotateY(-6deg);
      -webkit-transform: rotateY(-6deg);
      transform-origin: right 50% 0;
      -webkit-transform-origin: right 50% 0;
    }
  }
}
</style>
