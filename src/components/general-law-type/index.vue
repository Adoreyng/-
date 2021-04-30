<template>
  <div class="common">
    <PageHeader
      :title="2"
      :en="'GENERAL LAW TYPE'"
      :color="'rgba(13, 42, 107, 0.3)'"
      :height="heights"
      :more="false"
    >
      <div class="block" v-for="(item,index) in block" :key="index">
        <img :src="item.url" alt />
        <p class="block-p">{{item.title}}</p>
        <template v-if="index==0">
          <div class="block-left" v-if="detalistOne.length">
            <p v-for="(sum, index) in detalistOne" :key="index">
              <!-- <span :title="sum.name">{{sum.name}}</span>
              <span :title="sum.total">{{sum.total}}</span> -->
              <span :title="sum.name">{{sum.title}}</span>
              <span :title="sum.total">{{sum.number}}</span>
            </p>
          </div>
          <div class="block-left" v-else>
            <p>暂无数据</p>
          </div>
        </template>
        <template v-if="index==1">
          <div class="block-left" v-if="detalistThree.length">
            <p v-for="(sum, index) in detalistThree" :key="index">
              <!-- detalistThree -->
              <!-- <span :title="sum.name">{{sum.name}}</span>
              <span :title="sum.total">{{sum.total}}</span> -->
              <span :title="sum.name">{{sum.title}}</span>
              <span :title="sum.total">{{sum.number}}</span>
            </p>
          </div>
          <div class="block-left" v-else>
            <p>暂无数据</p>
          </div>
        </template>
      </div>
    </PageHeader>
  </div>
</template>
<script>
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";

const defaultQueryBody = {
  pageNum: 1,
  pageSize: 5,
  sortType: "desc",
  type: null
};
export default {
  name: "general-law-type",
  data() {
    return {
      heights: 0,
      block: [
        {
          url: require("../../assets/images/home/block.png"),
          title: "指标申报"
        },
        {
          url: require("../../assets/images/home/block.png"),
          title: "主题活动"
        }
      ],
      // sum: [],
      sum: [
        { title: "社会公共法制", number: "8848" },
        { title: "全民守法情况", number: "7532" },
        { title: "创新项目", number: "6433 " },
        { title: "法制环境情况", number: "3498" },
        { title: "法制城区建设", number: "2034" }
      ],
      point: [
        { title: "领导干部学法用法情况", number: "6547" },
        { title: "运用新媒体新技术开展普法情况", number: "6548" },
        { title: "政府依法行政情况", number: "6237" },
        { title: "法治宣传教育体制机制建设情况", number: "7501" },
        { title: "民主法治课题研究有关工作情况", number: "3021" }
      ],
      detalistOne: [],
      detalistThree: [],
      queryBody: Object.assign({}, defaultQueryBody)
    };
  },
  created() {
    this.initData(0);
    this.initData(1);
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
    async initData(val) {
      let data = {
        ...this.queryBody
      };
      data.type = val;
      // let res = await this.request(
      //   `${JUDICIAL_BACKEND}/judicial/lawUsedCollects`,
      //   "get",
      //   data
      // );
      // if (val == 0) {
      //   this.detalistOne = res.list;
      // } else {
      //   this.detalistThree = res.list;
      // }
      this.detalistOne = this.point;
      this.detalistThree = this.sum;
    }
  }
};
</script>
<style lang='less' scoped>
.common {
  .block {
    width: 50%;
    height: 100%;
    float: left;
    position: relative;
    text-align: center;
    padding-top: 4px;
    img {
      width: 75%;
      height: 81%;
      text-align: center;
      margin-top: 4%;
    }
    .block-p {
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      line-height: 25px;
    }

    .block-left {
      position: absolute;
      right: -5px;
      top: 5px;
      width: auto;
      height: auto;
      line-height: 25px;
      background: #061f55;
      padding: 3px;
      width: 60%;
      p {
        color: #ffffff;
        font-size: 12px;
        -webkit-transform: scale(0.95);
        text-align: left;
        line-height: 1.4;
        font-weight: 400;
        width: 100%;
        span {
          cursor: pointer;
          &:nth-of-type(1) {
            width: calc(70% - 7px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
            float: left;
          }
          &:nth-of-type(2) {
            width: 30%;
            display: inline-block;
            float: right;
            color: #46b8ea;
            margin-left: 6px;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
@media (max-width: 1450px) {
  .common .block .block-left {
    top: 0 !important;

    // right: -15% !important;
    transform: scale(0.8);
  }
}
</style>