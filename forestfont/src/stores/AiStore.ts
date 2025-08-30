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

  // 先将 AiFire 改造为接收 content 参数的可复用函数，返回完整处理后的内容
  const AiFire = async (content) => {
    // 提取核心内容的函数：过滤思考部分（```包裹内容）和换行符
    const extractCoreContent = (content) => {
      let isThinkSection = false;
      let coreContent = '';
      for (let i = 0; i < content.length; i++) {
        // 识别 ``` 思考段标记
        if (content[i] === '`' && i + 2 < content.length &&
          content[i+1] === '`' && content[i+2] === '`') {
          isThinkSection = !isThinkSection;
          i += 2; // 跳过剩余两个`
          continue;
        }
        // 保留非思考段内容，过滤换行符
        if (!isThinkSection && content[i] !== '\n') {
          coreContent += content[i];
        }
      }
      return coreContent;
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/chatFire`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({ content }) // 传递外部传入的content参数
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = ''; // 存储完整的AI响应内容
      let isTyping = false;
      const typeSpeed = 50;

      // 打字机函数：直接操作 messages 数组（需确保messages是响应式变量）
      const typeWriter = async (currentContent, isFinal = false) => {
        if (isTyping) return;
        isTyping = true;

        const filteredContent = extractCoreContent(currentContent);
        let currentIndex = 0;

        // 若为首次输出，添加空的助手消息占位；若为追加，获取最后一条助手消息
        const lastAssistantMsgIndex = messages.value.findLastIndex(
          msg => msg.role === 'assistant'
        );
        const messageIndex = lastAssistantMsgIndex === -1
          ? messages.value.push({
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        }) - 1
          : lastAssistantMsgIndex;

        // 逐字符更新内容
        while (currentIndex < filteredContent.length) {
          messages.value[messageIndex].content += filteredContent[currentIndex];
          currentIndex++;
          await new Promise(resolve => setTimeout(resolve, typeSpeed));
        }
        isTyping = false;
      };

      // 处理流式响应
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') {
              console.log('Stream completed');
              // 流结束后处理剩余内容，标记为最终内容（添加图片）
              if (fullContent) {
                await typeWriter(fullContent, true);
                fullContent = '';
              }
              break;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.content) {
                fullContent += data.content;
                // 每累积20个字符触发一次打字输出（非最终，不添加图片）
                if (fullContent.length >= 20) {
                  await typeWriter(fullContent);
                  fullContent = '';
                }
              }
            } catch (e) {
              console.error('Parse stream data error:', e, 'Raw data:', dataStr);
            }
          }
        }
      }

      // 处理最后剩余的少量内容（标记为最终内容）
      if (fullContent) {
        await typeWriter(fullContent, true);
      }

      // 返回完整的过滤后内容（供后续逻辑使用）
      return extractCoreContent(fullContent);

    } catch (error) {
      console.error('Error in AiFire function:', error);
      // 错误时添加错误提示消息
      messages.value.push({
        role: 'assistant',
        content: '路线计算请求失败，请重试',
        timestamp: Date.now()
      });
      throw error; // 抛出错误，让handleChange捕获
    }
  };

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
  //       const response = await AiFire(content )
  //       add(Param[0]);
  //       // let responseContent = response.data?.response || ''
  //       // responseContent = responseContent.replace(/<think>[\s\S]*?<\/think>/, '').trim()
  //
  //     messages.value.push({
  //       role: 'assistant',
  //       content:response,
  //       imageUrl: imageUrls[0], // 使用当前选择的图片
  //       timestamp: Date.now(),
  //     });
 //      AiControllerCar(1)
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
    console.log(`selected ${value.value}`);
    if (value.value === "模拟火灾") {
      isLoading.value = true;
      error.value = null;

      // 1. 添加用户消息
      messages.value.push({
        role: 'user',
        content: "前方发生火灾请帮我开始接受云端数据进行计算路线",
        timestamp: Date.now(),
      });

      const Param = [
        { firePoint: 'A1', rescueVehicle: 'B2', inspectionVehicle: 'C1', fireTruck: 'D1', wrecker: 'T1' },
        { firePoint: 'A2', rescueVehicle: 'B3', inspectionVehicle: 'C2', fireTruck: 'D3', wrecker: 'T2' }
      ];
      const imageUrls = [
        'http://localhost:8080/img/f8977627b31b8a1eae46402c2870bb20.png',
        'http://localhost:8080/img/0811a275f0d4b9903fafd43ec79ecf2b.png',
      ];

      try {
        // 2. 调用 AiFire 获取完整文字响应（确保文字已生成完毕）
        const response = await AiFire(content); // AiFire返回文字内容

        // 3. 第一步：先添加「仅含文字」的助手消息（无图片）
        const assistantMsgIndex = messages.value.push({
          role: 'assistant',
          // content: response, // 先显示文字
          timestamp: Date.now()
          // 暂不添加 imageUrl，避免图片同步加载
        }) - 1; // 记录这条消息在数组中的索引，方便后续补图片

        // 4. 第二步：延迟1秒后，给这条消息添加 imageUrl（触发图片加载）
        setTimeout(() => {
          messages.value[assistantMsgIndex].imageUrl = imageUrls[0];
          // 响应式数据更新，前端会自动加载并显示图片
        }, 1000); // 1000毫秒 = 1秒间隔

        // 5. 原有后续逻辑（路线更新、车辆控制）不变
        add(Param[0]);
        setTimeout(() => {
          // 第二条消息同理：先加文字，延迟1秒补图片
          const updateMsgIndex = messages.value.push({
            role: 'assistant',
            content: "检测到前方道路出现问题 重新规范路线",
            timestamp: Date.now()
            // 暂不加图片
          }) - 1;

          // 第二条消息也间隔1秒加载图片
          setTimeout(() => {
            messages.value[updateMsgIndex].imageUrl = imageUrls[1];
          }, 1000);

          add(Param[1]);
          AiControllerCar(1)
        }, 2000);

      } catch (err) {
        error.value = err instanceof Error ? err.message : '未知的错误';
        messages.value.push({
          role: 'assistant',
          content: `操作失败：${error.value}`,
          timestamp: Date.now()
        });
      } finally {
        isLoading.value = false;
      }
    }
  };


  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const value = ref<string | undefined>(undefined);


  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (content: string) => {
    // 提取核心内容的函数：过滤思考部分和换行符
    const extractCoreContent = (content) => {
      let isThinkSection = false; // 标记是否处于思考内容段
      let coreContent = '';

      // 将内容按字符处理，识别思考段标记
      for (let i = 0; i < content.length; i++) {
        // 检测思考段开始/结束标记
        if (content[i] === '`' && i + 2 < content.length &&
          content[i+1] === '`' && content[i+2] === '`') {
          isThinkSection = !isThinkSection;
          i += 2; // 跳过剩余的两个`符号
          continue;
        }

        // 非思考段内容才会被保留
        if (!isThinkSection) {
          // 过滤换行符
          if (content[i] !== '\n') {
            coreContent += content[i];
          }
        }
      }

      return coreContent;
    };

    isLoading.value = true;
    error.value = null;

    // 添加用户消息
    messages.value.push({
      role: 'user',
      content,
      timestamp: Date.now(),
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({ content })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = ''; // 拼接完整响应内容
      let isTyping = false; // 避免打字机效果并发冲突
      const typeSpeed = 50; // 打字速度（毫秒/字符），可调整
      let messageIndex = -1; // 存储当前消息索引

      // 打字机核心函数：逐字符输出内容
      const typeWriter = async (content) => {
        if (isTyping) return; // 若正在打字，等待当前任务结束
        isTyping = true;

        // 先过滤内容（移除思考部分和换行符）
        const filteredContent = extractCoreContent(content);
        let currentIndex = 0;

        // 首次调用时添加一个空消息占位
        if (messageIndex === -1) {
          messageIndex = messages.value.push({
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
          }) - 1;
        }

        while (currentIndex < filteredContent.length) {
          // 每次追加1个字符，模拟打字效果
          messages.value[messageIndex].content += filteredContent[currentIndex];
          currentIndex++;
          // 等待指定时间后继续下一个字符
          await new Promise(resolve => setTimeout(resolve, typeSpeed));
        }
        isTyping = false;
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // 解码并处理流数据
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {

          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') {
              console.log('Stream completed');
              // 流结束后，处理剩余内容
              if (fullContent) {
                await typeWriter(fullContent);
                fullContent = '';
              }
              break;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.content) {
                console.log('Partial Content:', data.content);
                // 累加内容
                fullContent += data.content;
                // 当累加内容超过20个字符，触发一次打字输出
                if (fullContent.length >= 20) {
                  await typeWriter(fullContent);
                  fullContent = ''; // 清空已输出的内容
                }
              }
            } catch (e) {
              console.log('Raw data:', dataStr);
            }
          }
        }
      }

      // 处理最后剩余的少量内容
      if (fullContent) {
        await typeWriter(fullContent);
      }

      // 如果没有添加过回复消息，添加一个默认回复
      if (messageIndex === -1) {
        messages.value.push({
          role: 'assistant',
          content: '我没有收到任何请求，python服务是否已经启动',
          timestamp: Date.now(),
        });
      }

    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知的错误';
      // 添加错误消息
      messages.value.push({
        role: 'system',
        content: `发生错误: ${error.value}`,
        timestamp: Date.now(),
      });
    } finally {
      isLoading.value = false;
    }
  };

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
    filterOption,
    value
  }
})
