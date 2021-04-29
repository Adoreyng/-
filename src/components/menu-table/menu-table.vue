<template>
  <div v-if="show" class="Table">
    <div class="table-content">
      <header class="heade">
        <!-- <div class="back" @click="close">
          <i class="el-icon-arrow-left"></i>返回
        </div>-->
        <!-- <div class="close iconfont icon-guanbi6" @click="close"></div> -->
        <div class="close" title="关闭" @click="close"></div>
      </header>
      <!-- 左侧数据 -->
      <div class="menuList">
        <ul>
          <li
            v-for="(item, index) in menuList"
            :key="index"
            @click="changeMenuId(index,item.judicialName)"
          >
            <p :title="item.judicialName" :class="menuId == index?'active':''">
              <span></span>
              {{item.judicialName}}
            </p>
            <!-- <i class="el-icon-arrow-right" v-if="menuId == index"></i>
            <i class="el-icon-arrow-down" v-else></i>-->
            <span>{{item.total}}</span>
          </li>
        </ul>
      </div>
      <!-- 中间数据 -->
      <div class="tab-box">
        <el-tabs
          tab-position="left"
          style="height: 100%;width: 100%;"
          v-model="activeId"
          @tab-click="handleClick"
        >
          <el-tab-pane name="2">
            <div title="全部工作" slot="label" class="labels">
              <img src="../../assets/images/home/system-icon1-1.png" alt /> 全部工作
            </div>
          </el-tab-pane>
          <el-tab-pane name="0">
            <div title="指标申报数" slot="label" class="labels">
              <img src="../../assets/images/home/system-icon2.png" alt /> 指标申报数
            </div>
          </el-tab-pane>
          <el-tab-pane name="1">
            <div title="小程序活动数" slot="label" class="labels">
              <img src="../../assets/images/home/system-icon3.png" alt /> 小程序活动数
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 右侧数据 -->
      <div class="table-detail">
        <div class="search-content">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-input
                prefix-icon="el-icon-search"
                size="small"
                v-model="searchForm.name"
                @clear="onSubmit(2)"
                placeholder="请输入关键词"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="sousuo" size="small" type="primary" @click="onSubmit(1)">搜 索</el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-table
          class="data-table"
          height="83%"
          :data="tableData"
          :empty-text="'暂无数据'"
          element-loading-text="拼命加载中"
          @row-click="menuShow"
        >
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.prop"
            align="center"
            :label="item.label"
            :class-name="item.className ? item.className : ''"
            :show-overflow-tooltip="true"
            :width="item.prop=='name'?280:''"
          >
            <template slot-scope="scope">
              <div
                :title="item.prop !='source' ? scope.row[item.prop] : scope.row[item.prop]==0?'指标申报':scope.row[item.prop]==1?'小程序':''"
              >{{ item.prop !='source' ? scope.row[item.prop] : scope.row[item.prop]==0?'指标申报':scope.row[item.prop]==1?'小程序':''}}</div>
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
      </div>
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
    childIndex: Number,
    childValue: String
  },
  data() {
    return {
      searchForm: {
        name: ""
      },
      type: 1,
      pageNum: 0,
      pageSize: 10,
      total: 0,
      menuId: 0,
      activeId: "2",
      // deChildIndex:this.childIndex,
      deChildValue: this.childValue,
      menuList: [
        // { name: "全市", id: 0, total: 2 },
        // { name: "浦东新区司法局", id: 1, total: 2 },
        // { name: "徐汇区司法局", id: 2, total: 1 },
        // { name: "长宁区司法局", id: 3, total: 3 },
        // { name: "普陀区司法局", id: 4, total: 4 },
        // { name: "虹口区司法局", id: 5, total: 5 },
        // { name: "杨浦区司法局", id: 6, total: 6 },
        // { name: "黄浦区司法局", id: 7, total: 7 },
        // { name: "静安区司法局", id: 8, total: 8 },
        // { name: "闵行区司法局", id: 9, total: 9 },
        // { name: "宝山区司法局", id: 10, total: 10 },
        // { name: "嘉定区司法局", id: 11, total: 11 },
        // { name: "金山区司法局", id: 12, total: 13 }
      ],
      tableData: []
    };
  },

  computed: {
    columns() {
      let list = [];
      list = [
        {
          label: "名称",
          prop: "name",
          className: "active-name"
        },
        {
          label: "时间",
          prop: "createTime"
        },
        {
          label: "区域",
          prop: "area"
        },
        {
          label: "来源",
          prop: "source"
        }
      ];

      return list;
    }
  },
  watch: {
    /*
     * type类型
     * 999 -- 精彩活动回顾
     * 1 -- 专项活动
     * 2 -- 七五普法
     * 3 -- 委办局
     * 4 -- 法宣案例
     */
    // 接收到的index
    childIndex: {
      immediate: true,
      handler(val) {
        // console.log("qwqwqw", val);
        this.menuId = val + 1;
      }
    },
    // 接收到的名字
    childValue: function(val) {
      this.deChildValue = val;
      // // console.log('xuxuxu',val)
    },
    // childIndex:function(index){
    //  // console.log(index);
    //  this.deChildIndex = index

    // },
    show(val) {
      if (val) {
        this.pageNum = 1;
        this.tableData = [];
        this.searchForm.name = "";
        this.initData();
      }
    },
    type(val) {
      let type = val;
      if (val && val !== -1) {
        if (val === 999) type = null;
        debugger;
        this.initData(type);
      }
    }
  },
  created() {
    this.initData(1);
    // 获取左侧数据
    this.getMenu();
    // 获取全部数据
    // this.menuAll()
    this.initData();
  },
  methods: {
    // 同步左侧事件
    async getMenu() {
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/sysInput/areaList`,
        "get"
      );
      // console.log("bbb", res);
      let dataNum = 0; // 数字
      res.map(item => {
        dataNum += item.total;
      });
      let dataObj = {
        judicialName: "全市",
        total: dataNum
      };
      this.menuList = res;
      this.menuList.unshift(dataObj);
      // console.log(this.menuList);
    },
    // 右侧展示点击事件
    menuShow(row, column, event) {
      this.$parent.requestSysDetails(row.id, row.source, 3);
    },

    // 中间点击事件
    handleClick(tab, event) {
      // console.log(tab.index);
      this.pageNum = 0;
      this.tableData = [];
      this.searchForm.name = "";
      this.$refs.infinite.$emit("$InfiniteLoading:reset");
      this.load();
    },

    // 查询搜索事件
    async onSubmit(type) {
      this.pageNum = 1;
      this.tableData = [];
      await this.initData();
      if (type === 1) {
        this.$message({
          message: `筛选后共${this.total}条数据`,
          type: "success",
          center: true
        });
      }
    },
    changeMenuId(index, value) {
      this.menuId = index;
      // console.log(index);
      // console.log(value);
      this.deChildValue = value;
      this.pageNum = 0;
      this.tableData = [];
      this.searchForm.name = "";
      this.$refs.infinite.$emit("$InfiniteLoading:reset");
      this.load();
    },

    // 同步右边的数据
    async initData(type = this.type, $state) {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortType: "desc",
        source: this.activeId == 2 ? null : this.activeId,
        judicialName: this.menuId == 0 ? "" : this.deChildValue,
        content: this.searchForm.name
        // activeId：this.activeId
      };
      let res = await this.request(
        `${JUDICIAL_BACKEND}/judicial/sysInput`,
        "get",
        data
      );
      this.tableData = [...this.tableData, ...res.list];
      this.total = res.pager.total;
      if (res.list.length < this.pageSize) {
        this.$refs.infinite.$emit("$InfiniteLoading:complete");
      } else {
        try {
          this.$refs.infinite.$emit("$InfiniteLoading:loaded");
        } catch (error) {}
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
      // // console.log(this.pageNum)
      this.pageNum = 1;
      this.tableData = [];
      this.searchForm.name = "";
      this.$parent.menuTableBoxFun();
      this.activeId = "2";
    }
  }
};
</script>
<style lang='less' scoped>
@import './menu-table-scoped.less';
</style>
<style lang="less">
@import './menu-table.less';
</style>
