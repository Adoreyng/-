<template>
  <div v-if="dshow" class="details">
    <div class="details-black">
      <header class="heade">
        <img class="back" title="返回" @click="close" src="../../assets/images/details/back.png" alt />
        <div class="close" title="关闭" @click="close"></div>
      </header>
      <div class="details-content">
        <!-- ----------------------------------------------------------------------------- -->
        <!-- 普通详情页容器 -->
        <div style="width: 100%;height: 100%;" v-if="type !== 3 && type !== 4">
          <div class="details-top">
            <h1>{{dattailsInfo.name}}</h1>
            <h3>
              {{dattailsInfo.organization}}
              <span></span>
              发布于 : {{dattailsInfo.createTime}}
            </h3>
          </div>
          <div class="details-white" v-html="dattailsInfo.content"></div>
        </div>
        <!-- 地图三级弹框详情页容器 -->
        <div class="map-details-content" v-if="type === 3">
          <div class="info-content-top">
            <!-- <div class="unit-pic"><img :src="dattailsInfo.img" alt=""></div> -->
            <div class="unit-pic">
              <!-- <img src="../../assets/images/home/law1.jpg" alt=""> -->
              <el-image
                class="unit-img"
                src="http://47.100.119.227/law/static/img/swiper1.d7e6247.jpg"
                :preview-src-list="['http://47.100.119.227/law/static/img/swiper1.d7e6247.jpg']"
              ></el-image>
            </div>
            <div class="info-content-right">
              <p>名称: {{dattailsInfo.name}}</p>
              <p>类别: {{dattailsInfo.type}}</p>
              <p>时间: {{dattailsInfo.createTime}}</p>
              <p>地址: {{dattailsInfo.address}}</p>
              <p>负责人姓名: {{dattailsInfo.director}}</p>
            </div>
          </div>
          <div class="info-content-bottom">工作特色: {{dattailsInfo.workFeatures}}</div>
        </div>
        <!-- ------------------------------------------------------------------------------------------------------------ -->

      </div>
    </div>
  </div>
</template>
<script>
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
export default {
  name:'Details',
  props: {
    detailsId: Number,
    dshow: Boolean,
    type: { type: Number, default: 1 }, // 1 -- 普通新闻/活动    2 -- 公众号文章   3 -- 地图三级页面
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
      infoData: [],
      // infoData: [
      //   {type: 1, contentType: 2, name: '国安日·看上海', organization: '上海司法局', area: '黄浦区', createTime: '2021/4/15', id: 1, content: '2021年4月15日是第6个全民国家安全教育日，以“践行总体国家安全观，统筹发展和安全，统筹传统安全和非传统安全，营造庆祝建党100周年良好氛围”为主题，各区开展了形式各样，内容丰富的主题宣传活动。'},
      //   {type: 1, contentType: 2, name: '国家安全教育日', organization: '上海司法局', area: '静安区', createTime: '2021/4/15', id: 2, content: '为贯彻落实习近平总书记提出的总体国家安全观，推动全民国家安全教育深入人心，4月15日上午，2021年静安区4.15全民国家安全教育日宣传周启动仪式在四行仓库抗战纪念馆举行。区委常委、政法委书记赵汝青出席。'},
      //   {type: 1, contentType: 2, name: '全民国家安全教育日主题活动', organization: '上海司法局', area: '长宁区', createTime: '2021/4/15', id: 3, content: '今天下午，在长宁区4·15全民国家安全教育日主题活动现场，当带有“维护国家安全，构建和谐社会”字样的卷轴徐徐打开时，一下点燃了大家的激情。'},
      //   {type: 1, contentType: 2, name: '千钧“医法”守护医疗卫生你我他', organization: '上海司法局', area: '黄浦区', createTime: '2021/4/15', id: 4, content: '近日，黄浦区卫生健康委在上海第九人民医院黄浦分院报告厅举办专题学习讲座，区卫生健康委二级调研员张燕尔出席并主持，区卫生健康委法律顾问、上海邦信阳中建中汇律师事务所郑峻律师进行主讲，委机关各科室、委属单位分管领导和法制干部、部分社会办医疗机构工作人员以及九院黄浦分院部分医护人员共计100多人参加学习培训。'},
      //   {type: 1, contentType: 2, name: '国家安全教育日主题活动', organization: '上海司法局', area: '徐汇区', createTime: '2021/4/15', id: 5, content: '情景剧《奇怪的访客》和《旅游达人史蒂夫》，真实再现事件发生的情景，引起现场参加者浓厚的兴趣和热情参与，大家积极解密疑点、踊跃答题。在警官现场的答疑解惑和指点迷津中，提醒市民危险就潜藏在我们身边，应该时刻将国家安全意识记在心间。'},
      //   {type: 1, id: 6, icon: require('../../assets/images/home/w-active1.jpg'), organization: '上海司法局',name: '金山检察法治副校长带你宣誓成人', createTime: '2021-02-23', content: '4月9日下午，上海师范大学第二附属中学举行2021届学生“十八岁”成人仪式活动，金山区检察院党组成员、副检察长潘春伟应邀参加活动，为同学们送去一个不一样的成人礼。'},
      //   {type: 1, id: 7, icon: require('../../assets/images/home/w-active2.jpg'), organization: '上海司法局', name: '法进医院、尊重医护、法治同行', createTime: '2021-03-15', content: '为了进一步加强社会公众与各职能部门对医护人员的权益保障力度，近日，普陀区司法局联合普陀区卫健委在全区各大医疗卫生机构积极开展《上海市医疗卫生人员权益保障办法》宣传。利用宣传栏、电子屏等宣传阵地，在显著位置张贴宣传海报挂图，滚动播放普法信息资讯。'},
      //   {type: 1, id: 8, icon: require('../../assets/images/home/w-active3.jpg'), organization: '上海司法局', name: '谁执法谁普法', createTime: '2021-03-27', content: '《上海市医疗卫生人员权益保障办法》（以下简称《办法》）正式施行，这是全国首部以政府规章形式来立法保障医疗卫生人员合法权益的省级规章。近日，黄浦区卫生健康委在上海第九人民医院黄浦分院报告厅举办专题学习讲座，区卫生健康委二级调研员张燕尔出席并主持，区卫生健康委法律顾问、上海邦信阳中建中汇律师事务所郑峻律师进行主讲，委机关各科室、委属单位分管领导和法制干部、部分社会办医疗机构工作人员以及九院黄浦分院部分医护人员共计100多人参加学习培训。张燕尔表示希望通过本次学习讲座提升基层卫生法制干部的法制意识和业务能力，提升医疗卫生人员权益保护的法治化水平。'},
      //   {type: 1, id: 9, icon: require('../../assets/images/home/w-active4.jpg'), organization: '上海司法局', name: '提振消费信心市场监管执法普法 ', createTime: '2021-03-30', content: '嘉定区市场监督管理局干部在位于南京东路上的新世界大丸百货，开展消费者维权普法服务活动，现场为市民讲解《消费者权益保护法》、《产品质量法》等法律法规知识，解答消费维权疑问，发放消保维权的普法宣传资料，并为群众提供现场食品快检服务，提升群众的维权意识和自我维权能力。'},
      //   {type: 1, id: 10, icon: require('../../assets/images/home/w-active5.jpg'), organization: '上海司法局', name: '宝山区司法局局长走进大场中学 ', createTime: '2021-04-05', content: '大场中学法治副校长、宝山区司法局局长沈海敏表示，很荣幸担任大场中学法治副校长,将带领全体司法行政系统法治副校长立足学校实际，结合学生特点,开展法治宣教活动,在青少年的心中培育法治的种子，从源头上预防和减少青少年违法犯罪，促进青少年健康成长。协助学校依法、妥善处理各类法律事务,维护在校学生的合法权益，切实推进学校治理体系和治理能力现代化。'},
      //   {type: 1, id: 11, icon: require('../../assets/images/home/law0.jpg'), organization: '上海司法局', name: '立足本职做贡献 履职尽责展风采  ', createTime: '2021/3/15', content: '由内蒙古师范大学文化产业发展研究中心和青城阅立方书店共同举办的“草原天骏·蒙古马韵——指尖上的蒙古马剪纸传习体验活动”在青城阅立方书店举办。盟政协常委、锡林郭勒盟教育园丁图书销售有限公司总经理、青城阅立方书店负责人庄冬梅在活动期间接受记者采访。来自首府近百名儿童在家长的陪伴下一同体验了剪纸这一非遗技艺，旨在教育和引导少年儿童传承弘扬“蒙古马精神”，培育吃苦耐劳、勇往直前的优秀品格和不达目的不罢休的蒙古马精神。'},
      //   {type: 1, id: 12, icon: require('../../assets/images/home/law1.jpg'), organization: '上海司法局', name: '工作总结暨“头雁”风采展示大会', createTime: '2021/2/19', content: '岁序常易，华章日新。2月5日晚，市委办公厅机关党委联合工会、团支部、妇委会以“展示‘头雁’风采、争当模范机关”为主题，举办了厅室办年度工作总结暨“头雁”风采展示大会。市委常委、秘书长、政法委书记许明出席会议并讲话，市委副秘书长、办公厅主任、机关党委书记郭东风主持会议。'},
      //   {type: 1, id: 13, icon: require('../../assets/images/home/law2.jpg'), organization: '上海司法局', name: '奋进新时代 机关展风采', createTime: '2021/3/2', content: '参展作品主要以为党和人民的事业增添正能量为价值取向，以弘扬老干部工作“安专迷”精神为核心，以离退休干部服务管理工作为主要内容。参展作品中，有的记录了老干部工作者在疫情期间主动作为、大胆创新，积极服务老干部的工作瞬间，有的记录了身边的美丽景色。'}
      // ]
    };
  },
  methods: {
    close() {
      this.$parent.hideDetail();
      this.detailsHtml = "";
    },
    
    async initDetails(id = this.detailsId) {
      if (this.type === 1) {
        // console.log(id)
        let res = await this.request(
          `${JUDICIAL_BACKEND}/judicial/activities/${id}`,
          "get"
        );
        this.$parent.showDetail();
        // this.dattailsInfo = this.infoData[id-1];
        this.dattailsInfo = res;
      } else if (this.type === 2) {
        let res = await this.request(
          `${JUDICIAL_BACKEND}/judicial/officialDetailDatas/${id}`,
          "get"
        );
        this.$parent.showDetail();
        this.dattailsInfo = res;
      } else if (this.type === 3) {
        let data = await this.request(
          `${JUDICIAL_BACKEND}/judicial/demonstrationSites/${id}`,
          "get"
        );
        this.$parent.showDetail();
        this.dattailsInfo = data.data;
      }
    }
  },
  watch: {
    detailsId(val) {
      if (val) {
        this.initDetails(val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import './Details.less';
</style>
<style lang="less">
.el-image-viewer__close {
  color: #fff;
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
  }
  img {
    width: 74%;
    display: block;
    margin: 0 auto 3%;
  }
}
</style>
