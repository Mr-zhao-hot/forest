<template>
  <div id="map-container">
    <div v-if="loading" class="loading-mask">地图加载中...</div>
    <div v-if="offlineMode" class="offline-notice">当前处于离线模式，部分功能可能受限</div>
  </div>
</template>

<script setup lang="ts">
import { KeyStore } from '@/stores/KeyStore.ts'
const keys = KeyStore()
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, shallowRef, ref } from 'vue'

// 使用shallowRef替代ref，因为地图对象不需要深度响应式
const map = shallowRef<AMap.Map | null>(null)
const AMapInstance = shallowRef<any>(null)
const loading = ref(true)
const offlineMode = ref(false)

// 检查在线状态
const checkOnlineStatus = async () => {
  try {
    const response = await fetch('https://webapi.amap.com/maps?v=2.0&key=dummy', {
      method: 'HEAD',
      cache: 'no-cache'
    })
    return response.ok
  } catch (e) {
    return false
  }
}

// 初始化地图
const initMap = async () => {
  try {
    loading.value = true
    offlineMode.value = !(await checkOnlineStatus())

    // 加载高德地图API
    AMapInstance.value = await AMapLoader.load({
      key: `${keys.GDApi}`, // 建议使用环境变量
      version: '2.0',
      plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation', 'AMap.Offline'], // 添加离线插件
      offlineOpts: {
        // 离线配置
        enable: true,
        cacheSize: 200, // 缓存大小(MB)
        cachePath: 'amap-offline-cache' // 缓存路径
      }
    })

    // 创建地图实例
    map.value = new AMapInstance.value.Map('map-container', {
      showLabel: true,
      rotateEnable: true,
      pitchEnable: true,
      zoom: 17,
      pitch: 50,
      rotation: -15,
      viewMode: '3D', // 开启3D视图
      zooms: [2, 20],
      center: [116.333926, 39.997245],
      mapStyle: 'amap://styles/satellite' // 设置为卫星地图
    })

    // 添加控件
    map.value.addControl(new AMapInstance.value.ToolBar())
    map.value.addControl(new AMapInstance.value.Scale())

    // 初始化离线管理器
    if (offlineMode.value) {
      initOfflineManager()
    }

    // 添加默认标记点
    addDefaultMarker()

  } catch (error) {
    console.error('高德地图加载失败:', error)
    // 尝试从缓存加载
    setTimeout(() => {
      if (map.value) {
        map.value.offlineLoadFromCache()
      }
    }, 1000)
  } finally {
    loading.value = false
  }
}

// 初始化离线管理器
const initOfflineManager = () => {
  if (!AMapInstance.value || !map.value) return

  // 创建离线地图管理器
  const offlineManager = new AMapInstance.value.OfflineManager({
    map: map.value,
    autoDownload: true, // 自动下载离线地图
    city: '北京' // 默认城市
  })

  // 监听离线地图下载进度
  offlineManager.on('downloadProgress', (event: any) => {
    console.log(`下载进度: ${event.progress}%`)
  })

  // 离线地图下载完成
  offlineManager.on('downloadComplete', (event: any) => {
    console.log('离线地图下载完成:', event.city)
  })
}

// 添加默认标记点
const addDefaultMarker = () => {
  if (!map.value || !AMapInstance.value) return

  const marker = new AMapInstance.value.Marker({
    position: map.value.getCenter(),
    title: '中心点'
  })

  map.value.add(marker)

  // 添加点击事件
  marker.on('click', () => {
    const infoWindow = new AMapInstance.value.InfoWindow({
      content: '<div style="padding:5px;">这是地图中心点</div>'
    })
    infoWindow.open(map.value, marker.getPosition())
  })
}

// 组件挂载时初始化地图
onMounted(() => {
  window.scrollTo(0, document.body.scrollHeight)
  initMap()
  keys.GDApiSelect();
})

// 组件卸载时销毁地图
onUnmounted(() => {
  if (map.value) {
    map.value.destroy()
    map.value = null
  }
  AMapInstance.value = null
})
</script>

<style>
#map-container {
  border: 1px red solid;
  height: 100vh !important;
  position: relative;
}

.loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.offline-notice {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 165, 0, 0.8);
  padding: 5px 15px;
  border-radius: 4px;
  z-index: 999;
  font-size: 14px;
}
</style>
