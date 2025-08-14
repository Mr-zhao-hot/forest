import { defineStore } from "pinia";
import { ref } from "vue";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const sendMessage = async (content: string) => {
    isLoading.value = true;
    error.value = null;

    // 添加用户消息
    messages.value.push({
      role: 'user',
      content,
      timestamp: Date.now()
    });

    try {
      // 模拟 API 调用
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "deepseek-r1:8b",
          messages: messages.value.map(m => ({ role: m.role, content: m.content })),
          stream: false
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      // 添加助手回复
      messages.value.push({
        role: 'assistant',
        content: data.message?.content || "I couldn't process that request.",
        timestamp: Date.now()
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  const clearMessages = () => {
    messages.value = [];
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
});
