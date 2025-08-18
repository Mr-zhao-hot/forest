<script setup lang="ts">
import { KeyStore } from '@/stores/KeyStore.ts'
import { nextTick, onMounted, ref, watch } from 'vue'
const key = KeyStore()
interface TableRecord {
  id: number | unknown
}
import Tip from '@/components/tip/Tip.vue'
// 表单初始化
onMounted(() => {
  key.KeySelectList()
})
const formRef = ref()

// 清楚规则校验
watch(
  () => key.addKeyTable.open,
  (open) => {
    if (open) {
      nextTick(() => {
        formRef.value?.clearValidate()
      })
    }
  },
)
</script>

<template>
  <a-card>
    <a-row :gutter="[16, 24]" class="search-area">
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">秘钥名称：</span>
          <a-input
            style="flex: 2"
            v-model:value="key.keyTable.keyName"
            placeholder="请输入秘钥名"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">秘钥：</span>
          <a-input
            style="flex: 2"
            v-model:value="key.keyTable.keyPassword"
            placeholder="请输入秘钥"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">创建者：</span>
          <a-input
            style="flex: 2"
            v-model:value="key.keyTable.keyCreateName"
            placeholder="请输入创建者"
          />
        </div>
      </a-col>
    </a-row>

    <!-- 操作按钮 -->
    <a-space class="action-buttons">
      <a-button type="primary" style="background-color: #1890ff" @click="key.treeAddButton"
        ><plus-outlined />新增</a-button
      >
      <a-button style="background-color: #52c41a; color: white" @click="key.KeySelectList"
        ><search-outlined />查询</a-button
      >

      <a-button
        style="background-color: #ff4d4d; color: white"
        @click="key.triggerBatchDelete"
        :disabled="key.selectedRowKeys.length === 0"
        ><delete-outlined /> 批量删除 ({{ key.selectedRowKeys.length }})
      </a-button>
      <a-button style="border-color: #d9d9d9" @click="key.cleanTable"
        ><reload-outlined />重置</a-button
      >
    </a-space>

    <!-- 数据表格 -->
    <a-table
      :columns="key.columns"
      :data-source="key.data"
      :row-key="(record: TableRecord) => record.id"
      :row-selection="{
        selectedRowKeys: key.selectedRowKeys,
        onChange: key.onSelectChange,
      }"
      :pagination="key.pagination"
      @change="key.handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="key.editItem(record)">编辑</a>
            <a @click="key.triggerDelete(record)">删除</a>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-card>

  <a-modal
    v-model:open="key.addKeyTable.open"
    :title="key.addKeyTable.title"
    width="600px"
    :footer="null"
  >
    <a-form
      :model="key.addKeyTable.addKeyTables"
      layout="vertical"
      @finish="key.onFinish"
      :rules="key.rules"
      ref="formRef"
    >
      <a-row :gutter="24">
        <a-col class="gutter-row" :span="8">
          <a-form-item label="秘钥名称" name="keyName">
            <a-input
              v-model:value="key.addKeyTable.addKeyTables.keyName"
              placeholder="请输入秘钥名"
            />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="8">
          <a-form-item label="秘钥" name="keyPassword">
            <a-input-password
              v-model:value="key.addKeyTable.addKeyTables.keyPassword"
              placeholder="请输入秘钥"
            />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="8">
          <a-form-item label="创建者" name="keyCreateName">
            <a-input
              v-model:value="key.addKeyTable.addKeyTables.keyCreateName"
              placeholder="请输入创建者"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item style="float: right">
        <a-button type="dashed" style="margin-right: 10px" @click="key.CancelButton">取消</a-button>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>

  <Tip
    v-model:visible="key.tipVisible"
    :title="key.deleteMode === 'single' ? '删除确认' : '批量删除确认'"
    :content="
      key.deleteMode === 'single'
        ? '确定删除该班级吗？'
        : `确定删除选中的 ${key.selectedRowKeys.length} 个班级吗？`
    "
    @confirm="key.executeDelete"
  />
</template>

<style scoped>
.search-area {
  margin-bottom: 24px;
}
.action-buttons {
  margin-bottom: 16px;
}
</style>
