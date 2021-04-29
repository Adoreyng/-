<template>
  <div v-if="show" class="table-scroll">
    <div class="table-content">
      <header class="heade">
        <!-- /*
          * type类型
          * 999 -- 精彩活动回顾
          * 998 -- 联盟矩阵
          * 1 -- 专项活动
          * 2 -- 七五普法
          * 3 -- 委办局
          * 4 -- 法宣案例
          * 5 -- 履职评议
          */ -->
        <img
          class="header-title"
          v-if="type == 999"
          src="../../assets/images/table-scroll/jingcaihuodonghuigu.png"
          alt
        />
        <img
          class="header-title"
          v-if="type == 1"
          src="../../assets/images/table-scroll/zhuanxianghuodong.png"
          alt
        />
        <img class="header-title" v-if="type == 2" src="../../assets/images/table-scroll/qiwu.png" alt />
        <img
          class="header-title"
          v-if="type == 3"
          src="../../assets/images/table-scroll/weibanju.png"
          alt
        />
        <img
          class="header-title"
          v-if="type == 4"
          src="../../assets/images/table-scroll/faxuananliku.png"
          alt
        />
        <img
          class="header-title"
          v-if="type == 5"
          src="../../assets/images/table-scroll/lvzhipingyi.png"
          alt
        />
        <img
          class="header-title"
          v-if="type == 998"
          src="../../assets/images/table-scroll/lianmeng.png"
          alt
        />
        <div class="close" title="关闭" @click="close"></div>
      </header>
      <section class="section-content">
        <div class="search-content">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="searchForm.name"
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
        <!-- <el-table
          class="data-table"
          height="76%"
          :data="tableData"
          v-el-table-infinite-scroll="load"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="10"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" align="center" :label="item.label"></el-table-column>
        </el-table>-->

        <el-table
          class="data-table"
          height="76%"
          :data="tableData"
          :empty-text="'暂无数据'"
          @row-click="handlerClickEvent"
          element-loading-text="拼命加载中"
        >
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.prop"
            :title="item.name"
            align="center"
            :label="item.label"
            :class-name="item.className ? item.className : ''"
          >
            <template slot-scope="scope">
              <div :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
            </template>
          </el-table-column>
          <template slot="append">
            <infinite-loading
              ref="infinite"
              @infinite="load"
              :distance="20"
              spinner="bubbles"
              forceUseInfiniteWrapper=".el-table__body-wrapper"
            >
              <div class="no-more" slot="no-more">
                <!-- 我~是有底线的 (～￣▽￣)～ -->
              </div>
              <div class="no-more" slot="no-results">
                <!-- 暂无结果 Ծ‸Ծ -->
              </div>
              <div class="no-more" slot="error">
                <!-- 出错了 (╯‵□′)╯︵┻━┻ -->
              </div>
            </infinite-loading>
          </template>
        </el-table>
      </section>
    </div>
  </div>
</template>
<script>
// 引入table无限滚动
import elTableInfiniteScroll from "el-table-infinite-scroll";
import InfiniteLoading from "vue-infinite-loading";
import { JUDICIAL_BACKEND } from "@/utils/baseUrl";
export default {
  name: "table-scroll",
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll
  },
  components: { InfiniteLoading },
  props: {
    show: Boolean,
    /*
     * type类型
     * 999 -- 精彩活动回顾
     * 998 -- 联盟矩阵
     * 1 -- 专项活动
     * 2 -- 七五普法
     * 3 -- 委办局
     * 4 -- 法宣案例
     * 5 -- 履职评议
     */
    type: Number,
    activeId: Number
  },
  data() {
    return {
      busy: false,
      searchForm: {
        name: ""
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      activeType:0
    };
  },
  computed: {
    columns() {
      let list = [];
      if (this.type === 1) {
        list = [
          {
            label: "专项类别",
            prop: "typeDesc"
          },
          {
            label: "活动名称",
            prop: "name",
            className: "active-name"
          },
          {
            label: "发布机构",
            prop: "organization"
          },
          {
            label: "发布时间",
            prop: "createTime"
          }
        ];
      }
      if (this.type === 2) {
        list = [
          {
            label: "活动名称",
            prop: "name",
            className: "active-name"
          },
          {
            label: "区域",
            prop: "area"
          },
          {
            label: "发布时间",
            prop: "createTime"
          }
        ];
      }
      if (this.type === 999 || this.type === 5 || this.type === 3) {
        list = [
          {
            label: "活动名称",
            prop: "name",
            className: "active-name"
          },
          {
            label: "发布机构",
            prop: "organization"
          },
          {
            label: "发布时间",
            prop: "createTime"
          }
        ];
      }
      if (this.type === 4) {
        list = [
          {
            label: "分类",
            prop: "typeDesc"
          },
          {
            label: "名称",
            prop: "name",
            className: "active-name"
          },
          {
            label: "发布机构",
            prop: "organization"
          },
          {
            label: "发布时间",
            prop: "createTime"
          }
        ];
      }
      if (this.type === 998) {
        list = [
          {
            label: "名称",
            prop: "name",
            className: "active-name"
          },
          {
            label: "发布时间",
            prop: "createTime"
          }
        ];
      }
      return list;
    }
  },
  methods: {
    // 查询搜索事件
    async onSubmit(type) {
      this.pageNum = 1;
      this.tableData = [];
      await this.initData();
      if (type === 1) {
        this.$message({
          message: `筛选后共${this.total}条数据`,
          type: 'success',
          center: true
        })
      }
    },
    // 点击列表进入详情
    handlerClickEvent(row, column, event) {
      if (this.type === 998) {
        this.$parent.requestDetails(row.id, 2, 3);
      } else {
        this.$parent.requestDetails(row.id, 1, 3);
      }
    },
    async initData(type = this.type, $state) {
      if (this.type == 998) {
        let data = {
          ...this.searchForm,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          sortBy: 'createTime',
          sortType: 'desc',
          officialAccountId: this.activeId
        };
        let res = await this.request(
          `${JUDICIAL_BACKEND}/judicial/officialDetailDatas`,
          "get",
          data
        );
        this.$parent.showTable();//展示弹框
        this.tableData = [...this.tableData, ...res.list];
        this.total = res.pager.total;
        if ($state) {
          if (res.list.length < this.pageSize) {
            $state.complete();
          } else {
            $state.loaded();
          }
        }
      } else {
        let data = {
          ...this.searchForm,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          sortBy: 'createTime',
          sortType: 'desc',
          type: type === 999 ? null : type
        };
        let res = await this.request(
          `${JUDICIAL_BACKEND}/judicial/activities`,
          "get",
          data
        );
        this.$parent.showTable();
        this.tableData = [...this.tableData, ...res.list];
        this.total = res.pager.total;
        if ($state) {
          if (res.list.length < this.pageSize) {
            $state.complete();
          } else {
            $state.loaded();
          }
        }
      }
    },
    // tabla滚动加载
    load($state) {
      this.pageNum++;
      this.initData(this.type, $state);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    close() {
      this.pageNum = 1;
      this.tableData = [];
      this.searchForm.name = "";
      this.$parent.hideTable();
    },
    VidoListEvent() {
      this.$parent.showVidoList();
    }
  },
  watch: {
    /*
     * type类型
     * 999 -- 精彩活动回顾
     * 998 -- 联盟矩阵
     * 1 -- 专项活动
     * 2 -- 七五普法
     * 3 -- 委办局
     * 4 -- 法宣案例
     * 5 -- 履职评议
     */
    type(val) {
      let type = val;
      if (val && val !== -1) {
        if (val === 999) type = null;
        this.initData(type);
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import './table-scroll-scoped.less';
</style>
<style lang="less">
@import './table-scroll.less';
</style>
