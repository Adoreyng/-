<template>
  <div v-if="vshow" class="vido-list">
    <div class="vido-list-mask">
      <header class="heade">
        <img
          class="header-title"
          v-if="type == 1"
          src="../../assets/images/table-scroll/pufaxiaoshiping.png"
          alt
        />
        <img
          class="header-title"
          v-if="type != 1"
          src="../../assets/images/table-scroll/fazhiwenhua.png"
          alt
        />
        <div class="close" title="关闭" @click="close"></div>
      </header>
      <div class="content">
        <div class="content-bg">
          <div class="search-content">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item>
                <el-input
                  v-model="searchForm.keyword"
                  prefix-icon="el-icon-search"
                  @clear="onSubmit(2)"
                  clearable
                  placeholder="请输入关键词"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="search-btn" type="text" @click="onSubmit(1)">搜索</el-button>
              </el-form-item>
            </el-form>
            <p class="show-total">共有{{total}}条数据</p>
          </div>
          <ul class="infinite-list vido-list-content" v-infinite-scroll="load">
            <li
              class="swiper-slide video-box"
              v-for="(item, index) in infoData"
              :key="index"
              @click="handlerClickEvent(item.id)"
            >
              <div class="img-content">
                <div class="video-btn" v-if="type!=2">
                  <img src="../../assets/images/home/play.png" alt />
                </div>
                <img :class="type!=2 ? '' : 'hoverImg'" :src="item.url" />
              </div>
              <p :title="item.name">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
export default {
  name:'video-list',
  props: {
    vshow: Boolean,
    detaKind: Number
  },
  data() {
    return {
      count: 0, //element-ui
      searchForm: {
        keyword: ""
      },
      total: "",
      pageNum: 1,
      pageSize: 10, //每页条数
      sortBy: "", //排序字段名
      id: null,
      infoData: [],
      type: null
    };
  },
  mounted() {
    // this.initSwiper();
  },
  watch: {
    /*
     * type类型
     * 1 -- 法宣小视频
     * 2 -- 法治文化
     */
    async detaKind(val) {
      if (val) {
        this.type = val;
        this.$parent.level = 2;
        await this.initSwiper(val);
        this.$parent.showVidoListss();
      }
    }
  },
  computed: {
    newdataList: function() {
      return this.sortKey(this.dataList, "addtime");
    }
  },
  methods: {
    close() {
      this.$parent.level = 2;
      this.pageNum = 1;
      this.infoData = [];
      this.searchForm.keyword = "";
      this.$parent.detaKind = null;
      this.$parent.hideVidoList();
    },
    // 根据时间排序
    sortKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x > y ? -1 : x < y ? 1 : 0;
      });
    },
    // 查询搜索事件
    async onSubmit(type) {
      this.pageNum = 1;
      this.infoData = [];
      await this.initSwiper();
      if (type === 1) {
        this.$message({
          message: `筛选后共${this.total}条数据`,
          type: "success",
          center: true
        });
      }
    },
    handlerClickEvent(id) {
      this.$parent.level = 3;
      this.$parent.requestVidoId(id);
      this.$parent.showVideo(this.type);
    },
    // 接口调用
    async initSwiper() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortBy: 'createTime',
        sortType: "desc",
        name: this.searchForm.keyword,
        kind: this.type
      };
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/rotationCharts`,
        "get",
        data
      );
      this.infoData = [...this.infoData, ...res.list];
      this.total = res.pager.total;
    },
    // element 无限滚动
    load() {
      this.pageNum++;
      this.initSwiper();
    },
    // 搜索框清空
    empty() {
      this.searchForm.keyword = "";
    }
  }
};
</script>
<style lang='less' scoped>
@import './video-list.less';
</style>
<style lang="less">
.vido-list {
  .el-form-item {
    height: 30px;
    margin-bottom: 0;
    .el-input__icon {
      line-height: 30px;
    }
    .el-form-item__content {
      line-height: 30px;
      .el-input__inner {
        width: 300px;
        height: 30px;
        line-height: 30px;
        border-radius: 0;
        background-color: transparent;
        color: #8d93a0;
        border-color: #466288;
      }
    }
  }
}
</style>