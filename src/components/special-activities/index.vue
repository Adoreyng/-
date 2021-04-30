<template>
  <div class="special-activities">
    <PageHeader :title="6" :en="'Special activities'" :height="226" :more="true" :color="'rgba(13, 42, 107, 0.3)'" @requestMore="requestMore">
      <div class="panl-content">
        <el-row class="panl-header" :gutter="10">
          <el-col :span="24"><div class="law-articl-title grid-content bg-purple">法制教育宣传月</div></el-col>
        </el-row>
        <div class="swiper-container-special">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in infoData" :key="index" @click="handlerClickEvent(item)">
              <el-row :gutter="10">
                <el-col :span="10"><div class="law-articl grid-content bg-purple" :title="item.name">{{item.name}}</div></el-col>
                <el-col :span="7"><div class="grid-content bg-purple">{{item.area}}</div></el-col>
                <el-col :span="7"><div class="grid-content bg-purple" style="color: #6b81ac">{{item.createTime}}</div></el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  </div>
</template>
<script>
import Swiper from '../../../node_modules/swiper/js/swiper.min.js'
import {JUDICIAL_BACKEND} from '@/utils/baseUrl'
export default {
  name: 'special-activities',
  data () {
    return {
      swiper: null,
      infoData: [],
      // infoData: [
      //   {type: 1, contentType: 2, name: '国安日·看上海', organization: '上海司法局', area: '黄浦区', createTime: '2021/4/15', id: 1, content: '2021年4月15日是第6个全民国家安全教育日，以“践行总体国家安全观，统筹发展和安全，统筹传统安全和非传统安全，营造庆祝建党100周年良好氛围”为主题，各区开展了形式各样，内容丰富的主题宣传活动。'},
      //   {type: 1, contentType: 2, name: '国家安全教育日', organization: '上海司法局', area: '静安区', createTime: '2021/4/15', id: 2, content: '为贯彻落实习近平总书记提出的总体国家安全观，推动全民国家安全教育深入人心，4月15日上午，2021年静安区4.15全民国家安全教育日宣传周启动仪式在四行仓库抗战纪念馆举行。区委常委、政法委书记赵汝青出席。'},
      //   {type: 1, contentType: 2, name: '全民国家安全教育日主题活动', organization: '上海司法局', area: '长宁区', createTime: '2021/4/15', id: 3, content: '今天下午，在长宁区4·15全民国家安全教育日主题活动现场，当带有“维护国家安全，构建和谐社会”字样的卷轴徐徐打开时，一下点燃了大家的激情。'},
      //   {type: 1, contentType: 2, name: '千钧“医法”守护医疗卫生你我他', organization: '上海司法局', area: '黄浦区', createTime: '2021/4/15', id: 4, content: '近日，黄浦区卫生健康委在上海第九人民医院黄浦分院报告厅举办专题学习讲座，区卫生健康委二级调研员张燕尔出席并主持，区卫生健康委法律顾问、上海邦信阳中建中汇律师事务所郑峻律师进行主讲，委机关各科室、委属单位分管领导和法制干部、部分社会办医疗机构工作人员以及九院黄浦分院部分医护人员共计100多人参加学习培训。'},
      //   {type: 1, contentType: 2, name: '国家安全教育日主题活动', organization: '上海司法局', area: '徐汇区', createTime: '2021/4/15', id: 5, content: '情景剧《奇怪的访客》和《旅游达人史蒂夫》，真实再现事件发生的情景，引起现场参加者浓厚的兴趣和热情参与，大家积极解密疑点、踊跃答题。在警官现场的答疑解惑和指点迷津中，提醒市民危险就潜藏在我们身边，应该时刻将国家安全意识记在心间。'}
      // ]
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    initSwiper () {
      this.swiper = new Swiper('.swiper-container-special', {
        slidesPerView: 5,
        direction: 'vertical',
        roundLengths : true,
        // loop: true,
        observer:true,
        observeParents:true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        on: {
          
        }
      });
    },
    // 查看更多
    requestMore() {
      this.$parent.requestData(1)
    },
    handlerClickEvent (item) {
      this.$parent.requestDetails(item.id)
      // console.log('item', item);
    },
    // 获取首屏数据
    async initData(){
      let data = {
        pageNum: 1,
        pageSize: 10,
        type: 1,
        sortBy: 'createTime',
        sortType: 'desc',
      }
      let res = await this.request(`${JUDICIAL_BACKEND}/judicial/activities`, 'get', data)
      this.infoData = res.list
      console.log(res)
    }
  },
}
</script>
<style lang='less' scoped>
  .special-activities {
    .panl-content {
      width: 100%;
      height: 100%;
      // background-color: #061d54;
    }
    .panl-header {
      color: #7589b2;
      font-size: 13px;
      text-align: center;
      // border-bottom: 1px solid #152c5b;
      height: 12%;
      .law-articl-title {
        text-align: left;
        color: #fff;
        font-size: 15px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
    .swiper-container-special {
      width: 100%;
      height: calc(100% - 12%);
      overflow: hidden;
    }
    .swiper-slide {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #effeff;
      line-height: 36px;
      cursor: pointer;
      &:nth-child(2n) {
        background-color: #092762;
      }
      &:hover {
        background-color: #01134d;
      }
      .law-articl {
        padding: 0 10px;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>