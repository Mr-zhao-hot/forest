import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { getScreen } from '@/api/FireApi.ts'
import { selectPageList } from '@/api/EquipmentApi.ts'

export const ScreenStore = defineStore('ScreenStore', () => {
  // 获取数据大屏数据
  interface Screen {
    smokeAvg: number | undefined,
    smokeMin: number | undefined,
    smokeMax: number | undefined,
    taskSuccessNum: number | undefined,
    taskFailNum: number | undefined,
  }

  const ScreenTable = reactive<Screen>({
    smokeAvg: undefined,
    smokeMax: undefined,
    smokeMin: undefined,
    taskFailNum: undefined,
    taskSuccessNum: undefined,
  });

  // 添加一个方法来更新烟雾浓度数据
  const updateSmokeData = (data: {
    smokeAvg: number,
    smokeMin: number,
    smokeMax: number,
    taskFailNum: number,
    taskSuccessNum: number
  }) => {
    ScreenTable.smokeAvg = data.smokeAvg;
    ScreenTable.smokeMin = data.smokeMin;
    ScreenTable.smokeMax = data.smokeMax;
    ScreenTable.taskFailNum = data.taskFailNum;
    ScreenTable.taskSuccessNum = data.taskSuccessNum;
  };

  // 获取数据大屏数据
  const getScreenNum = async () => {
    try {
      const res = await getScreen();
      if (res.data?.data) {
        updateSmokeData(res.data.data);
      }
    } catch (error) {
      console.error('获取大屏数据失败:', error);
    }
  };

  // 设置定时刷新
  const setupAutoRefresh = (interval = 30000) => { // 默认30秒刷新一次
    const timer = setInterval(getScreenNum, interval);
    return () => clearInterval(timer);
  };

  // 其他代码保持不变...
  interface equipmentTablePageInterface {
    id?: number | undefined
    equipmentName: string
    status: string
    useName: string
  }

  const equipmentTablePage = reactive<equipmentTablePageInterface>({
    equipmentName: '',
    status: '',
    useName: '',
  })

  const columns = [
    { title: '设备名', dataIndex: 'equipmentName', key: 'equipmentName' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '使用人', dataIndex: 'useName', key: 'useName' },
  ]

  const pagination = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: ['10', '20', '30', '100'],
  })

  const data = ref<equipmentTablePageInterface[]>([])

  const EquipmentSelectList = async () => {
    selectPageList({
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      ...equipmentTablePage,
    }).then((res) => {
      data.value = Array.isArray(res.data?.data.list)
        ? res.data.data.list.map((item: any, index: number) => ({
          ...item,
          key: item.classId || index,
        }))
        : []
      pagination.total = res.data?.total || 0
    })
  }

  return {
    columns,
    data,
    getScreenNum,
    ScreenTable,
    EquipmentSelectList,
    setupAutoRefresh,
    updateSmokeData
  }
})
