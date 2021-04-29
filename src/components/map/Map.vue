<template>
  <div style="transform: none; width: 100%; height: 100%; position: absolute;">
    <div
      style="position: absolute; z-index: 100; width: 100%; height: 125%; left: -0%; transform: rotateX(45deg) scale(1, 1); top: -25%;">
      <div style="width: 100%; height: 100%;" ref="canvas"/>
    </div>
    <img style="position: absolute; bottom: 0.5%; width: 100%; height: 29%" src="./bg.png" alt="">
    <div class="map-reset-box" @click="reset" v-show="showReset">
      <span>重置地图</span>
      <img class="map-reset" src="./reset1.png" alt="">
    </div>
    <!--    <img style="position: absolute; bottom: 5%; left: -2%;" src="./tl.png" alt="">-->
    <!--    <img style="position: absolute; bottom: 5%; left: -2%;" src="./tl.png" alt="">-->
    <div class="mapTipBox">
      <div class="title">民主法制示范居（村）</div>
      <div class="lineBox">
        <div class="line">
          <div class="pointReact"></div>
          已获评
        </div>
        <div class="line">
          <div class="point"></div>
          重点培育
        </div>
      </div>
    </div>
    <div :style="[check]" class="map-model"
         style="color:#fff;width: 950px; z-index: 500; position: fixed; transform: translate(-50%, -50%)">
      <i-mask @close="check.height=0" ref="mapMask" @choose="chooseItem"/>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import shJson from './sh.json'
import shAllJson from './shAll.json'
import { JUDICIAL_BACKEND } from '@/utils/baseUrl'
import Mask from './Mask.vue'

const getShAllJson = () => {
  return JSON.parse(JSON.stringify(shAllJson))
}

const setStep = (coordinate, step) => {
  coordinate[1] = coordinate[1] - step
}

const step = [0.01, 0.02, 0.04, 0.05, 0.06]
const styleLine = [
  [121.943689, 30.777096],
  [121.969703, 30.789202],
  [121.274649, 30.6774],
  [121.117219, 30.786073],
  [120.990918, 30.822708],
  [120.992907, 30.893915, 0.045],
  [120.901365, 31.017494],
  [120.856804, 31.102829],
  [121.995716, 31.493104],
  [121.118498, 31.759084],
  [121.510134, 31.482581],
  [121.795866, 31.329976],
  [122.122684, 31.307205],
  [121.941826, 31.207678],
  [122.010593, 31.188004],
  [121.927519, 31.224017],
  [121.880873, 31.23633],
  [121.10832, 31.350649]
]

step.forEach((stepOne, index) => {
  const all = getShAllJson()
  if (index === step.length - 1) {
    all.properties.name = 'bgLast'
  }
  setStep(all.properties.center, stepOne)
  setStep(all.properties.centroid, stepOne)
  all.geometry.coordinates.forEach(o1 => o1.forEach(o2 => {
    o2.forEach(o3 => setStep(o3, stepOne))
  }))
  shJson.features.unshift(all)
})

// const shaYList = [31.33, 31.32, 31.31, 31.29, 31.28]
// const shaYColorList = ['#54bce1', '#4489a8', '#4489a8', '#4489a8', '#1e466e']
const labelPosition = {
  松江区: ['top', [0, 30]],
  闵行区: ['right', [10, 0]],
  奉贤区: ['right', [10, 0]],
  金山区: ['top', [0, -30]],
  青浦区: ['left', [-10, 0]],
  静安区: ['bottom', [0, 15]],
  浦东新区: ['right', [30, 0]],
  嘉定区: ['left', [-10, 0]],
  崇明县: ['top', [0, -30]],
  普陀区: ['top', [0, -20]],
  杨浦区: ['right', [0, -10]],
  黄浦区: ['right', [20, 10]],
  虹口区: ['top', [0, -20]]
}
// const shaYBgList = ['#1e466e', '#1e466e', '#1e466e', '#1e466e', '#1e466e']

export default {
  name:'map-box',
  components: { iMask: Mask },
  async created () {
    // this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites/sites`)
    // await this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites`, 'get', {
    //   pageNum: 1,
    //   pageSize: 1000,
    //   type: 1
    // })
    // await this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites/ratedCount`, 'get', { code: 'xhcode' })
  },
  // props: ['coordinateMap', 'centerCoordinate'],
  data () {
    return {
      // showReset: false,
      showReset: true,
      check: {
        left: 0,
        top: 0,
        height: 0
      },
      chat: null,
      coordinateMap: [
        {
          name: '松江区',
          type: 'q',
          lat: 121.233686,
          lng: 31.039018,
          villageList: [
            {
              name: '松江南站',
              type: 1,
              lat: 121.236952,
              lng: 30.989222
            },
            {
              name: '浦江',
              type: 2,
              lat: 121.169543,
              lng: 30.967177
            },
            {
              name: '1',
              type: 2,
              lat: 121.817785,
              lng: 31.15694
            },
            {
              name: '2',
              type: 1,
              lat: 121.946279,
              lng: 30.904437
            },
            {
              name: '1',
              type: 2,
              lat: 121.960077,
              lng: 31.533685
            },
            {
              name: '2',
              type: 1,
              lat: 121.615702,
              lng: 31.619823
            }
          ]
        },
        {
          name: '闵行区',
          type: 'q',
          lat: 121.377141,
          lng: 31.113699,
          villageList: []
        },
        {
          name: '奉贤区',
          type: 'q',
          lat: 121.471094,
          lng: 30.917297,
          villageList: []
        },
        {
          name: '金山区',
          type: 'q',
          lat: 121.339861,
          lng: 30.722484,
          villageList: []
        },
        {
          name: '青浦区',
          type: 'q',
          lat: 121.122876,
          lng: 31.149506,
          villageList: []
        },
        {
          name: '静安区',
          type: 'q',
          lat: 121.470586,
          lng: 31.250464,
          villageList: []
        },
        {
          name: '浦东新区',
          type: 'q',
          lat: 121.524046,
          lng: 31.179183,
          villageList: []
        },
        {
          name: '嘉定区',
          type: 'q',
          lat: 121.27335,
          lng: 31.395003,
          villageList: []
        },
        {
          name: '崇明县',
          type: 'q',
          lat: 121.407874,
          lng: 31.628162,
          villageList: []
        },
        {
          name: '普陀区',
          type: 'q',
          lat: 121.411676,
          lng: 31.278498,
          villageList: []
        },
        {
          name: '杨浦区',
          type: 'q',
          lat: 121.535047,
          lng: 31.264672,
          villageList: []
        },
        {
          name: '黄浦区',
          type: 'q',
          lat: 121.47733,
          lng: 31.223898,
          villageList: []
        },
        {
          name: '虹口区',
          type: 'q',
          lat: 121.511735,
          lng: 31.270156,
          villageList: []
        }
      ],
      centerCoordinate: {
        name: '上海市司法局',
        lat: 121.451461,
        lng: 31.207472
      }
    }
  },
  async mounted () {
    this.chat = echarts.init(this.$refs.canvas, null, { renderer: 'svg' })
    echarts.registerMap('sh', shJson)
    echarts.registerMap('shAll', shAllJson)
    const { data } = await this.request(`${JUDICIAL_BACKEND}/judicial/demonstrationSites/sites`)
    // console.log(shAllJson)
    // this.parseMapData(shAllJson.geometry.coordinates)
    this.parseMapData(data)
    this.setOption()
    this.chat.on('click', ({ event, componentType, value, name }) => {
      // (value && value[2] && value[2].type === 'q') ||
      if ((componentType === 'geo' && name !== 'bg' && name !== 'bgLast')) {
        const spaceWidth = (window.screen.availWidth - (event.event.pageX - 200))
        const spaceHeight = (window.screen.availHeight - (event.event.pageY + 20))
        const left = spaceWidth > 960 ? event.event.pageX - 200 : window.screen.availWidth - 960
        const top = spaceHeight > 760 ? event.event.pageY + 20 : window.screen.availHeight - 760
        // console.log(window.screen.availHeight, event.event.pageY, left, top)
        this.check = {
          left: `50%`,
          top: `50%`,
          // left: `${left}px`,
          // top: `${top}px`,
          height: '650px'
        }
        this.$refs.mapMask.init()
        // for (const one of shJson.features) {
        //   if (one.properties.name === name) {
        //     const option = this.chat.getOption()
        //     option.geo[0].center = one.properties.center
        //     option.geo[0].zoom = 1.8
        //     this.chat.setOption(option)
        //     this.showReset = true
        //   }
        // }
      }
    })
    let isDown = false
    this.chat.on('mousedown', (event) => {
      isDown = true
    })
    this.chat.on('mouseup', (event) => {
      isDown = false
    })
    document.addEventListener('mousewheel', () => {
      this.showReset = true
    }, true)
    this.chat.on('mousemove', (event) => {
      if (isDown) {
        this.showReset = true
      }
      if (event.name === 'bg' || event.name === 'bgLast') {
        // // console.log(1323212)
        this.chat.dispatchAction({
          type: 'geoUnSelect',
          name: 'bg'
        })
      }
    })
  },
  methods: {
    getOption () {
      const option = {
        series: [],
        animation: false
      }
      this.setGeo(option)
      this.setCoordinate(option)
      this.setVillage(option)
      this.setStyle(option)
      return option
    },
    setVillage (option) {
      const villageList = []
      this.coordinateMap.forEach(o => {
        villageList.push(...o.villageList)
      })
      option.series.push({
        silent: true,
        large: true,
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'diamond',
        symbolRotate: 180,
        symbolSize: 12,
        cursor: 'pointer',
        itemStyle: {
          color: '#ebe70d',
          opacity: 0.8,
          shadowColor: '#fff',
          shadowBlur: 7
        },
        data: villageList.filter(o => o.type === 1).map(o => ({
          name: o.name,
          value: [o.lat, o.lng, o]
        }))
      })
      option.series.push({
        silent: true,
        large: true,
        type: 'scatter',
        cursor: 'pointer',
        coordinateSystem: 'geo',
        symbol: 'circle',
        symbolRotate: 180,
        symbolSize: 8,
        itemStyle: {
          color: '#00ffd2',
          opacity: 0.8,
          shadowColor: '#fff',
          shadowBlur: 7
        },
        data: villageList.filter(o => o.type === 0).map(o => ({
          name: o.name,
          value: [o.lat, o.lng, o]
        }))
      })
    },
    setGeo (option) {
      const geo = []
      geo.push({
        show: true,
        map: 'sh',
        zoom: 1.25,
        center: [121.5019765, 31.24191873942998],
        scaleLimit: {
          min: 1,
          max: 5
        },
        // silent: true,
        roam: true,
        itemStyle: {
          // color: '#01418f',
          color: '#1437F7',
          opacity: 1,
          // borderColor: '#57d4f9',
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            color: '#54bce1'
          }
        },
        regions: [{
          name: 'bg',
          itemStyle: {
            color: 'rgba(7,32,79,0.1)',
            borderColor: 'rgba(13,46,117,0.9)',
            // shadowColor: 'rgba(255,255,255,0.4)',
            // shadowBlur: 1,
            borderWidth: 1
          },
          emphasis: {
            // itemStyle: {
            //   opacity: 0
            // },
            label: {
              show: false
            }
          }
        }, {
          name: 'bgLast',
          itemStyle: {
            color: 'rgba(7,32,79,0.58)',
            borderColor: '#3470a2',
            borderWidth: 1
          },
          emphasis: {
            // itemStyle: {
            //   opacity: 0
            // },
            label: {
              show: false
            }
          }
        }]
      })
      option.geo = geo
    },
    setCoordinate (option) {
      option.series.push({
        type: 'lines',
        zlevel: 2,
        silent: true,
        color: '#09c9ce',
        effect: {
          show: true,
          period: 2,
          constantSpeed: 60,
          trailLength: 0,
          symbol: 'path://M263.577601 776.630449a242.559588 242.559588 0 0 1 138.417007-218.124973L483.818959 23.36268a27.485506 27.485506 0 0 1 54.283873 0l81.824351 535.142796a242.559588 242.559588 0 0 1 138.417006 218.124973 247.369551 247.369551 0 0 1-494.739102 0z',
          symbolSize: [5, 23],
          color: '#eefc74'
        },
        lineStyle: {
          width: 2,
          type: 'dotted',
          opacity: 1,
          curveness: 0.15
        },
        data: this.coordinateMap.map(o => ([{
          coord: [o.lat, o.lng]
        }, {
          coord: [this.centerCoordinate.lat, this.centerCoordinate.lng]
        }]))
      })
      console.log(option.series[0])
      this.coordinateMap.forEach(one => {
        option.series.push({
          silent: true,
          type: 'effectScatter',
          coordinateSystem: 'geo',
          label: {
            show: false
          },
          data: [{
            name: one.name,
            value: [one.lat, one.lng, 1]
          }],
          symbol: 'circle',
          symbolSize: 15,
          color: '#0194b4'
        })
      })
      this.coordinateMap.forEach(one => {
        option.series.push({
          silent: true,
          type: 'effectScatter',
          coordinateSystem: 'geo',
          z: 20,
          label: {
            show: true,
            position: labelPosition[one.name][0],
            offset: labelPosition[one.name][1],
            color: '#fff',
            formatter: function (params) {
              return params.data.name
            },
            fontSize: 14,
            emphasis: {
              show: true
            }
          },
          data: [{
            name: one.name,
            value: [one.lat, one.lng, 1]
          }],
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 15,
            color: '#01faee'
          },
          symbol: 'circle',
          symbolSize: 3,
          color: '#0194b4'
        })
      })
      option.series.push({
        silent: true,
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'arrow',
        symbolRotate: 180,
        symbolSize: [18, 30],
        color: '#00c4ce',
        itemStyle: {
          opacity: 1
        },
        data: this.coordinateMap.map(o => ({
          name: o.name,
          value: [o.lat, o.lng, o]
        }))
      })
      option.series.push({
        silent: true,
        type: 'effectScatter',
        coordinateSystem: 'geo',
        label: {
          show: true,
          position: 'top',
          offset: [0, -30],
          color: '#edfb81',
          formatter: function (params) {
            return params.data.name
          },
          fontSize: 18,
          fontWeight: 5,
          emphasis: {
            show: true
          }
        },
        symbol: 'circle',
        symbolSize: 4,
        color: '#edfb81',
        rippleEffect: {
          period: 4,
          brushType: 'fill',
          scale: 12,
          color: '#edfb81'
        },
        data: [{
          name: this.centerCoordinate.name,
          value: [this.centerCoordinate.lat, this.centerCoordinate.lng, 1]
        }]
      })
      option.series.push({
        type: 'scatter',
        zlevel: 2,
        z: 5,
        silent: true,
        coordinateSystem: 'geo',
        symbol: 'arrow',
        itemStyle: {
          opacity: 1
        },
        symbolRotate: 180,
        symbolSize: [25, 50],
        color: '#c9ce00',
        data: [{
          name: this.centerCoordinate.name,
          value: [this.centerCoordinate.lat, this.centerCoordinate.lng, 1]
        }]
      })
    },
    setStyle (option) {
      option.series.push({
        type: 'lines',
        silent: true,
        color: '#326e9c',
        lineStyle: {
          width: 1,
          opacity: 1
        },
        data: styleLine.map(o => ([{ coord: [o[0], o[1] - 0.00005] }, { coord: [o[0], o[1] - (o[2] || 0.06)] }]))
      })
    },
    setOption () {
      this.chat.setOption(this.getOption(), null, { renderer: 'svg' })
    },
    reset () {
      const option = this.chat.getOption()
      // console.log(option)
      option.geo[0].center = [121.5519765, 31.24191873942998]
      option.geo[0].zoom = 1.25
      this.chat.setOption(option)
      this.showReset = false
    },
    parseMapData (list = []) {
      let type3 = {}
      const type2List = []
      const type01List = []
      list.forEach(one => {
        if (one.type === 3) {
          type3 = one
        } else if (one.type === 2) {
          type2List.push({
            ...one,
            villageList: []
          })
        } else {
          type01List.push(one)
        }
      })
      this.centerCoordinate = type3
      type2List[0].villageList = type01List
      this.coordinateMap = type2List
    },
    chooseItem (id) {
      this.$emit('choose', id)
    }
  },
  watch: {
    coordinateMap () {
      this.setOption()
    },
    centerCoordinate () {
      this.setOption()
    }
  }
}
</script>
<style lang="less">
  .map-model {
    /*transition: height 0.5s;*/
  }

  .map-close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 10px;
    height: 10px;
    transition: width 0.5s, height 0.5s;
    cursor: pointer;
  }

  .map-close:hover {
    width: 15px;
    height: 15px;
  }

  .map-reset-box {
    z-index: 101;
    position: absolute;
    top: 0.5%;
    right: 0.5%;
    cursor: pointer;
    transition: all 0.5s linear;

    > span {
      position: absolute;
      left: -50px;
      top: 0px;
      color: white;
      font-size: 12px;
      display: none;
    }
  }

  .map-reset-box:hover {
    > span {
      font-size: 12px;
      display: block;
    }
  }

  .map-reset {
    width: 15px;
    width: 15px;
  }

  .map-reset:hover {
    width: 20px;
    height: 20px;
  }

  path, text {
    pointer-events: none !important;

  }

  .mapTipBox {
    position: absolute;
    bottom: 8%;
    left: -2%;
    color: white;
  }

  .mapTipBox > .title {
    font-size: 12px;
  }

  .lineBox {
    display: flex;
  }

  .line {
    width: auto;
    font-size: 12px;
    margin-right: 14px;
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .pointReact {
    width: 10px;
    height: 10px;
    background: #8c9a13;
    transform: rotate(45deg);
    margin-right: 6px;
  }

  .point {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #51d29c;
    margin-right: 6px;
  }
</style>
