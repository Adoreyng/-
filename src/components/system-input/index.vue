<template>
  <div class="system-input">
    <PageHeader :title="1" :en="'THE SYSTEM INPUT'" :height="226" :more="false" :color="'rgba(13, 42, 107, 0.4)'" @handlerTitleClick="handlerTitleClick(-1,'')">
      <div class="panl-content">
        <el-row class="panl-header" :gutter="10">
          <el-col :span="4"><div class="grid-content bg-purple">排名</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple" style="text-align:left">区域</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">总数</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">指标申报数</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">小程序活动数</div></el-col>
        </el-row>
        <div class="swiper-container-free">
          <div class="swiper-wrapper">
            <!-- <div class="swiper-slide" v-for="(item, index) in infoData" :key="index" @click="handlerClickEvent(index,item.judicialName)"> -->
            <div class="swiper-slide">
              <el-row :gutter="10"  v-for="(item, index) in infoData" :key="index" @click="handlerClickEvent(index,item.judicialName)">
                <el-col :span="4"><div class="grid-content bg-purple">{{index + 1}}</div></el-col>
                <el-col :span="5"><div class="shang-area grid-content bg-purple" style="text-align:left">{{item.area}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">{{item.total}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">{{item.target}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">{{item.miniapp}}</div></el-col>
                <!-- <el-col :span="6"><div class="grid-content bg-purple">{{item.pull}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">{{item.app}}</div></el-col> -->
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
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
export default {
  name: 'system-input',
  data () {
    return {
      swiper: null,
      infoData: [],
      // infoData: [
      //   {area: '徐汇区', total: 158, pull: 45, app: 607},
      //   {area: '黄浦区', total: 130, pull: 65, app: 465},
      //   {area: '浦东新区', total: 105, pull: 34, app: 576},
      //   {area: '长宁区', total: 87, pull: 45, app: 545},
      //   {area: '宝山区', total: 85, pull: 66, app: 745},
      //   {area: '静安区', total: 74, pull: 33, app: 145},
      //   {area: '普陀区', total: 69, pull: 65, app: 854},
      //   {area: '虹口区', total: 65, pull: 45, app: 456},
      //   {area: '杨浦区', total: 63, pull: 32, app: 356},
      //   {area: '闵行区', total: 58, pull: 67, app: 853},
      //   {area: '崇明区', total: 52, pull: 86, app: 752},
      //   {area: '嘉定区', total: 49, pull: 45, app: 369},
      //   {area: '金山区', total: 46, pull: 24, app: 458},
      //   {area: '松江区', total: 41, pull: 67, app: 658},
      //   {area: '青浦区', total: 40, pull: 43, app: 856},
      //   {area: '奉贤区', total: 36, pull: 22, app: 842},
      // ],
      pageNum:1,
      pageSize:1000
    }
  },
  created() {

  },
  mounted() {

    this.getSystem()
  },
  methods: {
    initSwiper () {
      this.swiper = new Swiper('.swiper-container-free', {
        slidesPerView: 5,
        direction: 'vertical',
        roundLengths : true,
        // loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        on: {

        }
      });
    },
    handlerClickEvent (index,value) {
      this.$parent.menuTableBoxFun()
      // // console.log('eeee',index)
      // console.log('hahahah',value)
      this.$emit('send',index,value)
    },
    handlerTitleClick(index,value){
      this.$parent.menuTableBoxFun()
      // // console.log('qwqwqw',value);
      this.$emit('send',index,value)

    },
    async getSystem(){
       let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortType: "desc",
      };
       let res = await this.request(
         `${JUDICIAL_BACKEND}/judicial/sysInput/areaList`,
         "get",
         data
       )
       // console.log('aaa',res);
       this.infoData = res
       setTimeout(()=>{
       this.initSwiper()
       },300)
    }
  },
}
</script>
<style lang='less' scoped>
  .system-input {
    .panl-content {
      width: 100%;
      height: 100%;
      padding: 0 4px;
    }
    .panl-header {
      color: #7589b2;
      font-size: 13px;
      text-align: center;
      border-bottom: 1px solid #152c5b;
      height: 12%;
    }
    .swiper-container-free {
      width: 100%;
      height: calc(100% - 12.6%);
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
        background-color: #0A2760;
      }
      &:hover {
        background-color: #01134d;
      }
      .shang-area {
        text-align: center;
      }
    }
  }
  @media (min-width: 1366px) {
    .system-input {
      .panl-header {
        font-size: 12px;
      }
    }
  }
  @media (min-width: 1440px) {
    .system-input .panl-header {
      font-size: 12px;
    }
  }

  @media (min-width: 1680px) {
    .system-input .panl-header {
      font-size: 13px;
    }
  }
  @media (min-width: 1920px) {
    .system-input .panl-header {
      font-size: 13px;
    }
  }
</style>
