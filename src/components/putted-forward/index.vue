<template>
  <div class="putted-forward">
    <PageHeader :title="5" :en="'Putted forward'" :height="374" :color="'rgba(13, 42, 107, 0.35)'" :more="true" @requestMore="requestMore">
      <div class="panl-content">
        <div class="swiper-container-putted">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in infoData" :key="index" @click="handlerClickEvent(item)">
              <el-row :gutter="10">
                <el-col :span="17">
                  <div class="law-articl grid-content bg-purple" :title="item.name">{{item.name}}</div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content bg-purple" style="text-align: right;margin-right: 20px;">{{item.createTime}}</div>
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
import {JUDICIAL_BACKEND} from '@/utils/baseUrl'
export default {
  name: "putted-forward",
  data() {
    return {
      swiper: null,
      infoData: [
        // { name: "为推动企业复工复产复市保驾护航", createTime: "2020.04.23" },
        // { name: "宋某等组织考试作弊", createTime: "2020.04.23" },
        // { name: "奉贤区线上线下掀起禁毒宣传热潮 ", createTime: "2020.04.27" },
        // { name: "半淞园路街道探索业委员会法制评估体系", createTime: "2020.05.10" },
        // {
        //   name: "通过招标甄别系统查处围标串标等行政处罚案件",
        //   createTime: "2020.05.15"
        // },
        // {
        //   name: "静安区宝山路街道开展民主法治社区创建工作",
        //   createTime: "2020.05.15"
        // },
        // { name: "金山区消费委员会开展民主生态课堂", createTime: "2020.05.20" },
        // {
        //   name: "中小微企业复工率直线上升，对疫情防控工作很...",
        //   createTime: "2020.05.10"
        // },
        // { name: "为推动企业复工复产复市保驾护航", createTime: "2020.04.12" },
        // {
        //   name: "静安区宝山路街道开展民主法治社区创建工作",
        //   createTime: "2020.05.14"
        // },
        // { name: "为推动企业复工复产复市保驾护航", createTime: "2020.05.10" },
        // { name: "金山区消费委员会开展民主生态课堂", createTime: "2020.05.05" },
        // {
        //   name: "通过招标甄别系统查处围标串标等行政处罚案件",
        //   createTime: "2020.05.03"
        // },
        // { name: "奉贤区线上线下掀起禁毒宣传热潮", createTime: "2020.05.04" },
        // { name: "为推动企业复工复产复市保驾护航", createTime: "2020.05.06" },
        // { name: "宋某等组织考试作弊", createTime: "2020.05.18" }
      ]
    };
  },
  created() {
    this.initData()
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    // 查看更多
    requestMore() {
      this.$parent.requestData(4)
    },
    handlerClickEvent (item) {
      this.$parent.requestDetails(item.id)
    },
    initSwiper() {
      this.swiper = new Swiper(".swiper-container-putted", {
        slidesPerView: 9,
        direction: "vertical",
        roundLengths: true,
        // loop: true,
        observer:true,
        observeParents:true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        on: {}
      });
    },
    // 获取首屏数据
    async initData(){
      let data = {
        pageNum: 1,
        pageSize: 20,
        type: 4,
        sortBy: 'createTime',
        sortType: 'desc',
      }
      let res = await this.request(`${JUDICIAL_BACKEND}/judicial/activities`, 'get', data)
      this.infoData = res.list
    }
  }
};
</script>
<style lang='less' scoped>
.putted-forward {
  .panl-content {
    width: 100%;
    height: 100%;
    background-color: #061d54;
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
  .swiper-container-putted {
    width: 100%;
    height: calc(100% - 3px);
    overflow: hidden;
  }
  .swiper-slide {
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #effeff;
    line-height: 39px;
    cursor: pointer;
    background-color: #09255E;

    &:nth-child(2n) {
      background-color: #0d3375;
    }
    &:hover {
      background-color: #01134d;
    }
    .law-articl {
      padding-left: 13px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>