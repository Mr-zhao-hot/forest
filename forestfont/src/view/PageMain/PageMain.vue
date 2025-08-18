<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    >
      <div class="logo">智慧林业系统</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>首页</span>
        </a-menu-item>

        <router-link to="/tree" style="color: rgba(255, 255, 255, 0.65)">
          <a-menu-item key="3"> 树种管理 </a-menu-item>
        </router-link>

        <a-menu-item key="4">区域管理</a-menu-item>

        <router-link to="/map" style="color: rgba(255, 255, 255, 0.65)">
          <a-menu-item key="6">实时定位</a-menu-item>
        </router-link>

        <a-menu-item key="8">定位记录</a-menu-item>
        <router-link to="/equipment" style="color: rgba(255, 255, 255, 0.65)"
          ><a-menu-item key="9">设备列表</a-menu-item></router-link
        >
        <router-link to="/fire" style="color: rgba(255, 255, 255, 0.65)"
          ><a-menu-item key="10">火灾报警记录</a-menu-item></router-link
        >

        <router-link to="/Ai" style="color: rgba(255, 255, 255, 0.65)">
          <a-menu-item key="11">
            <span>智能小创Ai助手</span>
          </a-menu-item>
        </router-link>

        <router-link to="/key" style="color: rgba(255, 255, 255, 0.65)">
          <a-menu-item key="12">
            <span>秘钥管理</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div
          class="components-page-header-demo-responsive"
          style="border: 1px solid rgb(235, 237, 240)"
        >
          <a-page-header title="Title" sub-title="This is a subtitle" @back="() => $router.go(-1)">
            <template #extra>
              <router-link to="/screen"><a-button key="2">智慧大屏</a-button></router-link>
              <a-button key="3">全屏</a-button>
              <a-button key="4">主题切换</a-button>
              <a-button key="1" type="primary">退出登录</a-button>
            </template>
          </a-page-header>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ background: '#fff' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const selectedKeys = ref<string[]>(['4'])
</script>
<style scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
.logo {
  color: #2c6e49;
  position: relative;
  padding: 8px 20px;
  display: inline-block;
  border: none;
  margin-left: 20px;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}
</style>
