import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {SelectProps} from 'ant-design-vue';

interface Message {
  role: 'user' | 'assistant'
  content?: string
  imageUrl?: string;
  timestamp: number
}

export const useChatStore = defineStore('chat', () => {
  const options = ref<SelectProps['options']>([
    { value: '模拟火灾', label: '模拟火灾' },
    { value: '小创助手', label: '小创助手' },
  ]);

  const value = ref<string | undefined>(undefined);
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const handleAiResponse = async (content: string) => {
    isLoading.value = true
    error.value = null

    // 添加用户消息
      messages.value.push({
        role: 'user',
        content,
        timestamp: Date.now(),
      })

    try {
      // 准备AI响应内容
      const aiResponse = {
        "0":"无人机启动",
        "1":"侦察车到B6",
        "2":"侦察车右转90",
        "3":"侦察车到C6",
        "4":"清障车到D2",
        "5":"清障车到D4",
        "6":"清障车到D5",
        "7":"障碍物清理",
        "8":"清障车右转90",
        "9":"清障车右转90",
        "10":"清障车到D1",
        "11":"侦察车到F6",
        "12":"侦察车右转45",
        "13":"侦察车左转45",
        "14":"侦察车左转90",
        "15":"侦察车到F4",
        "16":"侦察车到F2",
        "17":"侦察车左转90",
        "18":"侦察车到D2",
        "19":"侦察车左转90",
        "20":"侦察车到D6",
        "21":"侦察车右转90",
        "22":"侦察车到B6",
        "23":"侦察车右转90",
        "24":"侦察车到B7",
        "25":"救援车到D6",
        "26":"救援车右转90",
        "27":"救援车到F6",
        "28":"救援车左转90",
        "29":"救援车到F7",
        "30":"救援车到F4",
        "31":"救援车左转90",
        "32":"救援车到B4",
        "33":"救援车右转90",
        "34":"救援车右转90",
        "35":"救援车到A4",
        "36":"救援车到B4",
        "37":"救援车右转90",
        "38":"救援车到B6",
        "39":"救援车左转90",
        "40":"救援车到D6",
        "41":"救援车左转90",
        "42":"救援车到D7",
        "43":"消防车到B2",
        "44":"消防车左转90",
        "45":"消防车到F2",
        "46":"消防车右转90",
        "47":"消防车到F6",
        "48":"消防车左转45",
        "49":"消防车灭火开启",
        "50":"火焰关闭",
        "51":"消防车灭火关闭",
        "52":"消防车右转45",
        "53":"消防车右转90",
        "54":"消防车右转90",
        "55":"消防车到F2",
        "56":"消防车左转90",
        "57":"消防车到B2",
        "58":"消防车左转90",
        "59":"消防车到B1"
      }

      // 格式化响应内容为带缩进的JSON字符串
      const fullResponse = JSON.stringify(aiResponse, null, 2)

      // 添加一个空的AI消息作为起点
      const aiMessageIndex =
        messages.value.push({
          role: 'assistant',
          content: '',
          timestamp: Date.now(),
        }) - 1 // 获取刚添加的消息索引

      // 打字机效果实现
      let currentPosition = 0
      const typingSpeed = 20 // 打字速度，数值越小速度越快

      // 使用Promise包装定时器，确保异步操作能正确完成
      await new Promise<void>((resolve) => {
        const typeInterval = setInterval(() => {
          // 每次添加一个字符
          messages.value[aiMessageIndex].content = fullResponse.substring(0, currentPosition + 1)
          currentPosition++

          // 当所有字符都显示完毕，清除定时器并 resolve
          if (currentPosition >= fullResponse.length) {
            clearInterval(typeInterval)
            resolve()
          }
        }, typingSpeed)
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知的错误'
    } finally {
      isLoading.value = false
    }
  };


  const clearMessages = () => {
    messages.value = []
    error.value = null
  }

  return {
    messages,
    isLoading,
    error,
    handleAiResponse, // 确保导出正确的方法名
    clearMessages,
    options,
    value
  }
})
