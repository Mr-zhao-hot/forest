<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    >
      <div class="logo" >
        智慧林业系统
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>首页</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>森林资源管理</span>
            </span>
          </template>
          <router-link to="/tree"><a-menu-item key="3">树种管理</a-menu-item></router-link>
          <a-menu-item key="4">区域管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>森林安全管理</span>
            </span>
          </template>
          <a-menu-item key="6">实时定位</a-menu-item>
          <a-menu-item key="8">定位记录</a-menu-item>
          <a-menu-item key="9">巡场记录</a-menu-item>
          <a-menu-item key="10">火灾报警记录</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="11">
          <file-outlined />
          <span>智能小创Ai助手</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue';
const selectedKeys = ref<string[]>(['4']);
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
.logo{
  border: 1px red solid;
  color: #fff;
}
</style>
