<template>
  <div class="home-main">
    <!-- 头部卡片 -->
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="card-text">
              <p>女生人数</p>
              <p>{{ this.card.girls }} 人</p>
            </div>
            <el-button icon="el-icon-female" circle style="background-color: #fe759c;"></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="card-text">
              <p>男生人数</p>
              <p>{{ this.card.boys }} 人</p>
            </div>
            <el-button icon="el-icon-male" circle style="background-color: #409EFF;"></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="card-text">
              <p>总人数</p>
              <p>{{ this.card.count }} 人</p>
            </div>
            <el-button icon="el-icon-tickets" circle style="background-color: #fdb67e;"></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="card-text">
              <p>空床数</p>
              <p>{{ this.card.bed }} 个</p>
            </div>
            <el-button icon="el-icon-document" circle style="background-color: #12c3a7;"></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 中间统计图 -->
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="never">
          <div ref="main" style="width: 600px;height:285px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <div ref="main2" style="width: 600px;height:285px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 底部图 -->
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- <EchartThree></EchartThree> -->
          <div ref="main3" style="height:245px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCardApi, getChartOneApi, getChartTwoApi, getChartThreeApi } from '@/api/home'
import * as echarts from 'echarts'
export default {
  name: 'homeView',
  data () {
    return {
      card: [],
      chartOne: [],
      // 绘制图表
      chart: {
        title: {
          text: '每月入住统计',
          subtext: '入住人数'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['入住人数', 'Evaporation']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '入住人数',
            type: 'bar',
            itemStyle: {
              color: '#409EFF'
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      },
      // 图2
      chart2: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '入住人数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine', itemStyle: { color: '#4a76fd' } },
              { value: 735, name: 'Direct', itemStyle: { color: '#11c6a5c' } },
              { value: 580, name: 'Email', itemStyle: { color: '#fdb67e' } },
              { value: 484, name: 'Union Ads', itemStyle: { color: '#7b66fd' } },
              { value: 300, name: 'Video Ads', itemStyle: { color: '#fe759c' } }
            ]
          }
        ]
      },
      // 绘制图表
      chart3: {
        title: {
          text: '每月缴费统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['统计']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '统计',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210],
            lineStyle: {
              color: '#7b66fd'
            },
            itemStyle: {
              color: '#7b66fd'
            }
          }
        ]
      }
    }
  },
  created () {
    this.getCard()
    this.getChartOne()
    this.getChartTwo()
    this.getChartThree()
  },
  methods: {
    async getCard () {
      const res = await getCardApi()
      this.card = res.data.data
    },
    async getChartOne () {
      const res = await getChartOneApi()
      this.chart.series[0].data = res.data.data.map(item => item.studentNum)

      const charts = echarts.init(this.$refs.main)
      charts.setOption(this.chart)
    },
    async getChartTwo () {
      const res = await getChartTwoApi()
      const modifyChart = this.modifyChartData(res.data.data)
      this.chart2.series[0].data = modifyChart

      const charts = echarts.init(this.$refs.main2)
      charts.setOption(this.chart2)
    },
    async getChartThree () {
      const res = await getChartThreeApi()
      this.chart3.series[0].data = res.data.data.map(item => item.money)

      const charts = echarts.init(this.$refs.main3)
      charts.setOption(this.chart3)
    },
    modifyChartData (data) {
      const colors = ['#fdb67e', '#7b66fd', '#12c3a7', '#4a76fd', '#fe759c']
      return data.map((item, index) => ({ name: item.name, value: item.value, itemStyle: { color: colors[index] } }))
    }
  }
}

</script>

<style lang="scss" scoped>
.home-main {
  padding: 20px 40px 0 !important;
}
.header {
  margin-top: 10px;
  margin-bottom: 20px;
}
.el-row {
  margin-bottom: 30px;
}
.el-col-6,.el-col-12,.el-col-24 {
  padding-right: 15px !important;
}

.card {
  display: flex;
  justify-content: space-around;
  .el-button {
    font-size: 30px;
    color: #ffffff;
  }
  .card-text {
    p:nth-child(2) {
      margin-top: 10px;
    }
  }
}
</style>
