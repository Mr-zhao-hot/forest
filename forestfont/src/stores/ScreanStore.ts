import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getScreen } from '@/api/FireApi.ts'
export const ScreenStore = defineStore('ScreenStore', () => {
    // 获取数据大屏数据
    interface Screen {
      smokeAvg:bigint | undefined,
      smokeMin:bigint  | undefined,
      smokeMax:bigint  | undefined,
      taskSuccessNum:number  | undefined,
      taskFailNum:number  | undefined,
    }


 // 获取数据大屏数据
    const ScreenTable = reactive<Screen>({
      smokeAvg: undefined,
      smokeMax: undefined,
      smokeMin: undefined,
      taskFailNum: undefined,
      taskSuccessNum: undefined,
    });

// 获取数据大屏数据
  const getScreenNum = async () => {
    const res = await getScreen(); // 假设 Screen() 返回 Promise
    ScreenTable.smokeAvg = res.data.data.smokeAvg;
    ScreenTable.smokeMin = res.data.data.smokeMin;
    ScreenTable.smokeMax = res.data.data.smokeMax;
    ScreenTable.taskFailNum = res.data.data.taskFailNum;
    ScreenTable.taskSuccessNum = res.data.data.taskSuccessNum;
    console.log(ScreenTable)
  };

  const columns = []

  const data = []



  return {
    columns,
    data,
    getScreenNum,
    ScreenTable
  }
})
