<script setup lang="ts">
interface TableRecord {
  id: string | number
}

import { nextTick, onMounted, ref, watch } from 'vue'
import Tip from "@/components/tip/Tip.vue";
import { equipmentStore } from '@/stores/EquipmentStore.ts'
const equipmentstore = equipmentStore()
// 表单初始化
onMounted(()=>{
  equipmentstore.EquipmentSelectList();
})
const formRef = ref();

// 清楚规则校验
watch(
  () => equipmentstore.equipmentTable.open,
  (open) => {
    if (open) {
      nextTick(() => {
        formRef.value?.clearValidate();
      });
    }
  }
);
</script>

<template>
  <a-card>
    <!-- 搜索区域 -->
    <a-row :gutter="[16, 24]" class="search-area">
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">设备名称:</span>
          <a-input
            style="flex: 2"
            v-model:value="equipmentstore.equipmentTablePage.equipmentName"
            placeholder="请输入设备名称"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">状态:</span>
          <a-input
            style="flex: 2"
            v-model:value="equipmentstore.equipmentTablePage.status"
            placeholder="请输入状态"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">使用人:</span>
          <a-input style="flex: 2" v-model:value="equipmentstore.equipmentTablePage.useName" placeholder="请输入使用人" />
        </div>
      </a-col>
    </a-row>

    <!-- 操作按钮 -->
    <a-space class="action-buttons">
      <a-button type="primary" style="background-color: #1890ff" @click="equipmentstore.EquipmentAddButton"
      ><plus-outlined />新增</a-button
      >
      <a-button style="background-color: #52c41a; color: white" @click="equipmentstore.EquipmentSelectList"
      ><search-outlined />查询</a-button
      >

      <a-button
        style="background-color: #ff4d4d; color: white"
        @click="equipmentstore.triggerBatchDelete"
        :disabled="equipmentstore.selectedRowKeys.length === 0"
      ><delete-outlined /> 批量删除 ({{ equipmentstore.selectedRowKeys.length }})
      </a-button>
      <a-button style="border-color: #d9d9d9" @click="equipmentstore.cleanTable"
      ><reload-outlined />重置</a-button
      >
    </a-space>

    <!-- 数据表格 -->
    <a-table
      :columns="equipmentstore.columns"
      :data-source="equipmentstore.data"
      :row-key="(record: TableRecord) => record.id"
      :row-selection="{
        selectedRowKeys: equipmentstore.selectedRowKeys,
        onChange: equipmentstore.onSelectChange,
      }"
      :pagination="equipmentstore.pagination"
      @change="equipmentstore.handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="equipmentstore.editItem(record)">编辑</a>
            <a @click="equipmentstore.triggerDelete(record)">删除</a>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-card>

  <Tip
    v-model:visible="equipmentstore.tipVisible"
    :title="equipmentstore.deleteMode === 'single' ? '删除确认' : '批量删除确认'"
    :content="
      equipmentstore.deleteMode === 'single'
        ? '确定删除该班级吗？'
        : `确定删除选中的 ${equipmentstore.selectedRowKeys.length} 个班级吗？`
    "
    @confirm="equipmentstore.executeDelete"
  />



  <!--    修改 和 新增  -->
  <a-modal
    v-model:open="equipmentstore.equipmentTable.open"
    :title="equipmentstore.equipmentTable.title"
    width="600px"
    :footer="null"
  >
    <a-form
      :model="equipmentstore.equipmentTable.equipmentTable"
      layout="vertical"
      @finish="equipmentstore.onFinish"
      :rules="equipmentstore.rules"
      ref="formRef"
    >
      <a-row :gutter="24">
        <!-- 设备名称 -->
        <a-col :span="24">
          <a-form-item label="设备名称" name="equipmentName">
            <a-input
              v-model:value="equipmentstore.equipmentTable.equipmentTable.equipmentName"
              placeholder="请输入设备名称"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <!-- 状态 -->
        <a-col :span="12">
          <a-form-item label="状态" name="status">
            <a-input
              v-model:value="equipmentstore.equipmentTable.equipmentTable.status"
              placeholder="请输入树种状态"
            />
          </a-form-item>
        </a-col>

        <!-- 使用人 -->
        <a-col :span="12">
          <a-form-item label="使用人" name="useName">
            <a-input
              v-model:value="equipmentstore.equipmentTable.equipmentTable.useName"
              placeholder="请输入使用人"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 备注 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="备注" name="remark">
            <a-input
              v-model:value="equipmentstore.equipmentTable.equipmentTable.remark"
              placeholder="请输入备注"
            />
          </a-form-item>
        </a-col>
      </a-row>


      <a-form-item style="float: right">
        <a-button type="dashed" style="margin-right: 10px" @click="equipmentstore.treeCancelButton">取消</a-button>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.search-area {
  margin-bottom: 24px;
}
.action-buttons {
  margin-bottom: 16px;
}
</style>
