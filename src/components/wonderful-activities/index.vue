<template>
  <div class="wonderful-activities">
    <PageHeader :title="3" :en="'Wonderful activities'" :color="'rgba(13, 42, 107, 0.4)'"  :height="213" :more="true" @requestMore="requestMore">
      <div class="panl-content">
        <div class="activeImg">
          <img :src="activeImg" alt="">
        </div>
        <div class="swiper-contain-wonderful">
          <div class="swiper-container-wonderful">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in infoData" :key="index" @click="handlerClickEvent(item)">
                <el-row :gutter="10">
                  <el-col :span="15"><div class="law-articl grid-content bg-purple" :title="item.name">{{item.name}}</div></el-col>
                  <el-col :span="9"><div class="grid-content bg-purple"  style="color: #6b81ac">{{item.createTime}}</div></el-col>
                </el-row>
              </div>
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
  name: 'wonderful-activities',
  data () {
    return {
      swiper: null,
      activeImg: '',
      infoData: [],
      // infoData: [
      //   {type: 1, id: 6, icon: require('../../assets/images/home/w-active1.jpg'), name: '金山检察法治副校长带你宣誓成人', createTime: '2021-02-23'},
      //   {type: 1, id: 7, icon: require('../../assets/images/home/w-active2.jpg'), name: '法进医院、尊重医护、法治同行', createTime: '2021-03-15'},
      //   {type: 1, id: 8, icon: require('../../assets/images/home/w-active3.jpg'), name: '谁执法谁普法', createTime: '2021-03-27'},
      //   {type: 1, id: 9, icon: require('../../assets/images/home/w-active4.jpg'), name: '提振消费信心市场监管执法普法 ', createTime: '2021-03-30'},
      //   {type: 1, id: 10, icon: require('../../assets/images/home/w-active5.jpg'), name: '宝山区司法局局长走进大场中学 ', createTime: '2021-04-05'},
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
      //  传999  单独判断 请求不传type
      this.$parent.requestData(999)
    },
    handlerClickEvent (item) {
      this.$parent.requestDetails(item.id)
      console.log('item', item)
    },
    initSwiper () {
      let _this = this
      this.swiper = new Swiper('.swiper-container-wonderful', {
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
          slideChangeTransitionStart: function () {
            _this.activeImg = _this.infoData[this.activeIndex].icon
          }
        }
      });
    },
    // 获取首屏数据
    async initData(){
      let data = {
        pageNum: 1,
        pageSize: 20,
        sortBy: 'createTime',
        sortType: 'desc',
      }
      let res = await this.request(`${JUDICIAL_BACKEND}/judicial/activities`, 'get', data)
      this.infoData = res.list
      // this.activeImg = this.infoData[3].icon
    }
  }
}
</script>
<style lang='less' scoped>
  .wonderful-activities {
    .panl-content {
      width: 100%;
      height: 100%;
      // background-color: #061d54;
      display: flex;
      padding: 15px 0;
      .activeImg {
        width: 35%;
        height: 100%;
        flex: none;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        img {
          transition: all 1s;
          display: block;
          width: 100%;
          &:hover {
            transform: scale(1.2)
          }
        }
      }
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
    .swiper-contain-wonderful {
      width: 65%;
      height: 100%;
      flex: none;
      padding: 9px 0 5px;
    }
    .swiper-container-wonderful {
      width: 100%;
      height: calc(100% - 4px);
      overflow: hidden;
    }
    .swiper-slide {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #effeff;
      line-height: 29px;
      cursor: pointer;
      &:nth-child(2n) {
        background-color: #06235c;
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
