import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
import { Ai , AiFire , AiControllerCar} from '@/api/AiApi' // 导入封装好的Ai函数
import type { SelectProps  } from 'ant-design-vue';
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

  // const handleChange = async (content: string) => {
  //   console.log(`selected ${value}`);
  //   if (value.value === "模拟火灾") {
  //     isLoading.value = true;
  //     error.value = null;
  //
  //     // 添加用户消息
  //     messages.value.push({
  //       role: 'user',
  //       content: "前方发生火灾请帮我开始接受云端数据进行计算路线",
  //       timestamp: Date.now(),
  //     });
  //
  //     try {
  //       // // 参数组
  //       const Param = [{ firePoint: 'A1', rescueVehicle: 'B2' ,inspectionVehicle:'C1',fireTruck:'D1',wrecker:'T1'},]
  //       // 定义两张图片的URL
  //       const imageUrls = ['http://localhost:8080/img/f8977627b31b8a1eae46402c2870bb20.png']
  //       // 调用图片接口
  //       const response = await AiFire({ content })
  //       add(Param[0]);
  //       // let responseContent = response.data?.response || ''
  //       // responseContent = responseContent.replace(/<think>[\s\S]*?<\/think>/, '').trim()
  //
  //     messages.value.push({
  //       role: 'assistant',
  //       content:"路线已经计算完毕",
  //       imageUrl: imageUrls[0], // 使用当前选择的图片
  //       timestamp: Date.now(),
  //     });
  //         nextTick(() =>{
  //           AiControllerCar(1)
  //         })
  //     } catch (err) {
  //       error.value = err instanceof Error ? err.message : '未知的错误';
  //     } finally {
  //       isLoading.value = false;
  //     }
  //
  //   }
  // };
  // todo 第三路线
  const handleChange = async (content: string) => {
    console.log(`selected ${value}`);
    if (value.value === "模拟火灾") {
      isLoading.value = true;
      error.value = null;

      // 添加用户消息
      messages.value.push({
        role: 'user',
        content: "前方发生火灾请帮我开始接受云端数据进行计算路线",
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
          'http://localhost:8080/img/f8977627b31b8a1eae46402c2870bb20.png', // 第一张图片
          'http://localhost:8080/img/0811a275f0d4b9903fafd43ec79ecf2b.png', // 第二张图片
        ];
        // 调用图片接口
        const response = await AiFire({ content })
        // let responseContent = response.data?.response || ''
        // responseContent = responseContent.replace(/<think>[\s\S]*?<\/think>/, '').trim()
        messages.value.push({
          role: 'assistant',
          content:"路线计算完毕" ,
          imageUrl: imageUrls[0], // 使用当前选择的图片
          timestamp: Date.now(),
        });
        add(Param[0]);
        setTimeout(() =>{
          messages.value.push({
            role: 'assistant',
            content:"检测到前方道路出现问题 重新规范路线" ,
            imageUrl: imageUrls[1], // 使用当前选择的图片
            timestamp: Date.now(),
          });
          add(Param[1]);
        },2000)
        nextTick(() =>{
          AiControllerCar(1)
        })
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
