<script setup lang="ts">
import {WechatOutlined, QqOutlined, GithubOutlined} from '@ant-design/icons-vue'

import {StudentPageStore} from '@/stores/StudentPageStore.ts'

const loginStore = StudentPageStore()
</script>
<template>
  <a-form
      :model="loginStore.Login"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="loginStore.onFinish"
      @finishFailed="loginStore.onFinishFailed"
  >

    <a-form-item
        label="手机号"
        name="phone"
        :rules="[{ required: true, message: '手机号不许为空' }]"
    >
      <a-input-password v-model:value="loginStore.Login.phone"/>
    </a-form-item>
    <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
    >
      <a-input-password v-model:value="loginStore.Login.password"/>

    </a-form-item>

    <!--   icon注释   -->
    <span class="icons">
      <a href=""><wechat-outlined style="color: #07c160 ;font-size:30px;"/></a>
      <a href=""><qq-outlined style="color: #00a1d6 ;font-size:30px;"/></a>
     <a href="https://github.com/Mr-zhao-hot/Student">  <github-outlined style="color: #333 ;font-size:30px;"/></a>
    </span>
    <a-form-item name="remember" :wrapper-col="{ offset: 2, span: 11 }">
      <a-checkbox v-model:checked="loginStore.Login.remember">
        <router-link to="" class="protocol-link">我已阅读并同意用户协议</router-link>
      </a-checkbox>

    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
      <a-button type="primary" html-type="submit" @click="loginStore.LoginForm()">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped>
.icons {
  display: flex;
  gap: 20px; /* 控制间距 */
  justify-content: center;
  padding-bottom: 10px;

}
</style>
