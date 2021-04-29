<template>
  <div class="page-header-content" :style="title == 4 || title == 5 ? 'margin-top: 55px;' : title == 2 || title == 7 ? 'margin-bottom: 25px;' : ''">
    <div class="page-header" :class="[title==10 ? 'page-header10' : title==7 ? 'page-header7' : '']" :style="title == 8 || title == 3 ? 'margin-bottom: 16px;' : ''">
      <div v-if="title==7" @click.self="handlerTitleClick(0)" style="cursor: pointer; z-index: 5;" :style="active==0?'position: absolute;width: 34%;height: 100%;z-index:2':'position: absolute;width: 23%;height: 100%;'"></div>
      <div v-if="title==7" @click.self="handlerTitleClick(1)" style="cursor: pointer; z-index: 5;" :style="active==0?'position: absolute;width: 16%;height: 100%;left: 34%;z-index:2':'position: absolute;width: 28%;height: 100%;left: 23%;'"></div>
      <div v-if="title === 7" style="width: 51%; height: 40px"></div>
      <div class="title" :class="[title==7 ? 'title7' : title == 1 ? 'title1' : '']" @click="handlerTitleClick">
        <!-- <p class="title-zh">{{title}}</p>
        <p class="title-en">{{en}}</p>-->
        <img
          class="title-img"
          v-if="title==1"
          src="../../assets/images/home/title/title1.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==2"
          src="../../assets/images/home/title/title2.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==3"
          src="../../assets/images/home/title/title3.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==4"
          src="../../assets/images/home/title/title4.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==5"
          src="../../assets/images/home/title/title5.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==6"
          src="../../assets/images/home/title/title6.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==7 && active==0"
          src="../../assets/images/home/title/title7.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==7 && active==1"
          src="../../assets/images/home/title/title7-1.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==8"
          src="../../assets/images/home/title/title8.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==9"
          src="../../assets/images/home/title/title9.png"
          alt
          srcset
        />
        <img
          class="title-img"
          v-if="title==10"
          src="../../assets/images/home/title/title10.png"
          alt
          srcset
        />
      </div>
      <div class="more" v-if="more" @click="VidoListEvent();requestMore()">查看更多》</div>
      <div class="union" v-if="unionData.isNeed">
        <p>
          区
          <span>{{unionData.q}}</span>
        </p>
        <p>
          委办局
          <span>{{unionData.j}}</span>
        </p>
        <p>
          法律传媒
          <span>{{unionData.m}}</span>
        </p>
      </div>
    </div>
    <div
      class="x_content"
      style="margin-top: 0;"
      :style="`height:${height? height+'px' : 'auto'}; background-color: ${color};${title==9 || title==10 ? 'padding:30px 32px' : ''} `"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "page-header",
  props: {
    title: Number,
    en: String,
    height: { type: Number, default: 240 },
    active: { type: Number, default: 0 },
    more: { type: Boolean, default: false },
    color: { type: String, default: "#061d54" },
    unionData: {
      type: Object,
      default: () => {
        return {
          isNeed: false
        };
      }
    }
  },
  methods: {
    requestMore() {
      this.$emit("requestMore");
    },
    // 视频列表
    VidoListEvent() {
      this.$emit("VidoListEvent");
    },
    handlerTitleClick(val){
      this.$emit('handlerTitleClick',val);
    }
  }
 
};
</script>
<style lang='less' scoped>
.page-header-content {
  margin-bottom: 30px;
}
.page-header10 {
  background: url("../../assets/images/home/page-top.png") no-repeat !important;
  background-position: right bottom !important;
  background-size: 64% auto !important;
}
.page-header7 {
  background: url("../../assets/images/home/page-top.png") no-repeat !important;
  background-position: right bottom !important;
  background-size: 70% auto !important;
  background-position-x: 172% !important;
}
.page-header .title7 {
  width: 51% !important;
  height: 40px !important;
  position: absolute;
  left: 0;
  top: 0;
}
.page-header .title1 {
  cursor: pointer;
}

.page-header {
  width: 100%;
  background: url("../../assets/images/home/page-top.png") no-repeat;
  background-position: right bottom;
  background-size: 70% auto;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 10px;
  .title {
    height: 100%;
    width: 35%;
    .title-img {
      height: auto;
      display: block;
      width: 100%;
    }
    .title-zh {
      font-size: 15;
      font-weight: bold;
      line-height: 1;
      color: #dff3f8;
      letter-spacing: 1px;
    }
    .title-en {
      line-height: 1.1;
      color: #dff3f8;
      font-size: 12px;
    }
  }
  .more {
    color: #849ed3;
    font-size: 13px;
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    font-family: "宋体";
    cursor: pointer;
  }
  .union {
    color: #6d83af;
    font-size: 13px;
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      margin: 0 3px;
      font-weight: bold;
      color: #e2f6fb;
      span {
        color: #5cd8ff;
      }
    }
  }
}
.x_content {
  width: 100%;
  height: 230px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px 15px;
  background-color: #03194b;
}
</style>