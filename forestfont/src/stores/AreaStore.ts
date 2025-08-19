import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { add, deleteById, deletes, selectById, selectPage, update } from '@/api/AreaApi.ts'
import { message } from 'ant-design-vue'

export const AreaStore = defineStore('AreaStore', () => {
  // 分页查询接口
  interface AreaPageSelect{
    id?: number,
    firePoint:string, // 起火点
    rescueVehicle:string // 救援车
    inspectionVehicle:string // 巡检车
    fireTruck:string // 消防车
    wrecker:string // 清障车
    createdAt:string
    updatedAt:string
  }
  const AreaPageSelect = reactive<AreaPageSelect>({
    firePoint: '',
    rescueVehicle: '',
    inspectionVehicle: '',
    fireTruck: '',
    wrecker: '',
    createdAt: '',
    updatedAt: ''
  })

  // 新增 删除 修改 接口
  interface AreaTable{
    open: boolean
    title: string
    AreaTable: {
      id?: number | undefined,
      firePoint:string, // 起火点
      rescueVehicle:string // 救援车
      inspectionVehicle:string // 巡检车
      fireTruck:string // 消防车
      wrecker:string // 清障车
      createdAt:string
      updatedAt:string
    }
  }

  const AreaTable = reactive<AreaTable>({
    open: false,
    title: '',
    AreaTable: {
      id:undefined,
      firePoint: '',
      rescueVehicle: '',
      inspectionVehicle: '',
      fireTruck: '',
      wrecker: '',
      createdAt: '',
      updatedAt: '',
    },
  })

  // 分页配置
  const pagination = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: ['10', '20', '30', '100'],
  })

  // ========== 删除功能 ==========
  const tipVisible = ref(false) // 删除确认框可见性
  const deleteMode = ref<'single' | 'batch'>('single') // 删除模式
  const currentDeleteId = ref<number | null>() // 当前删除ID
  const selectedRowKeys = ref<number[]>([]) // 多选ID

  // 表格数据
  const data = ref<AreaPageSelect[]>([])

  // 表单数据
  const columns = [
    { title: '起火点坐标', dataIndex: 'firePoint', key: 'keyPassword' },
    { title: '救援车坐标', dataIndex: 'rescueVehicle', key: 'rescueVehicle' },
    { title: '巡检车坐标', dataIndex: 'inspectionVehicle', key: 'inspectionVehicle' },
    { title: '消防车坐标', dataIndex: 'fireTruck', key: 'fireTruck' },
    { title: '清障车坐标', dataIndex: 'wrecker', key: 'wrecker' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
    { title: '操作', key: 'action' },
  ]

  const rules = {
    keyName: [
      { required: true, message: '请输入秘钥名称' },
      { max: 50, message: '秘钥名称不能超过50个字符' },
    ],
    keyCreateName: [
      { required: true, message: '请输入创建者名称' },
      { max: 20, message: '创建者名称不能超过20个字符' },
    ],
  }

  // 查询按钮
  const AreaSelectList = async () => {
    selectPage({
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      ...AreaPageSelect,
    }).then((res) => {
      data.value = Array.isArray(res.data?.data.list)
        ? res.data.data.list.map((item: any, index: number) => ({
          ...item,
          key: item.id || index,  // 使用更可靠的id字段
        }))
        : []
      pagination.total = res.data?.total || 0
    })
  }

  // 多选变化
  const onSelectChange = (keys: number[]) => {
    selectedRowKeys.value = keys
  }
  // 重置
  const cleanTable = () => {
    Object.assign(AreaPageSelect, {
      firePoint: '',
      rescueVehicle: '',
      inspectionVehicle: '',
      fireTruck: '',
      wrecker: '',
      createdAt: '',
      updatedAt: '',
    })
    AreaSelectList()
  }

  // 批量删除
  const triggerBatchDelete = () => {
    if (selectedRowKeys.value.length === 0) {
      message.warning('请至少选择一项')
      return
    }
    deleteMode.value = 'batch'
    tipVisible.value = true
  }
  // 分页变化处理
  const handleTableChange = (pag: { current: number; pageSize: number }) => {
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
    AreaSelectList()
  }

  // 打开编辑弹窗
  const editItem = async (record: AreaPageSelect) => {
    AreaTable.title = '修改秘钥'
    AreaTable.open = true
    if (record.id != null) {
      await keySelectByIds(record.id)
    }
  }

  // 触发删除
  const triggerDelete = (record: AreaPageSelect) => {
    deleteMode.value = 'single'
    currentDeleteId.value = record.id
    tipVisible.value = true
  }

  // 新增按钮
  const treeAddButton = () => {
    AreaTable.open = true
    AreaTable.title = '新增秘钥'
    AreaTable.AreaTable = {
      firePoint: '',
      rescueVehicle: '',
      inspectionVehicle: '',
      fireTruck: '',
      wrecker: '',
      createdAt: '',
      updatedAt: ''
    }
  }

  const CancelButton = () => {
    AreaTable.open = false
  }

  // 查询单个树种
  const keySelectByIds = async (id: number) => {
    try {
      const res = await selectById(id)
      if (res.data) {
        AreaTable.AreaTable = {
          id: res.data?.data.id,
          firePoint: res.data?.data.firePoint,
          rescueVehicle: res.data?.data.rescueVehicle,
          inspectionVehicle: res.data?.data.inspectionVehicle,
          fireTruck: res.data?.data.fireTruck,
          wrecker: res.data?.data.wrecker,
          createdAt: res.data?.data.createdAt,
          updatedAt: res.data?.data.createdAt
        }
      }
    } catch (error: unknown) {
      message.error('获取秘钥详情失败' + error.message)
    }
  }


  // 执行删除
  const executeDelete = async () => {
    try {
      if (deleteMode.value === 'single') {
        await deleteById(currentDeleteId.value!)
        message.success('删除成功')
        currentDeleteId.value = null // 添加这行
      } else {
        await deletes(selectedRowKeys.value!)
        message.success(`已删除 ${selectedRowKeys.value.length} 项`)
      }
      await AreaSelectList()
      selectedRowKeys.value = []
    } catch (error) {
      message.error('删除失败')
    } finally {
      tipVisible.value = false
    }
  }

  // 提交表单
  const onFinish = () => {
    if (AreaTable.title === '新增秘钥') {
      add(AreaTable.AreaTable).then(() => {
        message.success('新增成功')
        AreaTable.open = false
        AreaSelectList()
      })
    } else if (AreaTable.title === '修改秘钥') {
      update(AreaTable.AreaTable.id!, AreaTable.AreaTable).then(() => {
        message.success('修改成功')
        AreaTable.open = false
        AreaSelectList()
      })
    }
  }

  return {
    onFinish,
    executeDelete,
    keySelectByIds,
    CancelButton,
    treeAddButton,
    triggerDelete,
    editItem,
    handleTableChange,
    triggerBatchDelete,
    cleanTable,
    onSelectChange,
    AreaSelectList,
    rules,
    columns,
    data,
    tipVisible,
    deleteMode,
    currentDeleteId,
    selectedRowKeys,
    pagination,
    AreaTable,
    AreaPageSelect
  }
})
