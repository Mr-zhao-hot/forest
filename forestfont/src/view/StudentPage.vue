<script setup lang="ts">

import Login from "../view/Login.vue";
</script>

<template>
  <a-layout class="container">
    <a-card class="form-container">
      <a-tabs centered>
        <a-tab-pane key="login" tab="登录">
          <Login />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 470px;
  border-radius: 8px;
  :deep(.ant-tabs-nav) {
    margin-bottom: 24px;
  }
}
</style>
