import { defineStore } from 'pinia'
import { ref } from 'vue'
import {AiControllerCar} from '@/api/AiApi' // 导入封装好的Ai函数
import type { SelectProps  } from 'ant-design-vue';
import { add } from '@/api/AreaApi.ts'
import { Axios } from 'axios'
interface Message {
  role: 'user' | 'assistant' | 'system'  // 增加system角色支持
  content?: string
  imageUrl?: string
  timestamp: number
  type?: string
}
export const useChatStore = defineStore('chat', () => {

  // const AiFire = async (content) => {
  //   // 提取核心内容的函数：过滤思考部分（```包裹内容）和换行符
  //   const extractCoreContent = (content) => {
  //     let isThinkSection = false;
  //     let coreContent = '';
  //     for (let i = 0; i < content.length; i++) {
  //       // 识别 ``` 思考段标记
  //       if (content[i] === '`' && i + 2 < content.length &&
  //         content[i+1] === '`' && content[i+2] === '`') {
  //         isThinkSection = !isThinkSection;
  //         i += 2; // 跳过剩余两个`
  //         continue;
  //       }
  //       // 保留非思考段内容，过滤换行符
  //       if (!isThinkSection && content[i] !== '\n') {
  //         coreContent += content[i];
  //       }
  //     }
  //     return coreContent;
  //   };
  //
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/chatFire`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json;charset=UTF-8',
  //         },
  //         body: JSON.stringify({ content }) // 传递外部传入的content参数
  //       }
  //     );
  //
  //     if (!response.ok) {
  //       throw new Error(`HTTP错误! 状态码: ${response.status}`);
  //     }
  //
  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder();
  //     let buffer = '';
  //     let fullContent = ''; // 存储完整的AI响应内容
  //     let isTyping = false;
  //     const typeSpeed = 50;
  //
  //     // 打字机函数：更新消息内容
  //     const typeWriter = async (currentContent, isFinal = false) => {
  //       if (isTyping) return;
  //       isTyping = true;
  //
  //       const filteredContent = extractCoreContent(currentContent);
  //       let currentIndex = 0;
  //
  //       // 查找最后一条助手消息
  //       const lastAssistantMsgIndex = messages.value.findLastIndex(
  //         msg => msg.role === 'assistant'
  //       );
  //
  //       // 确定要更新的消息索引
  //       const messageIndex = lastAssistantMsgIndex === -1
  //         ? messages.value.push({
  //         role: 'assistant',
  //         content: '',
  //         timestamp: Date.now()
  //       }) - 1
  //         : lastAssistantMsgIndex;
  //
  //       // 逐字符更新内容
  //       while (currentIndex < filteredContent.length) {
  //         // 避免过度更新响应式数组，每5个字符更新一次
  //         const endIndex = Math.min(currentIndex + 5, filteredContent.length);
  //         messages.value[messageIndex].content += filteredContent.substring(currentIndex, endIndex);
  //         currentIndex = endIndex;
  //         await new Promise(resolve => setTimeout(resolve, typeSpeed));
  //       }
  //
  //       isTyping = false;
  //     };
  //
  //     // 处理流式响应
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;
  //
  //       buffer += decoder.decode(value, { stream: true });
  //       const lines = buffer.split('\n');
  //       buffer = lines.pop() || '';
  //
  //       for (const line of lines) {
  //         if (line.startsWith('data: ')) {
  //           const dataStr = line.slice(6);
  //           if (dataStr === '[DONE]') {
  //             console.log('流传输完成');
  //             // 处理剩余内容
  //             if (fullContent) {
  //               await typeWriter(fullContent, true);
  //               fullContent = '';
  //             }
  //             break;
  //           }
  //           try {
  //             const data = JSON.parse(dataStr);
  //             if (data.content) {
  //               fullContent += data.content;
  //               // 每累积20个字符触发一次打字输出
  //               if (fullContent.length >= 20) {
  //                 await typeWriter(fullContent);
  //                 fullContent = '';
  //               }
  //             }
  //           } catch (e) {
  //             console.error('解析流数据错误:', e, '原始数据:', dataStr);
  //           }
  //         }
  //       }
  //     }
  //
  //     // 处理最后剩余的少量内容
  //     if (fullContent) {
  //       await typeWriter(fullContent, true);
  //     }
  //
  //     // 返回完整的过滤后内容
  //     return extractCoreContent(fullContent);
  //
  //   } catch (error) {
  //     console.error('AiFire函数错误:', error);
  //     // 错误时添加错误提示消息
  //     messages.value.push({
  //       role: 'assistant',
  //       content: '路线计算请求失败，请重试',
  //       timestamp: Date.now()
  //     });
  //     throw error; // 抛出错误，让handleChange捕获
  //   }
  // };

  const options = ref<SelectProps['options']>([
    { value: '模拟火灾', label: '模拟火灾' },
    { value: '小创助手', label: '小创助手' },
  ]);

  // const handleChange = async (content: string) => {
  //   console.log(`处理内容: ${content}`);
  //
  //   // 防止重复触发
  //   if (isLoading.value) {
  //     console.log("正在处理中，忽略重复调用");
  //     return;
  //   }
  //
  //   if (value && value.value === "模拟火灾") {
  //     isLoading.value = true;
  //     error.value = null;
  //
  //
  //
  //     try {
  //       // 1. 添加用户消息（保留原逻辑）
  //       const userMessage = {
  //         role: 'user' as const,
  //         content: "前方发生火灾请帮我开始接受云端数据进行计算路线",
  //         timestamp: Date.now(),
  //         type: 'text' as const
  //       };
  //
  //
  //       // 添加延迟发送功能 - 延迟1.5秒后再开始处理
  //       const delayTime = 2000; // 延迟时间，单位：毫秒
  //       console.log(`将在${delayTime/1000}秒后开始处理...`);
  //
  //       // 等待指定的延迟时间
  //       await new Promise(resolve => setTimeout(resolve, delayTime));
  //
  //
  //       const hasDuplicateUserMsg = messages.value.some(
  //         msg => msg.role === userMessage.role && msg.content === userMessage.content
  //       );
  //       if (!hasDuplicateUserMsg) {
  //         messages.value.push(userMessage);
  //       }
  //
  //       // 2. 自定义AI文本内容（不变）
  //       const fullAiText = "已接收云端火灾数据，计算结果如下：\n1. 火灾点定位：A1区域（经度XXX，纬度XXX）\n2. 推荐救援路线：主干道B2→C1快速通道→火灾点A1\n3. 调度车辆：消防车D1、救援车B2、清障车T1已指派";
  //
  //       // 关键修复1：用响应式对象存储AI文本消息
  //       const aiTextMessage = ref({
  //         role: 'assistant' as const,
  //         content: '', // 初始为空
  //         timestamp: Date.now(),
  //         type: 'text' as const
  //       });
  //       // 将响应式对象的value推入messages数组
  //       messages.value.push(aiTextMessage.value);
  //
  //       // 关键修复2：调整打字速度
  //       const typingSpeed = 80; // 每个字符延迟80毫秒
  //       let currentText = '';
  //
  //       // 3. 逐字生成打字效果
  //       for (let i = 0; i < fullAiText.length; i++) {
  //         currentText += fullAiText[i];
  //         aiTextMessage.value.content = currentText;
  //         await new Promise(resolve => setTimeout(resolve, typingSpeed));
  //       }
  //
  //       // 4. 打字完成后显示图片
  //       const customImageUrl = 'http://192.168.1.101:8080/img/map2.png';
  //       const imageTimer = setTimeout(() => {
  //         const aiImageMessage = {
  //           role: 'assistant' as const,
  //           imageUrl: customImageUrl,
  //           timestamp: Date.now(),
  //           type: 'image' as const
  //         };
  //         const hasDuplicateImage = messages.value.some(
  //           msg => msg.role === aiImageMessage.role && msg.imageUrl === aiImageMessage.imageUrl
  //         );
  //         if (!hasDuplicateImage) {
  //           messages.value.push(aiImageMessage);
  //         }
  //         clearTimeout(imageTimer);
  //       }, 1000);
  //
  //       AiControllerCar(1);
  //
  //     } catch (err) {
  //       error.value = err instanceof Error ? err.message : '未知的错误';
  //       messages.value.push({
  //         role: 'system' as const,
  //         content: `错误: ${error.value}`,
  //         timestamp: Date.now(),
  //         type: 'error' as const
  //       });
  //     } finally {
  //       isLoading.value = false;
  //     }
  //   }
  // };

  const handleChange = async (content: string) => {
    console.log(`selected ${value.value}`);

    // 防止重复触发，避免消息混乱
    if (isLoading.value || value.value !== "模拟火灾") {
      if (isLoading.value) console.log("正在处理中，忽略重复调用");
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      messages.value.push({
        role: 'user' as const,
        content: "前方发生火灾请帮我开始接受云端数据进行计算路线",
        timestamp: Date.now(),
        type: 'text'
      });

      const Param = [
        { firePoint: 'A1', rescueVehicle: 'B2', inspectionVehicle: 'C1', fireTruck: 'D1', wrecker: 'T1' }, // 正常路线参数
        { firePoint: 'A2', rescueVehicle: 'B3', inspectionVehicle: 'C2', fireTruck: 'D3', wrecker: 'T2' }  // 障碍物路线参数
      ];
      const imageUrls = [
        'http://192.168.1.101:8080/img/map2.png',
        'http://192.168.1.101:8080/img/map1.png'
      ];

      // 打字机效果实现函数
      const typeWriterEffect = (messageIndex: number, fullText: string, speed = 50) => {
        return new Promise<void>((resolve) => {
          let text = '';
          let i = 0;

          const typing = () => {
            if (i < fullText.length) {
              text += fullText.charAt(i);
              messages.value[messageIndex].content = text;
              i++;
              setTimeout(typing, speed);
            } else {
              resolve();
            }
          };

          typing();
        });
      };

      // 2. 处理第一条消息：规划路线（打字机效果+10秒后补第一张图）
      const firstMessage = "已收到火灾报警，正在规划最优救援路线：\n1. 推荐主路线：消防局→A1火灾点，途径B2、C1路段\n2. 调度车辆：消防车D1、救援车B2\n3. 预计抵达时间：8分钟\n4.";

      // 添加初始空消息用于打字机效果
      const assistantMsgIndex = messages.value.push({
        role: 'assistant' as const,
        content: '', // 初始为空，将通过打字机效果填充
        timestamp: Date.now(),
        type: 'text'
      }) - 1;

      // 执行打字机效果
      await typeWriterEffect(assistantMsgIndex, firstMessage);

      // 延迟10秒后，给第一条消息补第一张图
      setTimeout(() => {
        messages.value[assistantMsgIndex].imageUrl = imageUrls[0];
        messages.value[assistantMsgIndex].type = 'text-image';
      }, 1000);
      add(Param[0]);


      // 3. 处理第二条消息：道路异常重新规划（2秒后触发，打字机效果+1秒后补第二张图）
      setTimeout(async () => {
        const secondMessage = "紧急通知：检测到原路线C1段出现交通事故障碍物，已立即重新规划路线：\n1. 新路线调整为：消防局→A1火灾点，途径B3→C2路段\n2. 调度车辆调整为：消防车D3、救援车B3、清障车T2\n3. 预计抵达时间：13分钟（较原计划延长5分钟）\n4. 已通知现场人员做好等待准备";

        // 添加第二条空消息用于打字机效果
        const updateMsgIndex = messages.value.push({
          role: 'assistant' as const,
          content: '', // 初始为空
          timestamp: Date.now(),
          type: 'text'
        }) - 1;

        // 执行打字机效果
        await typeWriterEffect(updateMsgIndex, secondMessage);

        // 延迟1秒后，给第二条消息补第二张图
        setTimeout(() => {
          messages.value[updateMsgIndex].imageUrl = imageUrls[1];
          messages.value[updateMsgIndex].type = 'text-image';
        }, 1000);

        add(Param[1]);
        AiControllerCar(1);
      }, 2000);


    } catch (err) {
      // 错误处理
      error.value = err instanceof Error ? err.message : '未知的错误';
      messages.value.push({
        role: 'assistant' as const,
        content: `操作失败：${error.value}`,
        timestamp: Date.now(),
        type: 'error'
      });
    } finally {
      isLoading.value = false;
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
    const extractCoreContent = (content: string) => {
      let isThinkSection = false;
      let coreContent = '';

      for (let i = 0; i < content.length; i++) {
        // 检测```标记
        if (content[i] === '`' && i + 2 < content.length &&
          content[i+1] === '`' && content[i+2] === '`') {
          isThinkSection = !isThinkSection;
          i += 2;
          continue;
        }

        if (!isThinkSection && content[i] !== '\n') {
          coreContent += content[i];
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
      const response  = await fetch(
        'http://localhost:5000/api/chat',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({content})
        }
      )


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let messageIndex = -1;
      let currentContent = ''; // 当前正在处理的内容
      const typeSpeed = 50;
      let isTyping = false;

      // 打字机函数：只处理新增内容
      const typeWriter = async (newContent: string) => {
        if (isTyping) return;
        isTyping = true;

        if (messageIndex === -1) {
          messageIndex = messages.value.push({
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
          }) - 1;
        }

        const targetContent = messages.value[messageIndex].content + newContent;
        while (messages.value[messageIndex].content.length < targetContent.length) {
          messages.value[messageIndex].content = targetContent.substring(
            0,
            messages.value[messageIndex].content.length + 1
          );
          await new Promise(resolve => setTimeout(resolve, typeSpeed));
        }

        isTyping = false;
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.toLowerCase().startsWith('data:')) {
            const dataStr = trimmedLine.slice(5).trim();
            if (dataStr === '[DONE]') {
              console.log('Stream completed');
              break;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.content) {
                const filtered = extractCoreContent(data.content);
                currentContent += filtered;
                // 可以调整触发打字机的时机，比如内容长度达到一定值
                await typeWriter(filtered);
              }
            } catch (e) {
              console.error('解析失败，原始数据:', dataStr, '错误:', e);
            }
          }
        }
      }

      if (messageIndex === -1) {
        messages.value.push({
          role: 'assistant',
          content: '我没有收到任何请求，python服务是否已经启动',
          timestamp: Date.now(),
        });
      }

    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知的错误';
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

// const response = await fetch(
//   'http://localhost:5000/api/chat',
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ content })
//   }
// );
