<template>
  <div v-if="sshow" class="details">
    <div class="details-black">
      <header class="heade">
        <img class="back" title="返回" @click="close" src="../../assets/images/details/back.png" alt />
        <div class="close" title="关闭" @click="close"></div>
      </header>
      <div class="details-content">
        <div class="system-entering" v-if="type === 0">
          <!-- 11111111111111 {{dattailsInfo.name}} -->
          <h2 class="indicator">{{dattailsInfo.judicialName}}</h2>
          <div class="tt">
            <span class="heList">考评指标:</span>
            <div>
              <span
                class="lanse"
                v-for="(item,index) in dattailsInfo.target"
                :key="index"
                v-if="item"
              >{{item}}</span>
              <!-- <span class="lanse">法律</span> -->
            </div>
          </div>
          <div class="tt">
            <span class="heList">法的内容:</span>
            <div>
              <span
                class="lanse"
                v-for="(item,index) in dattailsInfo.content"
                :key="index"
                v-if="item"
              >{{item}}</span>
            </div>
          </div>
          <div class="tt">
            <span class="heList">普法对象:</span>
            <span
              class="lanse"
              v-for="(item,index) in dattailsInfo.objectLaw"
              :key="index"
              v-if="item"
            >{{item}}</span>
          </div>
          <div class="wire"></div>
          <h3 class="huo">活动</h3>
          <div class="tt">
            <span class="heList">活动名称:</span>
            <span>{{dattailsInfo.name}}</span>
          </div>
          <div class="tt">
            <span class="heList">主办单位:</span>
            <span>{{dattailsInfo.organizer}}</span>
          </div>
          <div class="tt">
            <span class="heList">出席领导:</span>
            <span
              style="margin-right:5px"
              v-for="(item, index) in dattailsInfo.attendLeader"
              :key="index"
              v-if="item"
            >{{item}}</span>
          </div>
          <div class="jbtwo">
            <span class="heText">活动简报:</span>
            <div class="heRight" v-for="({name,url},index) in bulletinList" :key="index">
              <div class="hdjbtp">
                <!-- <img style="margin-top:2px;" :src="url" /> -->
                <el-image style="width: 70px; height: 90px;" :src="url" :preview-src-list="[url]"></el-image>
                <!-- <img src="../../assets/images/table-scroll/xuhui05.png" alt=""> -->
              </div>
              <span :title="name" style="cursor: pointer;" class="xiawen">{{name}}</span>
            </div>
          </div>
          <div class="hdzp">
            <span class="he">活动照片:</span>
            <div>
              <div
                style="margin-top:2px;"
                class="activityImg"
                v-for="({name,url},index) in activityList"
                :key="index"
              >
                <!-- <img :src="item" alt /> -->
                <el-image
                  style="width: 70px; height: 90px;"
                  :src="url"
                  :preview-src-list="activityImg"
                ></el-image>
                <span :title="name" style="cursor: pointer;" class="xiawen">{{name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="system-applet" v-if="type === 1">
          <div class="tt">
            <span class="he">活动名称:</span>
            <div>
              <span>{{dattailsInfo.name}}</span>
            </div>
          </div>
          <div class="tt">
            <span class="he">活动主题:</span>
            <div>
              <span>{{dattailsInfo.subject}}</span>
            </div>
          </div>
          <div class="fm">
            <div class="fww">封面图片:</div>
            <div class="ftt" v-for="({name,url},index) in srcList" :key="index">
              <el-image
                class="photo"
                style="width: 75px; height: 35px"
                :src="url"
                :preview-src-list="srcImg"
              ></el-image>
              <!-- 加号 -->
              <div class="jia">
                <img src="../../assets/images/table-scroll/xiaochen02.png" />
              </div>
              <div class="jianyi">{{name}}</div>
            </div>
          </div>

          <div class="tt">
            <span class="he">活动简介:</span>
            <span>{{dattailsInfo.content}}</span>
            <!-- <span>共和九居</span> -->
          </div>
          <div class="tt">
            <span class="he">主办方:</span>
            <span style="margin-right:10px;">{{dattailsInfo.organizer}}</span>
          </div>
          <div class="tt">
            <span class="cbf">承办/协办单位:</span>
            <span
              style="margin-right:5px"
              v-for="(item, index) in dattailsInfo.coOrganizer"
              :key="index"
              v-if="item"
            >{{item}}</span>
          </div>
          <div class="tt">
            <span class="he">活动时间:</span>
            <span>{{dattailsInfo.time}}</span>
          </div>
          <div class="tt">
            <span class="he">人数:</span>
            <span>{{dattailsInfo.number}}</span>
          </div>
          <div class="tt">
            <span class="he">详细地址:</span>
            <span>{{dattailsInfo.address}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
export default {
  name:'system-details',
  props: {
    systemId: Number,
    sshow: Boolean,
    type: { type: Number, default: 1 }, // 0 小程序  1指标申报
    content: {
      type: Object,
      default: () => {
        return {
          name: "“尊法守法 携手筑梦”", //活动名称
          mechanism: "上海司法局普法与依法治理处", //机构
          time: "2019-07-30", //发布时间
          text:
            "为进一步推动进城务工人员法治宣传教育工作,积极引导进城务工人员自觉学法、用法、守法,传播法治文化，弘扬法治精神，结合'春运”这一特殊的时间节点，“尊法守法携手筑梦-- -2018年 上海市春运集中法治宣传活动”2月1日在上海南站成功举办。" //正文
        };
      }
    }
  },
  data() {
    return {
      dattailsInfo: {},
      url: "",
      srcList: [], //封面图片加名字
      srcImg: [], //封面图片
      activityList: [], //活动照片加名字
      activityImg: [], //活动照片
      bulletinList: [] //活动简报照片加名字
    };
  },
  methods: {
    close() {
      this.$parent.hideSysDetail();
      this.detailsHtml = "";
    },
    // 指标申报
    async initDetails(id = this.systemId) {
      if (this.type === 0) {
        let res = await this.request(
          `${JUDICIAL_BACKEND}/judicial/sysInput/${id}`,
          "get"
        );
        this.$parent.showSysDetail();
        this.dattailsInfo = res;
        this.dattailsInfo.target = JSON.parse(this.dattailsInfo.target); //考核指标
        this.dattailsInfo.content = JSON.parse(this.dattailsInfo.content); //内容、简介
        this.dattailsInfo.objectLaw = JSON.parse(this.dattailsInfo.objectLaw); //普法对象
        this.bulletinList = JSON.parse(this.dattailsInfo.bulletin); //活动简报图片加名字
        // console.log("活动简报", this.bulletinList);

        this.activityList = JSON.parse(this.dattailsInfo.imgs); //活动照片加名字
        this.activityList.forEach(item => {
          let { name, url } = item;
          this.activityImg.push(url);
        });
        // // console.log("照片数组", this.activityImg);

        // // console.log("指标申报", this.dattailsInfo);
      } else if (this.type === 1) {
        // let data = await this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites/${id}`, 'get')
        let data = await this.request(
          `${JUDICIAL_BACKEND}/judicial/sysInput/${id}`,
          "get"
        );

        this.$parent.showSysDetail();
        this.dattailsInfo = data;
        this.dattailsInfo.coOrganizer = JSON.parse(
          this.dattailsInfo.coOrganizer
        );
        // 封面图片
        this.srcList = JSON.parse(this.dattailsInfo.imgs);
        this.srcList.forEach(item => {
          let { name, url } = item;
          this.srcImg.push(url);
        });
        // // console.log("小程序", this.srcList);
      }
    }
  },
  watch: {
    systemId(val) {
      if (val) {
        this.initDetails(val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import './system-details.less';
</style>
<style lang="less">
.el-image-viewer__close {
  color: #fff;
}
.el-image-viewer__wrapper:focus {
  outline: none;
}
.details-white {
  p {
    margin-bottom: 3%;
    text-indent: 2em;
    line-height: 26px;
    font-size: 14px;
    letter-spacing: 1px;
    color: #fff;
    font-weight: lighter;
    // font-family: "仿宋";
  }
  img {
    width: 74%;
    display: block;
    margin: 0 auto 3%;
  }
}
</style>
