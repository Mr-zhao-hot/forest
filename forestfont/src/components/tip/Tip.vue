<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  title: {
    type: String,
    default: '操作确认'
  },
  content: {
    type: String,
    default: '确定执行此操作吗？'
  },
  okText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
});

const emit = defineEmits(['update:visible', 'confirm']);

// 同步外部 visible 变化
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    emit('update:visible', false);
  }
});

const handleOk = () => {
  emit('confirm'); // 触发确认事件
  emit('update:visible', false);
};

const handleCancel = () => {
  emit('update:visible', false);
};
</script>

<template>
  <a-modal
      :title="title"
      :open="visible"
      :ok-text="okText"
      :cancel-text="cancelText"
      @ok="handleOk"
      @cancel="handleCancel"
  >
    <p>{{ content }}</p>
  </a-modal>
</template>