<script setup lang="ts">
import { useChatStore } from '@/stores/AiStore.ts';
import { ref, onMounted, nextTick } from 'vue';
import {
  Input,
  Avatar,
  Typography,
  message
} from 'ant-design-vue';
import { h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
const { Text } = Typography;
const chatStore = useChatStore();
const messageInput = ref('');
const messagesEndRef = ref<HTMLElement>();

const handleSubmit = async () => {
  const trimmedMessage = messageInput.value.trim();

  if (!trimmedMessage) {
    message.warning('请输入消息内容');
    return;
  }

  try {
    // 先清空输入框
    messageInput.value = "";
    await nextTick(); // 等待DOM更新

    // 发送消息
    await chatStore.sendMessage(trimmedMessage);

    // 滚动到底部
    scrollToBottom();

  } catch (error) {
    console.error('发送消息失败:', error);
    message.error('发送消息失败');
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' });
  });
};

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="chat-app">
    <!-- 标题栏 -->
    <div class="app-header">
      <h2>AI 对话助手</h2>
    </div>

    <!-- 主聊天区域 -->
    <div class="chat-container">
      <!-- 消息区域 -->
      <div class="messages-wrapper">
        <div class="messages">
          <div
            v-for="(message, index) in chatStore.messages"
            :key="index"
            :class="['message', message.role]"
          >
            <div class="message-content">
              <Avatar
                :size="36"
                :style="{
                  backgroundColor: message.role === 'user' ? '#f0f7ff' : 'white',
                  color: message.role === 'user' ? '#1890ff' : '#52c41a'
                }"
              >
                <template #icon>
                  <span v-if="message.role === 'user'"><UserOutlined /></span>
                  <span v-else><TrademarkCircleTwoTone /></span>
                </template>
              </Avatar>
              <div class="content-bubble">
                <Text class="content-text">{{ message.content }}</Text>
              </div>
              <div class="message-time" >
                {{ new Date(message.timestamp).toLocaleTimeString() }}
              </div>
            </div>
          </div>

          <div v-if="chatStore.isLoading" class="typing-indicator">
            <div class="typing-dots">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>

          <div ref="messagesEndRef" />
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-wrapper">
        <Input
          v-model:value="messageInput"
          placeholder="输入消息..."
          size="large"
          :disabled="chatStore.isLoading"
          @pressEnter="handleSubmit"
          class="input-box"
        >
          <template #suffix></template>
        </Input>
        <a-button
          :icon="h(SearchOutlined)"
          type="primary"
          :loading="chatStore.isLoading"
          @click="handleSubmit"
          class="send-button"
          size="large"
        >
          发送
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.app-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.app-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.chat-container {
  background-color: #F3F7FD;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.messages-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;
}

.messages-wrapper::-webkit-scrollbar {
  width: 6px;
}

.messages-wrapper::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 3px;
}

.input-wrapper {
  padding: 16px 24px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.message {
  margin-bottom: 16px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-content {
  display: flex;
  gap: 12px;
}

.user .message-content {
  flex-direction: row-reverse;
}

.content-bubble {
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
  background: #3e85f1;
  border: 1px solid #f0f0f0;
  box-shadow: -8px 8px 12px rgba(0, 128, 128, 0.1);
}

.user .content-bubble {
  background: #f0f7ff;
  border-color: #d0e3ff;
}

.assistant .content-bubble {
  background: white;
  border-color: white;
}

.content-text {
  padding-top: 120px;
  color: rgba(0, 0, 0, 0.85);
  word-break: break-word;
  font-size: 14px;
  line-height: 1.6;
}

.message-time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-top:8px;
}

.typing-indicator {
  display: flex;
  padding: 12px 16px;
  align-items: center;
}

.typing-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  opacity: 0.7;
  animation: typingAnimation 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingAnimation {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}


.input-wrapper {
  display: flex;
  gap: 8px; /* 设置输入框和按钮之间的间距 */
  align-items: center; /* 垂直居中 */
}

.input-box {
  flex: 1; /* 输入框占据剩余空间 */
}

.send-button {
  /* 可以添加一些按钮的特定样式 */
  white-space: nowrap; /* 防止按钮文字换行 */
}
</style>
