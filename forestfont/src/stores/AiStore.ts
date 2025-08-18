import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Ai } from '@/api/AiApi' // 导入封装好的Ai函数

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (content: string) => {
    isLoading.value = true
    error.value = null

    // 添加用户消息
    messages.value.push({
      role: 'user',
      content,
      timestamp: Date.now(),
    })

    try {
      const response = await Ai({ content })
      let responseContent = response.data?.response || ''
      responseContent = responseContent.replace(/<think>[\s\S]*?<\/think>/, '').trim()
      messages.value.push({
        role: 'assistant',
        content: responseContent || '我没有收到任何请求 python服务是否已经启动',
        timestamp: Date.now(),
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知的错误'
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
    error.value = null // 清空时也清除错误状态
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  }
})
