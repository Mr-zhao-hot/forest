<script setup lang="ts">
import { treeStore } from '@/stores/treeStore.ts'
import {onMounted} from "vue";
import Tip from "@/components/tip/Tip.vue";
const tree = treeStore()
interface TableRecord {
  id: string | number
}


// 表单初始化
onMounted(()=>{
  tree.treeSelectList();
})
</script>
<template>
  <a-card>
    <!-- 搜索区域 -->
    <a-row :gutter="[16, 24]" class="search-area">
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">树种名称：</span>
          <a-input
            style="flex: 2"
            v-model:value="tree.treeTablesPage.attachmentName"
            placeholder="请输入班级名字"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">学名：</span>
          <a-input
            style="flex: 2"
            v-model:value="tree.treeTablesPage.scientificName"
            placeholder="请输入年级"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">所属科：</span>
          <a-input style="flex: 2" v-model:value="tree.treeTablesPage.family" placeholder="请输入年级" />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">保护级别：</span>
          <a-input style="flex: 2" v-model:value="tree.treeTablesPage.protectionLevel" placeholder="请输入年级" />
        </div>
      </a-col>
    </a-row>

    <!-- 操作按钮 -->
    <a-space class="action-buttons">
      <a-button type="primary" style="background-color: #1890ff" @click="tree.treeAddButton"
        ><plus-outlined />新增</a-button
      >
      <a-button style="background-color: #52c41a; color: white" @click="tree.treeSelectList"
        ><search-outlined />查询</a-button
      >

      <a-button
        style="background-color: #ff4d4d; color: white"
        @click="tree.triggerBatchDelete"
        :disabled="tree.selectedRowKeys.length === 0"
        ><delete-outlined /> 批量删除 ({{ tree.selectedRowKeys.length }})
      </a-button>
      <a-button style="border-color: #d9d9d9" @click="tree.cleanTable"
        ><reload-outlined />重置</a-button
      >
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
    :content="
      tree.deleteMode === 'single'
        ? '确定删除该班级吗？'
        : `确定删除选中的 ${tree.selectedRowKeys.length} 个班级吗？`
    "
    @confirm="tree.executeDelete"
  />



  <!--    修改 和 新增  -->
  <a-modal
    v-model:open="tree.treeTable.open"
    :title="tree.treeTable.title"
    width="600px"
    :footer="null"
  >
    <a-form
      :model="tree.treeTable.treeTable"
      layout="vertical"
      @finish="tree.onFinish"
      :rules="tree.rules"
    >
      <a-row :gutter="24">
        <!-- 树种名称 -->
        <a-col :span="24">
          <a-form-item label="树种名称" name="attachmentName">
            <a-input
              v-model:value="tree.treeTable.treeTable.attachmentName"
              placeholder="请输入树种名称"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <!-- 学名 -->
        <a-col :span="12">
          <a-form-item label="学名" name="scientificName">
            <a-input
              v-model:value="tree.treeTable.treeTable.scientificName"
              placeholder="请输入树种学名"
            />
          </a-form-item>
        </a-col>

        <!-- 所属科 -->
        <a-col :span="12">
          <a-form-item label="所属科" name="family">
            <a-input
              v-model:value="tree.treeTable.treeTable.family"
              placeholder="请输入所属科"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 国家保护等级 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="国家保护等级" name="protectionLevel">
            <a-input
              v-model:value="tree.treeTable.treeTable.protectionLevel"
              placeholder="请输入国家保护等级"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 高度 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="高度(m)" name="height">
            <a-input-number
              v-model:value="tree.treeTable.treeTable.height"
              placeholder="请输入高度"
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
          <a-form-item label="直径(cm)" name="diameter">
            <a-input-number
              v-model:value="tree.treeTable.treeTable.diameter"
              placeholder="请输入直径"
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
          <a-form-item label="寿命(年)" name="lifespan">
            <a-input-number
              v-model:value="tree.treeTable.treeTable.lifespan"
              placeholder="请输入寿命"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 生长环境 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="生长环境" name="growthEnvironment">
            <a-input
              v-model:value="tree.treeTable.treeTable.growthEnvironment"
              placeholder="请输入生长环境"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 用途 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="用途" name="uses">
            <a-input
              v-model:value="tree.treeTable.treeTable.uses"
              placeholder="请输入用途"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item style="float: right">
        <a-button type="dashed" style="margin-right: 10px" @click="tree.treeCancelButton">取消</a-button>
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
