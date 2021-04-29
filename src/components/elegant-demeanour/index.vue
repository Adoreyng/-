<template>
  <div class="elegant-activities">
    <PageHeader :title="8" :en="'Elegant demeanour'" :color="'rgba(13, 42, 107, 0.4)'" :height="212" :more="true" @requestMore="requestMore">
      <div class="panl-content">
        <div class="swiper-container-elegant">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in infoData" :key="index" @click="handlerClickEvent(item)">
              <el-row :gutter="10">
                <el-col :span="4" class="flex-img"><div class="law-image grid-content bg-purple"><img :src="item.icon" alt=""></div></el-col>
                <el-col :span="14"><div class="law-articl grid-content bg-purple" :title="item.name">{{item.name}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple" style="color: #6b81ac">{{item.createTime}}</div></el-col>
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
  name: 'elegant-demeanour',
  data () {
    return {
      swiper: null,
      infoData: [],
      // infoData: [
      //   {type: 1, id: 11, icon: require('../../assets/images/home/law0.jpg'), name: '立足本职做贡献 履职尽责展风采  ', createTime: '2021/3/15'},
      //   {type: 1, id: 12, icon: require('../../assets/images/home/law1.jpg'), name: '工作总结暨“头雁”风采展示大会', createTime: '2021/2/19'},
      //   {type: 1, id: 13, icon: require('../../assets/images/home/law2.jpg'), name: '奋进新时代 机关展风采', createTime: '2021/3/2'},
      //   {type: 1, id: 13, icon: require('../../assets/images/home/law3.jpg'), name: '知识产权专项论坛', createTime: '2021/4/6'}
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
    // 查看更多
    requestMore() {
      this.$parent.requestData(3)

    },
    handlerClickEvent (item) {
      this.$parent.requestDetails(item.id)
      console.log('item', item)
    },
    initSwiper () {
      this.swiper = new Swiper('.swiper-container-elegant', {
        slidesPerView: 4,
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
    // 获取首屏数据
    async initData(){
      let data = {
        pageNum: 1,
        pageSize: 10,
        type: 3,
        sortBy: 'createTime',
        sortType: 'desc',
      }
      let res = await this.request(`${JUDICIAL_BACKEND}/judicial/activities`, 'get', data)
      this.infoData = res.list
    }
  },
}
</script>
<style lang='less' scoped>
  .elegant-activities {
    .panl-content {
      width: 100%;
      height: 100%;
      background-color: #061d54;
      padding: 5px 0;
    }
    .panl-header {
      color: #7589b2;
      font-size: 13px;
      text-align: center;
      border-bottom: 1px solid #152c5b;
      height: 12%;
    }
    .swiper-container-elegant {
      width: 100%;
      height: calc(100% - 2px);
      overflow: hidden;
    }
    .swiper-slide {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #effeff;
      line-height: 45px;
      cursor: pointer;
      &:nth-child(2n) {
        background-color: #06235c;
      }
      &:hover {
        background-color: #01134d;
        .law-image img {
          transform: scale(1.2);
        }
      }
      .flex-img {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .law-image {
        width: 90%;
        height: 42px;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          display: block;
          flex: none;
          transition: all 1s;
        }
      }
      .law-articl {
        padding: 0;
        box-sizing: border-box;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
