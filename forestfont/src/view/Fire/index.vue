<script setup lang="ts">
import { useFireStore } from '@/stores/FireStore.ts'
import { nextTick, onMounted, ref, watch } from 'vue'
import Tip from '@/components/tip/Tip.vue'
const fire = useFireStore()

interface TableRecord {
  id: number | unknown
}
const formRef = ref()
onMounted(() => {
  fire.FireSelectList()
})

// 清楚规则校验
watch(
  () => fire.fireTable.open,
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
    <!-- 搜索区域 -->
    <a-row :gutter="[16, 24]" class="search-area">
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">经度：</span>
          <a-input
            style="flex: 2"
            v-model:value="fire.firePageTable.longitude"
            placeholder="请输入经度"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">纬度：</span>
          <a-input
            style="flex: 2"
            v-model:value="fire.firePageTable.latitude"
            placeholder="请输入纬度"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">方位角：</span>
          <a-input
            style="flex: 2"
            v-model:value="fire.firePageTable.azimuth"
            placeholder="请输入方位角"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">报警类型：</span>
          <a-select
            style="flex: 2"
            v-model:value="fire.firePageTable.alarmType"
            placeholder="请选择报警类型"
         >
            <a-select-option
              v-for="option in fire.statusTypeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">温度：</span>
          <a-input
            style="flex: 2"
            v-model:value="fire.firePageTable.temperature"
            placeholder="请输入温度"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">烟雾浓度：</span>
          <a-input
            style="flex: 2"
            v-model:value="fire.firePageTable.smokeDensity"
            placeholder="请输入烟雾浓度"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">状态：</span>
          <a-select
            style="flex: 2"
            v-model:value="fire.firePageTable.status"
            placeholder="请选择报警类型"
          >
            <a-select-option
              v-for="option in fire.statusTypeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="5">
        <div style="display: flex; align-items: center; gap: 8px">
          <span style="white-space: nowrap">创建人：</span>
          <a-input
            style="flex: 2"
            v-model:value="fire.firePageTable.createName"
            placeholder="请输入创建人"
          />
        </div>
      </a-col>
    </a-row>

    <a-space class="action-buttons">
      <a-button type="primary" style="background-color: #1890ff" @click="fire.treeAddButton"
      ><plus-outlined />新增</a-button
      >
      <a-button style="background-color: #52c41a; color: white" @click="fire.FireSelectList"
      ><search-outlined />查询</a-button
      >

      <a-button
        style="background-color: #ff4d4d; color: white"
        @click="fire.triggerBatchDelete"
        :disabled="fire.selectedRowKeys.length === 0"
      ><delete-outlined /> 批量删除 ({{ fire.selectedRowKeys.length }})
      </a-button>
      <a-button style="border-color: #d9d9d9" @click="fire.cleanTable"
      ><reload-outlined />重置</a-button
      >
    </a-space>

    <a-table
      :columns="fire.columns"
      :data-source="fire.data"
      :row-key="(record: TableRecord) => record.id"
      :row-selection="{
    selectedRowKeys: fire.selectedRowKeys,
    onChange: fire.onSelectChange,
  }"
      :pagination="fire.pagination"
      @change="fire.handleTableChange"
      class="custom-table"
    >
      <template #bodyCell="{ column, record }">
        <!-- 图片列处理 -->
        <template v-if="column.key === 'imageUrl'">
          <a-image
            :src="record.imageUrl"
            style="width: 50px; height: auto; max-height: 100px; object-fit: cover;"
            alt="图片"
          />
        </template>

        <!-- 报警等级列 -->
        <template v-else-if="column.key === 'alarmLevel'">
          {{ fire.getSmokeDensityLabel(record.alarmLevel) }}
        </template>

        <!-- 状态列 -->
        <template v-else-if="column.key === 'status'">
          {{ fire.getStatusLabel(record.status) }}
        </template>

        <!-- 火灾类型列 -->
        <template v-else-if="column.key === 'alarmType'">
          {{ fire.getFireTypeLabel(record.alarmType) }}
        </template>

        <!-- 操作列 -->
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a class="small-text" @click="fire.editItem(record)">编辑</a>
            <a class="small-text" @click="fire.triggerDelete(record)">删除</a>
          </a-space>
        </template>

        <!-- 其他列的默认显示 -->
        <template v-else>
          <span class="small-text">{{ record[column.dataIndex] }}</span>
        </template>
      </template>
    </a-table>

  </a-card>


  <Tip
    v-model:visible="fire.tipVisible"
    :title="fire.deleteMode === 'single' ? '删除确认' : '批量删除确认'"
    :content="
      fire.deleteMode === 'single'
        ? '确定删除该班级吗？'
        : `确定删除选中的 ${fire.selectedRowKeys.length} 个班级吗？`
    "
    @confirm="fire.executeDelete"
  />


<!--  :rules="fire.rules"-->
  <!--    修改 和 新增  -->
  <!-- 修改和新增 -->
  <a-modal
    v-model:open="fire.fireTable.open"
    :title="fire.fireTable.title"
    width="1000px"
    :footer="null"
  >
    <a-form
      :model="fire.fireTable.fireTable"
      layout="vertical"
      @finish="fire.onFinish"
      ref="formRef"
    >
      <!-- 第一行：设备信息和火灾类型 -->
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="设备名称" name="deviceId" :rules="[{ required: true, message: '请输入设备名称' }]">
            <a-input
              v-model:value="fire.fireTable.fireTable.deviceId"
              placeholder="请输入设备名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="火灾类型" name="alarmType" :rules="[{ required: true, message: '请选择火灾类型' }]">
            <a-select
              v-model:value="fire.fireTable.fireTable.alarmType"
              placeholder="请选择火灾类型"
            >
              <a-select-option
                v-for="option in fire.fireTypeOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第二行：位置信息 -->
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="经度" name="longitude" :rules="[{ required: true, message: '请输入经度' }]">
            <a-input-number
              v-model:value="fire.fireTable.fireTable.longitude"
              placeholder="请输入经度"
              :min="-180"
              :max="180"
              :step="0.000001"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="纬度" name="latitude" :rules="[{ required: true, message: '请输入纬度' }]">
            <a-input-number
              v-model:value="fire.fireTable.fireTable.latitude"
              placeholder="请输入纬度"
              :min="-90"
              :max="90"
              :step="0.000001"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="海拔高度(m)" name="altitude">
            <a-input-number
              v-model:value="fire.fireTable.fireTable.altitude"
              placeholder="请输入海拔高度"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第三行：方位角和报警等级 -->
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="方位角(0-360度)" name="azimuth">
            <a-input-number
              v-model:value="fire.fireTable.fireTable.azimuth"
              placeholder="请输入方位角"
              :min="0"
              :max="360"
              :step="1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">

          <a-form-item label="报警等级" name="alarmLevel" :rules="[{ required: true, message: '请选择报警等级' }]">
            <a-select
              v-model:value="fire.fireTable.fireTable.alarmLevel"
              placeholder="请选择报警等级类型"
            >
              <a-select-option
                v-for="option in fire.alarmTypeOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第四行：环境信息 -->
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="环境温度(℃)" name="temperature">
            <a-input-number
              v-model:value="fire.fireTable.fireTable.temperature"
              placeholder="请输入环境温度"
              :min="-50"
              :max="100"
              :step="0.1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="烟雾浓度(%)" name="smokeDensity">
            <a-input-number
              v-model:value="fire.fireTable.fireTable.smokeDensity"
              placeholder="请输入烟雾浓度"
              :min="0"
              :max="100"
              :step="0.1"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="状态" name="status" :rules="[{ required: true, message: '请选择状态' }]">
            <a-select
              v-model:value="fire.fireTable.fireTable.status"
              placeholder="请选择报警类型"
            >
              <a-select-option
                v-for="option in fire.statusTypeOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第五行：图片上传 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="现场图片" name="imageUrl">
            <a-upload
              v-model:file-list="fire.fileList"
              list-type="picture-card"
              @preview="fire.handlePreview"
              @change="fire.handleChange"
              :before-upload="fire.beforeUpload"
              :max-count="1"
              accept="image/*"
            >
              <div v-if="fire.fileList.length < 1">
                <plus-outlined />
                <div style="margin-top: 8px">上传图片</div>
              </div>
            </a-upload>
            <a-modal
              :visible="fire.previewVisible"
              :title="fire.previewTitle"
              @cancel="fire.previewVisible = false"
              :footer="null"
            >
              <img alt="example" style="width: 100%" :src="fire.previewImage" />
            </a-modal>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第六行：创建信息 -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="创建者/上报人" name="createName">
            <a-input
              v-model:value="fire.fireTable.fireTable.createName"
              placeholder="请输入创建者/上报人"
            />
          </a-form-item>
        </a-col>

      </a-row>


      <!-- 表单操作按钮 -->
      <a-form-item style="text-align: right; margin-top: 24px">
        <a-button type="default" style="margin-right: 10px" @click="fire.CancelButton">
          取消
        </a-button>
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
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
.custom-table :deep(.ant-table-thead > tr > th) {
  font-size: 12px;  /* 调整表头字体大小 */
}
</style>
