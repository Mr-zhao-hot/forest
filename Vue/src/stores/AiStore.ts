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

  // 修改方法名：将 sendMessage 改为 handleAiResponse
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
      setTimeout(()=>{
        // 模拟AI响应 - 将JSON内容格式化为垂直排列
        const formattedResponse = JSON.stringify({
          "0": "无人机启动",
          "1": "侦察车到B6",
          "2": "侦察车右转90",
          "3": "侦察车到C6",
          "4": "清障车到D2",
          "5": "清障车到D4",
          "6": "清障车到D5",
          "7": "障碍物清理",
          "8": "清障车右转90",
          "9": "清障车右转90",
          "10": "清障车到D1",
          "11": "侦察车到F6",
          "12": "侦察车右转45",
          "13": "侦察车左转45",
          "14": "侦察车左转90",
          "15": "侦察车到F4",
          "16": "侦察车到F2",
          "17": "侦察车左转90",
          "18": "侦察车到D2",
          "19": "侦察车左转90",
          "20": "侦察车到D6",
          "21": "侦察车右转90",
          "22": "侦察车到B6",
          "23": "侦察车右转90",
          "24": "侦察车到B7",
          "25": "救援车到D6",
          "26": "救援车右转90",
          "27": "救援车到F6",
          "28": "救援车左转90",
          "29": "救援车到F7",
          "30": "救援车到F4",
          "31": "救援车左转90",
          "32": "救援车到B4",
          "33": "救援车右转90",
          "34": "救援车右转90",
          "35": "救援车到A4",
          "36": "救援车到B4",
          "37": "救援车右转90",
          "38": "救援车到B6",
          "39": "救援车左转90",
          "40": "救援车到D6",
          "41": "救援车左转90",
          "42": "救援车到D7",
          "43": "消防车到B2",
          "44": "消防车左转90",
          "45": "消防车到F2",
          "46": "消防车右转90",
          "47": "消防车到F6",
          "48": "消防车左转45",
          "49": "消防车灭火开启",
          "50": "火焰关闭",
          "51": "消防车右转45",
          "52": "消防车右转90",
          "53": "消防车右转90",
          "54": "消防车到F2",
          "55": "消防车左转90",
          "56": "消防车到B2",
          "57": "消防车左转90",
          "58": "消防车到B1"
        }, null, 2) // 使用2个空格缩进，使JSON垂直排列

        messages.value.push({
          role: 'assistant',
          content: formattedResponse,
          timestamp: Date.now(),
        })
      },6000)


    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知的错误'
    } finally {
      isLoading.value = false
    }
  }

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
