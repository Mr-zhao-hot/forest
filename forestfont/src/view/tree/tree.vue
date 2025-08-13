<script setup lang="ts">

import {treeStore} from "@/stores/treeStore.ts"
const tree = treeStore()
interface TableRecord {
  id: string | number;
}

</script>
<template>
  <a-card>
    <!-- 搜索区域 -->
    <a-row :gutter="[16, 24]" class="search-area">
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">树种名称：</span>
          <a-input style="flex: 2"
                   v-model:value="tree.tree.treeName"
                   placeholder="请输入班级名字"/>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">学名：</span>
          <a-input style="flex: 2"
                   v-model:value="tree.tree.scientificName"
                   placeholder="请输入年级"/>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">所属科：</span>
          <a-input style="flex: 2"
                   v-model:value="tree.tree.affiliation"
                   placeholder="请输入年级"/>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">保护级别：</span>
          <a-input style="flex: 2"
                   v-model:value="tree.tree.protect"
                   placeholder="请输入年级"/>
        </div>
      </a-col>
    </a-row>

    <!-- 操作按钮 -->
    <a-space class="action-buttons" style="margin-right: 1040px">
      <a-button type="primary" style="background-color: #1890ff"  @click="tree.treeAddButton"><plus-outlined />新增</a-button>
      <a-button style="background-color: #52c41a; color: white" @click="tree.treeSelectList"><search-outlined />查询</a-button>

      <a-button  style="background-color: #ff4d4d;color: white"
                 @click="tree.triggerBatchDelete"
                 :disabled="tree.selectedRowKeys.length === 0"
      ><delete-outlined />
        批量删除 ({{ tree.selectedRowKeys.length }})

      </a-button>
      <a-button style="border-color: #d9d9d9" @click="tree.cleanTable"><reload-outlined />重置</a-button>
    </a-space>


    <!-- 数据表格 -->
    <a-table
      :columns="tree.columns"
      :data-source="tree.data"
      :row-key="(record: TableRecord) => record.id"
      :row-selection="{
        selectedRowKeys: tree.selectedRowKeys,
        onChange: tree.onSelectChange,
    }"
      :pagination="tree.pagination"
      @change="tree.handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="tree.editItem(record)">编辑</a>
            <a @click="tree.triggerDelete(record)">删除</a>
          </a-space>
        </template>
      </template>
    </a-table>

  </a-card>

  <Tip
    v-model:visible="tree.tipVisible"
    :title="tree.deleteMode === 'single' ? '删除确认' : '批量删除确认'"
    :content="tree.deleteMode === 'single'
      ? '确定删除该班级吗？'
      : `确定删除选中的 ${tree.selectedRowKeys.length} 个班级吗？`"
    @confirm="tree.executeDelete"
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
