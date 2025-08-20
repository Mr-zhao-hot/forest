import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Ai} from '@/api/AiApi' // 导入封装好的Ai函数
import type { SelectProps } from 'ant-design-vue';
import { add } from '@/api/AreaApi.ts'
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

  // 在组件外部定义状态变量（避免被重复初始化）
  let currentImageIndex = 0;
  let currentParamIndex = 0;
  const handleChange = async (content: string) => {
    console.log(`selected ${value}`);
    if (value.value === "模拟火灾") {
      isLoading.value = true;
      error.value = null;

      // 添加用户消息
      messages.value.push({
        role: 'user',
        content: "开始规划路线",
        timestamp: Date.now(),
      });

      try {
        // // 参数组
        const Param = [
          { firePoint: 'A1', rescueVehicle: 'B2' ,inspectionVehicle:'C1',fireTruck:'D1',wrecker:'T1'},
          { firePoint: 'A2', rescueVehicle: 'B3' ,inspectionVehicle:'C2',fireTruck:'D3',wrecker:'T2'}
        ]
        // 定义两张图片的URL
        const imageUrls = [
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 第一张图片
          'https://example.com/fire2.jpg', // 第二张图片
        ];

        // 选择当前图片（交替切换）
        const selectedImageUrl = imageUrls[currentImageIndex];
        // 更新索引（下次执行时显示另一张）
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        // 选择当前参数组
        const selectedParams = Param[currentParamIndex];
        // 更新索引（下次调用时使用另一组）
        currentParamIndex = (currentParamIndex + 1) % Param.length;
        add(selectedParams);
        setTimeout(() => {
          messages.value.push({
            role: 'assistant',
            imageUrl: selectedImageUrl, // 使用当前选择的图片
            timestamp: Date.now(),
          });
        }, 0);

      } catch (err) {
        error.value = err instanceof Error ? err.message : '未知的错误';
      } finally {
        isLoading.value = false;
      }
    }
  };
  const handleBlur = () => {
    console.log('blur');
  };
  const handleFocus = () => {
    console.log('focus');
  };
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const value = ref<string | undefined>(undefined);


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
    options,
    handleChange,
    handleBlur,
    handleFocus,
    filterOption,
    value
  }
})
