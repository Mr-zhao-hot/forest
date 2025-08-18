<script setup lang="ts">
// 导入部分保持不变
import { onMounted, ref } from 'vue'
import yanwuImg from '@/assets/img/yanwu.png'
import baojing from '@/assets/img/baojing.png'
import fire from '@/assets/img/fire.png'
import status from '@/assets/img/status.png'
import wendu from '@/assets/img/wendu.png'
import shebei from '@/assets/img/shebei.png'
import header from '@/assets/img/header.png'
import chineseMap from '@/assets/img/chineseMap.png'

import { Weather } from '@/stores/Weather.ts'
const wd = Weather()

import { KeyStore } from '@/stores/KeyStore.ts'
const Wd = KeyStore()

import { ScreenStore } from '@/stores/ScreanStore.ts'
const Sc = ScreenStore()

const isLoaded = ref(false)
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, GaugeChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

const scale = 0.7 // 缩放系数


// 温度检测
const option1 = ref({
  series: [
    {
      type: 'gauge',
      center: ['50%', '75%'],
      radius: '98%', // 调整半径
      startAngle: 200,
      endAngle: -10,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: '#FFAB91',
      },
      progress: {
        show: true,
        width: 30 * scale,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 30 * scale,
        },
      },
      axisTick: {
        distance: -45 * scale,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999',
        },
      },
      splitLine: {
        distance: -52 * scale,
        length: 14 * scale,
        lineStyle: {
          width: 3,
          color: '#999',
        },
      },
      axisLabel: {
        distance: -20 * scale,
        color: '#999',
        fontSize: 16 * scale,
      },
      anchor: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 30 * scale,
        borderRadius: 7,
        offsetCenter: [0, '-15%'],
        fontSize: 40 * scale,
        fontWeight: 'bolder',
        formatter: '{value} °C',
        color: 'inherit',
      },
      data: [
        {
          value: `${wd.cityTable.temperature || `待加载`}`,
        },
      ],
    },
    {
      type: 'gauge',
      center: ['50%', '75%'],
      radius: '70%',
      startAngle: 200,
      endAngle: -30,
      min: 0,
      max: 60,
      itemStyle: {
        color: '#FD7347',
      },
      progress: {
        show: true,
        width: 8 * scale,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      detail: {
        show: false,
      },
      data: [
        {
          value: `${wd.cityTable.temperature }`,
        },
      ],
    },
  ],
})
// 浓度仪表盘
const option = ref({
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '82%'],
      radius: '140%',
      min: 0,
      max: 100,
      axisLine: {
        lineStyle: {
          width: 10,
          color: [
            [0.25, '#7CFFB2'], // 绿
            [0.5, '#58D9F9'], // 蓝
            [0.75, '#FDDD60'], // 黄
            [1, '#FF6E76'], // 红
          ],
        },
      },
      pointer: {
        length: '30%',
        width: 20,
        itemStyle: {
          color: 'auto',
        },
      },
      detail: {
        fontSize: 30,
        formatter: '{value}%',
        color: 'inherit',
      },
      data: [
        {
          value: `${Sc.ScreenTable.smokeAvg}`, // 70%
        },
      ],
    },
  ],
})
// 报警类型分布
const chartOption = ref({
  grid: {
    top: '20%', // 上边距（可以是像素值如 80 或百分比）
    right: '10%', // 右边距
    bottom: '15%', // 下边距
    left: '18%', // 左边距（如果 legend 在左侧，需要留更多空间）
    containLabel: true, // 确保坐标轴标签在 grid 区域内
  },
  title: {
    left: 'center',
    textStyle: {
      color: '#1e8c45',
    },
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}<br/>{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}<br/>{a3}: {c3}<br/>{a4}: {c4}',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['网络报警', '硬件故障', '软件异常', '安全事件', '性能问题'],
  },
  xAxis: {
    type: 'category',
    data: ['第一年', '第二年', '第三年', '第四年', '第五年', '第六年', '第七年'],
    axisLine: {
      lineStyle: {
        color: '#1e8c45',
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#1e8c45',
      },
    },
  },
  series: [
    {
      name: '网络报警',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#91cc75',
      },
      itemStyle: {
        color: '#91cc75',
      },
    },
    {
      name: '硬件故障',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310],
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#3ba272',
      },
      itemStyle: {
        color: '#3ba272',
      },
    },
    {
      name: '软件异常',
      type: 'line',
      data: [150, 232, 201, 154, 190, 330, 410],
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#1e8c45',
      },
      itemStyle: {
        color: '#1e8c45',
      },
    },
    {
      name: '安全事件',
      type: 'line',
      data: [320, 332, 301, 334, 390, 330, 320],
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#4daf4a',
      },
      itemStyle: {
        color: '#4daf4a',
      },
    },
    {
      name: '性能问题',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#2ca02c',
      },
      itemStyle: {
        color: '#2ca02c',
      },
    },
  ],
})
// 火灾报警统计
const optione = ref({
  title: {
    left: 'center',
    textStyle: {
      color: '#2e8b57',
      fontSize: 18,
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: ['2020', '2025', '2030', '2035', '2040', '2045', '2050'],
    axisLine: {
      lineStyle: {
        color: '#2e8b57',
      },
    },
    axisLabel: {
      color: '#2e8b57',
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#2e8b57',
      },
    },
    axisLabel: {
      color: '#2e8b57',
    },
    splitLine: {
      lineStyle: {
        color: '#e5f5e0',
      },
    },
  },
  series: [
    {
      name: '报警数量',
      type: 'bar',
      barWidth: '60%',
      data: [0, 1, 0, 0, 0, 0, 0],
      itemStyle: {
        color: '#31a354', // 基础绿色
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: '#006d2c', // 深绿色高亮
        },
      },
      label: {
        show: true,
        position: 'top',
        color: '#2e8b57',
      },
    },
  ],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
})

// 注册必要的ECharts组件
use([
  CanvasRenderer,
  GaugeChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  BarChart,
])

setInterval(() => {
  wd.weather(210111, `${Wd.WDapi}`)
}, 36000)

onMounted(() => {
  Wd.WDapiSelect()
  console.log(Wd.WDapi) // 这里可以正确获取
  Sc.getScreenNum()
  // 页面加载后触发动画
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
  console.log(wd.cityTable)
})
</script>

<template>
  <div class="data-screen" :class="{ 'page-loaded': isLoaded }">
    <!-- 顶部标题栏 -->
    <div class="top-bar">
      <div class="top-box" :style="{ backgroundImage: `url(${header})` }" />
      <div class="top-box-bq top-box" style="animation-delay: 0.2s">
        <img src="@/assets/img/yemian.png" alt="标签" />
      </div>
      <div class="top-box-time top-box" style="animation-delay: 0.4s">
        <div
          class="top-box-time top-box"
          style="
            animation-delay: 0.4s;
            background: #f5fffa;
            padding: 12px 16px;
            border-radius: 4px;
            font-family: 'Helvetica Neue', Arial, sans-serif;
          "
        >
          <div style="display: flex; gap: 20px; color: #228b22">
            <span
              >日期: <strong>{{ wd.cityTable.reporttime }}</strong></span
            >
            <span
              >天气: <strong>{{ wd.cityTable.weather }}</strong></span
            >
            <span
              >温度: <strong>{{ wd.cityTable.temperature }} ℃</strong></span
            >
            <span
              >湿度: <strong>{{ wd.cityTable.humidity }}%</strong></span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 左侧三个盒子 -->
      <div class="left-section">
        <div class="chart-box chart-box-animate" :style="{ backgroundImage: `url(${wendu})` }">
          <div class="inner_box inner-animate">
            <!-- 仪表板ECharts图 (70%) -->
            <div style="flex: 7; min-width: 0">
              <v-chart class="chart" :option="option1" autoresize />
            </div>

            <!-- 文字显示 (30%) -->
            <div
              style="
                flex: 3;
                padding-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <div class="stat-item">
                平均温度<span class="stat-value">{{wd.cityTable.temperature || '待加载'}}</span>%
              </div>
            </div>
          </div>
        </div>
        <div
          class="chart-box chart-box-animate"
          :style="{ backgroundImage: `url(${baojing})` }"
          style="animation-delay: 0.2s"
        >
          <div class="inner_box inner-animate" style="animation-delay: 0.4s">
            <v-chart :option="chartOption" autoresize />
          </div>
        </div>
        <div
          class="chart-box chart-box-animate"
          :style="{ backgroundImage: `url(${shebei})` }"
          style="animation-delay: 0.4s"
        >
          <div class="inner_box inner-animate" style="animation-delay: 0.6s">
            <a-table
              :columns="Sc.columns"
              :data-source="Sc.data"
              :pagination="false"
              :scrollToFirstRowOnChange="true"
              bordered
              size="large"
              :scroll="{ y: 300 }"
              style="width: 100%; font-size: 20px"
            >
              <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                  <span>
                    <smile-outlined />
                    Name
                  </span>
                </template>
              </template>

              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <a>
                    {{ record.name }}
                  </a>
                </template>
                <template v-else-if="column.key === 'tags'">
                  <span>
                    <a-tag
                      v-for="tag in record.tags"
                      :key="tag"
                      :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                    >
                      {{ tag.toUpperCase() }}
                    </a-tag>
                  </span>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>

      <!-- 中间大盒子 -->
      <div class="center-section">
        <div class="main-chart main-chart-animate">
          <img :src="chineseMap" alt="中国地图" class="map-animate" />
        </div>
      </div>

      <!-- 右侧三个盒子 -->
      <div class="right-section">
        <div class="chart-box chart-box-animate" :style="{ backgroundImage: `url(${yanwuImg})` }">
          <div class="inner_box inner-animate" >
            <!-- 仪表板ECharts图 (70%) -->
            <div style="flex: 7; min-width: 0">
              <v-chart :option="option" autoresize style="width: 100%; height: 100%" />
            </div>

            <!-- 文字显示 (30%) -->
            <div class="stats-container">
              <div class="stat-item">
                最高浓度<span class="stat-value">{{Sc.ScreenTable.smokeMax}}</span>%
              </div>
              <div class="stat-item">
                平均浓度<span class="stat-value">{{Sc.ScreenTable.smokeAvg}}</span>%
              </div>
              <div class="stat-item">
                最低浓度<span class="stat-value">{{Sc.ScreenTable.smokeMin}}</span>%
              </div>
            </div>
          </div>
        </div>
        <div
          class="chart-box chart-box-animate"
          :style="{ backgroundImage: `url(${fire})` }"
          style="animation-delay: 0.2s"
        >
          <div class="inner_box inner-animate" style="animation-delay: 0.4s">
            <v-chart :option="optione" autoresize />
          </div>
        </div>
        <div
          class="chart-box chart-box-animate"
          :style="{ backgroundImage: `url(${status})` }"
          style="animation-delay: 0.4s"
        >
          <div
            class="inner_box inner-animate"
            style="
              animation-delay: 0.6s;
              display: flex;
              flex-direction: column;
              margin-left: 40px;
              gap: 15px;
            "
          >
            <!-- 成功修复卡片 -->
            <div class="status-card success-card">
              <div class="card-icon">
                <img src="@/assets/img/success.png" class="card-img" />
              </div>
              <div class="card-content">
                <h3>完成修复 <span class="highlight-number">{{Sc.ScreenTable.taskSuccessNum || `暂无数据`}}</span> 个</h3>
<!--                <p>所有问题已成功解决</p>-->
              </div>
            </div>

            <!-- 待修复卡片 -->
            <div class="status-card warning-card">
              <div class="card-icon">
                <img src="@/assets/img/fix.png" class="card-img" />
              </div>
              <div class="card-content">
                <h3>待修复 <span class="highlight-number">{{Sc.ScreenTable.taskFailNum || `暂无数据`}}</span> 个</h3>
                <p>有待解决的问题</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-screen {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/img/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

  &.page-loaded {
    opacity: 1;
    transform: translateY(0);
  }

  .top-bar {
    height: vh(90);
    width: 100%;
    display: flex;
    flex-direction: row;

    .top-box {
      flex: 1;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0;
      animation: fadeInDown 0.6s ease forwards;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  .main-content {
    height: calc(100vh - vh(100));
    display: flex;

    .left-section,
    .right-section {
      width: vw(716);
      display: flex;
      flex-direction: column;
      gap: vh(5);

      .chart-box {
        flex: 1;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        opacity: 0;
        transform: scale(0.95);
        animation: fadeInScale 0.6s ease forwards;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }

        .inner_box {
          position: relative;
          bottom: vh(-90);
          left: vw(20);
          right: 0;
          height: vh(220);
          width: vh(600);
          //transform: translateX(-20px);
          animation: fadeInLeft 0.5s ease forwards;
          display: flex;
          box-sizing: border-box;
        }

        &:nth-child(1) {
          animation-delay: 0.1s;

          .inner_box {
            animation-delay: 0.3s;
          }
        }

        &:nth-child(2) {
          animation-delay: 0.3s;

          .inner_box {
            animation-delay: 0.5s;
          }
        }

        &:nth-child(3) {
          animation-delay: 0.5s;

          .inner_box {
            animation-delay: 0.7s;
          }
        }
      }
    }

    .main-chart {
      width: vw(500);
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      opacity: 0;
      animation: fadeIn 1s ease forwards 0.3s;
      position: relative; /* 添加这个以便作为定位上下文 */

      img {
        z-index: 40;
        position: fixed;
        left: 50%; /* 将图片左边缘定位到视口中央 */
        top: 50%; /* 将图片上边缘定位到视口中央 */
        transform: translate(-50%, -47%); /* 通过负向平移使图片真正居中 */
        width: auto; /* 或设置具体宽度，避免图片变形 */
        max-width: vw(10000); /* 确保图片不会超出视口 */
        max-height: vh(2000); /* 确保图片不会超出视口高度 */
        //animation: breath 5s ease-in-out infinite;

        @keyframes breath {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
      }
    }
  }
}

/* 关键帧动画定义 */
@keyframes fadeInDown {
  to {
    opacity: 1;
    //transform: translateY(0);
  }
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes mapZoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 打印样式调整 */
@media print {
  .data-screen {
    position: static;
    height: auto;

    .top-bar,
    .main-content {
      height: auto;
    }

    .chart-box {
      page-break-inside: avoid;
    }
  }
}

.top-box-bq {
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    width: vw(500);
  }
}

.top-box-time {
  //border: 1px black solid;
  align-items: center;
  display: flex;
  justify-content: center;
}

:deep(.ant-table),
:deep(.ant-table-container),
:deep(.ant-table-content),
:deep(.ant-table-thead > tr > th),
:deep(.ant-table-tbody > tr > td) {
  background: transparent !important;
}

.status-card {
  width: 100%;
  height: 80px; /* Reduced height */
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 12px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.success-card {
  background: rgba(240, 249, 235, 0.7);
  border: 1px solid rgba(67, 160, 71, 0.2);
}

.warning-card {
  background: rgba(255, 248, 225, 0.7);
  border: 1px solid rgba(239, 108, 0, 0.2);
}

.card-icon {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img {
  width: 50px; /* Adjusted size for reduced height */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.success-card .card-img {
  filter: drop-shadow(0 2px 4px rgba(67, 160, 71, 0.3));
}

.warning-card .card-img {
  filter: drop-shadow(0 2px 4px rgba(239, 108, 0, 0.3));
}

.card-content {
  flex: 4;
  padding-left: 15px;
}

.card-content h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.success-card h3 {
  color: #43a047;
}

.warning-card h3 {
  color: #ef6c00;
}

.highlight-number {
  font-size: 1.4rem;
  font-weight: 700;
}

.card-content p {
  margin: 5px 0 0;
  font-size: 0.9rem;
}

.success-card p {
  color: #689f38;
}

.warning-card p {
  color: #ff8f00;
}
.stats-container {
  flex: 5;
  padding-left: 10px;
  display: flex;
  padding-top: 3px;
  flex-direction: column;
  justify-content: center;
}

.stat-item {
    //border: 1px red solid;
  padding-top: 10px;
  font-size: vh(20);
  font-weight: 600;
  color: #52c41a;
  text-shadow: 0 2px 4px rgba(0,100,0,0.1);
  letter-spacing: 1px;
}

.stat-value {
  color: #faad14;
  margin: 0 2px;
}
</style>
