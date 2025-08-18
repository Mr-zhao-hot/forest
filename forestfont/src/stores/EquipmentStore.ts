import { defineStore } from 'pinia'
import {
  equipmentAdd,
  equipmentDelete,
  equipmentDeletes,
  selectPageList,
  equipmentUpdate,
  equipmentSelectById,
} from '@/api/EquipmentApi.ts'
import { message } from 'ant-design-vue'
import { ref, reactive } from 'vue'
export const equipmentStore = defineStore('equipmentStore', () => {
  // 表单数据(删除 新增 批量删 新增)
  interface equipmentInterface {
    open: boolean
    title: string
    equipmentTable: {
      id?: number | undefined
      equipmentName: string
      status: string
      useName: string
      remark: string
    }
  }

  const equipmentTable = reactive<equipmentInterface>({
    open: false,
    title: '',
    equipmentTable: {
      equipmentName: '',
      status: '',
      useName: '',
      remark: '',
    },
  })

  // 分页查询
  interface equipmentTablePageInterface {
    id?: number | undefined
    equipmentName: string
    status: string
    useName: string
    remark: string
    createTime: string
    updateTime: string
  }
  const equipmentTablePage = reactive<equipmentTablePageInterface>({
    equipmentName: '',
    status: '',
    useName: '',
    remark: '',
    createTime: '',
    updateTime: '',
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
  const selectedRowKeys = ref<(string | number)[]>([]) // 多选ID

  // 触发删除
  const triggerDelete = (record: equipmentTablePageInterface) => {
    deleteMode.value = 'single'
    currentDeleteId.value = record.id
    tipVisible.value = true
  }

  // 查询按钮
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

  // 批量删除
  const triggerBatchDelete = () => {
    if (selectedRowKeys.value.length === 0) {
      message.warning('请至少选择一项')
      return
    }
    deleteMode.value = 'batch'
    tipVisible.value = true
  }

  // 多选变化
  const onSelectChange = (keys: (string | number)[]) => {
    selectedRowKeys.value = keys
  }

  // 分页变化处理
  const handleTableChange = (pag: { current: number; pageSize: number }) => {
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
    EquipmentSelectList()
  }

  // 表格数据
  const data = ref<equipmentTablePageInterface[]>([])
  const columns = [
    { title: '设备名', dataIndex: 'equipmentName', key: 'equipmentName' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '使用人', dataIndex: 'useName', key: 'useName' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '设备更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    { title: '操作', key: 'action' },
  ]

  // 新增按钮
  const EquipmentAddButton = () => {
    equipmentTable.open = true
    equipmentTable.title = '新增班级'
    Object.assign(equipmentTable.equipmentTable, {
      equipmentName: '',
      status: '',
      useName: '',
      remark: '',
      createTime: '',
      updateTime: '',
    })
  }

  // 重置
  const cleanTable = () => {
    Object.assign(equipmentTable, {
      equipmentName: '',
      status: '',
      useName: '',
      remark: '',
    })
    EquipmentSelectList()
  }

  // 执行删除
  const executeDelete = async () => {
    try {
      if (deleteMode.value === 'single') {
        await equipmentDelete(currentDeleteId.value!)
        message.success('删除成功')
      } else {
        await equipmentDeletes(selectedRowKeys.value)
        message.success(`已删除 ${selectedRowKeys.value.length} 项`)
      }
      await EquipmentSelectList()
      selectedRowKeys.value = []
    } catch (error) {
      message.error('删除失败')
    } finally {
      tipVisible.value = false
    }
  }

  // 提交表单
  const onFinish = () => {
    if (equipmentTable.title == '新增班级') {
      equipmentAdd(equipmentTable.equipmentTable).then(() => {
        message.success('新增成功')
        equipmentTable.open = false
        EquipmentSelectList()
      })
    } else if (equipmentTable.title == '修改班级') {
      equipmentUpdate(equipmentTable.equipmentTable.id!, equipmentTable.equipmentTable).then(() => {
        message.success('修改成功')
        equipmentTable.open = false
        EquipmentSelectList()
      })
    }
  }
  // 查询单个树种
  const EquipmentManagerSelectByIds = (id: number) => {
    return equipmentSelectById(id).then((res) => {
      equipmentTable.equipmentTable = {
        id: res.data?.data.id,
        equipmentName: res.data?.data?.equipmentName,
        status: res.data?.data?.status,
        useName: res.data?.data?.useName,
        remark: res.data?.data?.remark,
      }
      console.log(equipmentTable.equipmentTable)
    })
  }

  // 打开编辑弹窗
  const editItem = async (record: equipmentTablePageInterface) => {
    equipmentTable.title = '修改班级'
    if (record.id != null) {
      await EquipmentManagerSelectByIds(record.id)
    }
    equipmentTable.open = true
  }

  const treeCancelButton = () => {
    equipmentTable.open = false
  }

  const rules = {
    equipmentName: [
      { required: true, message: '设备名称不能为空', trigger: 'blur' },
      { max: 50, message: '设备名称不能超过50个字符', trigger: 'blur' },
    ],
    status: [{ required: true, message: '请选择设备状态', trigger: 'change' }],
    useName: [
      { required: true, message: '使用人不能为空', trigger: 'blur' },
      { max: 20, message: '使用人不能超过20个字符', trigger: 'blur' },
    ],
    remark: [{ max: 200, message: '备注不能超过200个字符', trigger: 'blur' }],
  }

  return {
    equipmentTable,
    triggerDelete,
    triggerBatchDelete,
    onSelectChange,
    handleTableChange,
    columns,
    EquipmentAddButton,
    cleanTable,
    executeDelete,
    onFinish,
    EquipmentManagerSelectByIds,
    treeCancelButton,
    editItem,
    rules,
    tipVisible,
    deleteMode,
    currentDeleteId,
    selectedRowKeys,
    data,
    pagination,
    EquipmentSelectList,
    equipmentTablePage,
  }
})
