<script setup lang="ts">
import {AreaStore} from  "@/stores/AreaStore.ts"
const area = AreaStore()
import { nextTick, onMounted, ref, watch } from 'vue'
import Tip from '@/components/tip/Tip.vue'
interface TableRecord {
  id: string | number
}

const formRef = ref()
// 清楚规则校验
watch(
  () => area.AreaTable.open,
  (open) => {
    if (open) {
      nextTick(() => {
        formRef.value?.clearValidate()
      })
    }
  },
)

// 表单初始化
onMounted(() => {
  area.AreaSelectList()
})
</script>

<template>
  <a-card>
    <!-- 搜索区域 -->
    <a-row :gutter="[16, 24]" class="search-area">
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">起火点坐标：</span>
          <a-input
            style="flex: 2"
            v-model:value="area.AreaPageSelect.firePoint"
            placeholder="请输入起火点坐标"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">救援车坐标：</span>
          <a-input
            style="flex: 2"
            v-model:value="area.AreaPageSelect.rescueVehicle"
            placeholder="请输入救援车坐标"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">巡检车坐标：</span>
          <a-input
            style="flex: 2"
            v-model:value="area.AreaPageSelect.inspectionVehicle"
            placeholder="请输入巡检车坐标"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">消防车坐标：</span>
          <a-input
            style="flex: 2"
            v-model:value="area.AreaPageSelect.fireTruck"
            placeholder="请输入消防车坐标"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">清障车坐标：</span>
          <a-input
            style="flex: 2"
            v-model:value="area.AreaPageSelect.wrecker"
            placeholder="请输入清障车坐标"
          />
        </div>
      </a-col>
    </a-row>

    <!-- 操作按钮 -->
    <a-space class="action-buttons">
      <a-button type="primary" style="background-color: #1890ff" @click="area.treeAddButton"
      ><plus-outlined />新增</a-button
      >
      <a-button style="background-color: #52c41a; color: white" @click="area.AreaSelectList"
      ><search-outlined />查询</a-button
      >

      <a-button
        style="background-color: #ff4d4d; color: white"
        @click="area.triggerBatchDelete"
        :disabled="area.selectedRowKeys.length === 0"
      ><delete-outlined /> 批量删除 ({{ area.selectedRowKeys.length }})
      </a-button>
      <a-button style="border-color: #d9d9d9" @click="area.cleanTable"
      ><reload-outlined />重置</a-button
      >
    </a-space>

    <!-- 数据表格 -->
    <a-table
      :columns="area.columns"
      :data-source="area.data"
      :row-key="(record: TableRecord) => record.id"
      :row-selection="{
        selectedRowKeys: area.selectedRowKeys,
        onChange: area.onSelectChange,
      }"
      :pagination="area.pagination"
      @change="area.handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="area.editItem(record)">编辑</a>
            <a @click="area.triggerDelete(record)">删除</a>
          </a-space>
        </template>
      </template>
    </a-table>

  </a-card>


  <Tip
    v-model:visible="area.tipVisible"
    :title="area.deleteMode === 'single' ? '删除确认' : '批量删除确认'"
    :content="
      area.deleteMode === 'single'
        ? '确定删除该班级吗？'
        : `确定删除选中的 ${area.selectedRowKeys.length} 个班级吗？`
    "
    @confirm="area.executeDelete"
  />

  <!--    修改 和 新增  -->
  <a-modal
    v-model:open="area.AreaTable.open"
    :title="area.AreaTable.title"
    width="600px"
    :footer="null"
  >
    <a-form
      :model="area.AreaTable.AreaTable"
      layout="vertical"
      @finish="area.onFinish"
      :rules="area.rules"
      ref="formRef"
    >
      <a-row :gutter="24">
        <!-- 树种名称 -->
        <a-col :span="24">
          <a-form-item label="着火点坐标" name="attachmentName">
            <a-input
              v-model:value="area.AreaTable.AreaTable.firePoint"
              placeholder="请输入着火点坐标"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <!-- 学名 -->
        <a-col :span="12">
          <a-form-item label="救援车坐标" name="scientificName">
            <a-input
              v-model:value="area.AreaTable.AreaTable.rescueVehicle"
              placeholder="请输入救援车坐标"
            />
          </a-form-item>
        </a-col>

        <!-- 所属科 -->
        <a-col :span="12">
          <a-form-item label="巡检车坐标" name="family">
            <a-input v-model:value="area.AreaTable.AreaTable.inspectionVehicle"
                     placeholder="请输入巡检车坐标" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 国家保护等级 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="消防车坐标" name="protectionLevel">
            <a-input
              v-model:value="area.AreaTable.AreaTable.fireTruck"
              placeholder="请输入消防车坐标"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 高度 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="消防车坐标" name="height">
            <a-input-number
              v-model:value="area.AreaTable.AreaTable.wrecker"
              placeholder="请输入消防车坐标"
              :min="0"
              :step="0.1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 直径 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="创建时间" name="diameter">
            <a-input-number
              v-model:value="area.AreaTable.AreaTable.createdAt"
              placeholder="请输入创建时间"
              :min="0"
              :step="0.1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 寿命 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="更新时间" name="lifespan">
            <a-input-number
              v-model:value="area.AreaTable.AreaTable.updatedAt"
              placeholder="请输入更新时间"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>


      <a-form-item style="float: right">
        <a-button type="dashed" style="margin-right: 10px" @click="area.CancelButton"
        >取消</a-button
        >
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
