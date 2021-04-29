<template>
  <div class="mask-wrap">
    <div class="tab-wrap">
      <div class="pre-wrap" v-show="current === 0">
        <img class="tab-bg" src="./tab1.png" alt="">
        <div class="box">
          <div class="box-top">共计{{totalCount}}个，其中{{ratedCount}}家已获评</div>
          <div class="content-wrap">
            <div class="content">
              <div class="list-wrap" v-for="(item, index) in tab0" :key="index">
                <div class="list-wrap-item" style="cursor: pointer;" @click="$emit('choose', item.id)">
                  <img :src="item.img" class="item-image"
                       style="position: absolute; z-index: 1; width: 100%; left: 50%; top: 32%; transform: translate(-50%, -50%)"
                       alt="">
                  <img class="kuang" src="./kuang.png" alt="">
                  <div class="status" v-if="item.rated === 1">已获评</div>
                  <div class="child-content">
                    <div class="name">名称:{{item.name}}</div>
                    <div class="area">地址:{{item.address}}</div>
                    <div class="ts">工作特色:{{item.workFeatures}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="next-wrap" v-show="current === 1">
        <img class="tab-bg" src="./tab2.png" alt="">
        <div class="box">
          <div class="box-top">共计{{totalCount}}个，其中{{ratedCount}}家已获评</div>
          <div class="content-wrap">
            <div class="content">
              <div class="list-wrap" v-for="(item, index) in tab1" :key="index">
                <div class="list-wrap-item" style="cursor: pointer;" @click="chooseItem(item.id)">
                  <img class="item-image" :src="item.img"
                       style="position: absolute; z-index: 1; width: 100%; left: 50%; top: 32%; transform: translate(-50%, -50%)"
                       alt="">
                  <img class="kuang" src="./kuang.png" alt="">
                  <div class="status" v-if="item.rated === 1">已获评</div>
                  <div class="child-content">
                    <div class="name">名称:{{item.name}}</div>
                    <div class="area">地址:{{item.address}}</div>
                    <div class="ts">工作特色:{{item.workFeatures}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="title-pre-box" @click="tabSelect(0)">
        <div class="title-pre ya-hei" :style="{color: current === 0 ? '#c6ffff' : '#c4cee9'}">民主法治示范村(居)</div>
      </div>
      <div class="title-next-box" @click="tabSelect(1)">
        <div class="title-next ya-hei" :style="{color: current === 1 ? '#c6ffff' : '#c4cee9'}">法治文化阵地</div>
      </div>
      <img class="close-img" @click="$emit('close')" src="./close.png" alt="">
      <!--      <div style="position: absolute; left: 1.5%; top: 15%; width: 97%; height: 80%; background: rgba( 0, 0, 0, 0.7)"-->
      <!--           v-show="hoverItemValue" @mouseleave="hoverItemValue = null">-->
      <!--        {{hoverItemValue}}-->
      <!--      </div>-->
      <Loading v-if="loading"></Loading>
    </div>
  </div>
</template>

<script>
import Loading from './Loading'
import { JUDICIAL_BACKEND } from '@/utils/baseUrl'

export default {
  components: { Loading: Loading },
  data () {
    return {
      current: 0,
      totalCount: 0,
      ratedCount: 0,
      tab0: [],
      tab1: [],
      loading: false,
      hoverItemValue: null
    }
  },
  methods: {
    async init (type = 0) {
      this.loading = true
      // await this.timeout()
      const { data } = await this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites`, 'get', {
        pageNum: 1,
        pageSize: 1000,
        type
      })
      const rated = await this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites/ratedCount`, 'get', { code: 'xhcode' })
      this[`tab${type}`] = data.list || []
      this.totalCount = data.total || 0
      this.ratedCount = rated.data || 0
      this.current = type
      this.loading = false
    },
    timeout () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    },
    tabSelect (current) {
      this.current = current
      this.init(current)
    },
    chooseItem (id) {
      this.$emit('choose', id)
    },
    hoverItem (value) {
      this.hoverItemValue = value
    }
  }
}
</script>

<style lang="less" scoped>
  .ya-hei {
    font-family: "Microsoft YaHei", "微软雅黑", "MicrosoftJhengHei", "华文细黑", "STHeiti", "MingLiu", serif
  }

  .mask-wrap {
    /*width: 100vw;*/
    /*height: 100vh;*/
    position: relative;
    max-height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .tab-wrap {
      width: 900px;
      position: relative;
      box-sizing: border-box;

      .close-img {
        width: 50px;
        position: absolute;
        top: -2px;
        right: -10px;
      }

      .title-pre-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 240px;
        height: 52px;
        cursor: pointer;

        .title-pre {
          font-size: 20px;
          position: absolute;
          top: 15px;
          left: 25px;
        }
      }

      .title-next-box {
        position: absolute;
        top: 0;
        left: 240px;
        width: 260px;
        height: 52px;
        cursor: pointer;

        .title-next {
          font-size: 20px;
          position: absolute;
          top: 15px;
          left: 60px;
        }
      }

      .pre-wrap, .next-wrap {
        width: 100%;
        position: relative;

        .tab-bg {
          width: 100%;
        }

        .box {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          padding: 65px 10px 100px;
          box-sizing: border-box;

          .box-top {
            color: #c4cee9;
            font-size: 16px;
            margin-left: 12px;
            margin-bottom: 10px;
            position: relative;
          }

          .content-wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            box-sizing: border-box;

            .content {
              width: 100%;
              height: 100%;
              overflow-y: auto;
              touch-action: pan-y;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;

              .list-wrap {
                width: 20%;
                position: relative;
                padding: 0 10px 10px;
                box-sizing: border-box;

                .list-wrap-item {
                  overflow: hidden;
                  position: relative;

                  .item-image {
                    transition: transform 200ms;
                  }
                }

                .list-wrap-item:hover {
                  .item-image {
                    transform: translate(-50%, -50%) scale(1.1) !important;
                  }
                }

                .kuang {
                  width: 100%;
                  position: relative;
                  z-index: 10;
                }

                .status {
                  position: absolute;
                  top: 0;
                  right: 10px;
                  padding: 2px 3px;
                  font-size: 10px;
                  background: red;
                  color: #c6ffff;
                }

                .child-content {
                  z-index: 30;
                  width: calc(100% - 20px);
                  position: absolute;
                  top: 73px;
                  left: 10px;
                  overflow: hidden;

                  .name, .area, .ts {
                    width: 160%;
                    font-size: 12px;
                    line-height: 18px;
                    color: #c6ffff;
                    transform: scale(0.6);
                    margin-left: -42px;
                  }

                  .area {
                    margin-top: -5px;
                  }

                  .ts {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-top: -8px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
