<script setup lang="ts">
import { ref } from 'vue';
import { use } from 'echarts/core'
import * as echarts from 'echarts';

// 图表实例引用
const chartRef = ref<HTMLDivElement>();
import { LineChart } from 'echarts/charts'
// 注册需要的图表组件
use([LineChart]);
// 图表配置项
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    // 优化x轴样式
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      color: '#666'
    }
  },
  yAxis: {
    type: 'value',
    // 优化y轴样式
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#f0f0f0'
      }
    },
    axisLabel: {
      color: '#666'
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#eee',
    borderWidth: 1,
    textStyle: {
      color: '#333'
    },
    padding: 10,
    formatter: function(params: any) {
      return `${params[0].name}: ${params[0].value}`;
    }
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      // 线条样式优化
      lineStyle: {
        width: 3,
        color: '#5b8ff9'
      },
      // 数据点样式
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: '#5b8ff9',
        borderColor: '#fff',
        borderWidth: 2
      },
      // 高亮样式
      emphasis: {
        symbolSize: 8,
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.2)'
        }
      },
      // 填充区域
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(91, 143, 249, 0.3)' },
          { offset: 1, color: 'rgba(91, 143, 249, 0)' }
        ])
      }
    }
  ],
  // 网格配置
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '8%',
    containLabel: true
  }
};


</script>

<template>
  <a-card>
    <div class="container">
      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 统计卡片 -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-title">森林总面积</div>
            <div class="stat-value">12,584 km²</div>
            <div class="stat-trend">
              <span>↑ 2.3%</span>
              <span>较上月</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title">森林覆盖率</div>
            <div class="stat-value">65.8%</div>
            <div class="stat-trend">
              <span>↑ 1.2%</span>
              <span>较去年</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title">今日预警事件</div>
            <div class="stat-value">8</div>
            <div class="stat-trend trend-down">
              <span>↓ 3</span>
              <span>较昨日</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title">空气质量指数</div>
            <div class="stat-value">42</div>
            <div class="stat-trend">
              <span>优</span>
            </div>
          </div>
        </div>

        <!-- 图表和地图区域 -->
        <div class="charts-container">
          <div class="chart-box">
            <div class="chart-header">
              <div class="chart-title">森林资源分布</div>
              <div class="tabs">
                <div class="tab active">实时</div>
                <div class="tab">近一周</div>
                <div class="tab">近一月</div>
              </div>
            </div>
            <div class="chart-content">
              <div class="map-placeholder">
                <div style="text-align: center">
                  <div style="font-size: 48px">🗺️</div>
                  <div>林业资源分布地图</div>
                  <div style="font-size: 12px; margin-top: 8px">
                    实时监控中：1245个监测点正常运行
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-box">
            <div class="chart-header">
              <div class="chart-title">预警信息</div>
              <div class="tabs">
                <div class="tab active">全部</div>
                <div class="tab">火灾</div>
                <div class="tab">病虫害</div>
              </div>
            </div>
            <div class="chart-content">
              <div class="alert-list">
                <div class="alert-item">
                  <div class="alert-icon">⚠️</div>
                  <div class="alert-info">
                    <div class="alert-title">东部林区温度异常</div>
                    <div class="alert-desc">监测点A12区域温度达到38°C，超过阈值</div>
                  </div>
                  <div class="alert-time">2小时前</div>
                </div>
                <div class="alert-item">
                  <div class="alert-icon">⚠️</div>
                  <div class="alert-info">
                    <div class="alert-title">北部林区发现病虫害迹象</div>
                    <div class="alert-desc">松毛虫活动迹象增加，需关注</div>
                  </div>
                  <div class="alert-time">5小时前</div>
                </div>
                <div class="alert-item">
                  <div class="alert-icon">⚠️</div>
                  <div class="alert-info">
                    <div class="alert-title">西部林区湿度降低</div>
                    <div class="alert-desc">连续7天湿度低于30%，注意防火</div>
                  </div>
                  <div class="alert-time">昨天</div>
                </div>
                <div class="alert-item">
                  <div class="alert-icon">⚠️</div>
                  <div class="alert-info">
                    <div class="alert-title">南部林区游客超量</div>
                    <div class="alert-desc">周末游客数量超过承载量，建议分流</div>
                  </div>
                  <div class="alert-time">2天前</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </a-card>
</template>

<style scoped>
.container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 20px;
}



/* 主内容区样式 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-left: 4px solid #2a7d4a;
}

.stat-title {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #1a5632;
}

.stat-trend {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #52c41a;
  font-size: 14px;
}

.trend-down {
  color: #f5222d;
}

/* 图表和地图区域 */
.charts-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.chart-box {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.chart-content {
  height: 300px;
}

/* 预警信息 */
.alert-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #fffbf0;
  border-radius: 6px;
  border-left: 3px solid #faad14;
}

.alert-icon {
  color: #faad14;
  font-size: 20px;
}

.alert-info {
  flex: 1;
}

.alert-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.alert-desc {
  font-size: 13px;
  color: #666;
}

/* 底部区域 */
.bottom-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 地图占位样式 */
.map-placeholder {
  height: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #389e55;
  font-weight: 500;
}

/* 图表占位样式 */
.chart-placeholder {
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

/* 选项卡样式 */
.tabs {
  display: flex;
  gap: 8px;
  background: #f5f7fa;
  padding: 4px;
  border-radius: 6px;
}

.tab {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.tab.active {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}
.background{
  background-image: url("@/assets/img/forest.png");
}
</style>
