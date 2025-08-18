import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import {
  forestManagerSelectById,
  // forestManagerSelects,
  treeAdd,
  treeUpdate,
  forestManagerDeleteTree,
  forestManagerdeletesTree,
  forestManagerpageSelectTree,
} from '@/api/TreeSpecise.ts'
import { message } from 'ant-design-vue'

export const treeStore = defineStore('treeStore', () => {
  // 表单数据
  interface treeTable {
    open: boolean
    title: string
    treeTable: {
      id?: number | undefined
      attachmentName: string
      scientificName: string
      family: string | undefined
      protectionLevel: string | undefined
      height: number | undefined
      diameter: number | undefined
      lifespan: number | undefined
      growthEnvironment: string
      uses: string
    }
  }

  const treeTable = reactive<treeTable>({
    open: false,
    title: '',
    treeTable: {
      attachmentName: '',
      scientificName: '',
      family: undefined,
      protectionLevel: undefined,
      height: undefined,
      diameter: undefined,
      lifespan: undefined,
      growthEnvironment: '',
      uses: '',
    },
  })

  // 分页查询
  interface treeTablesPage {
    id?: number | undefined
    attachmentName: string
    scientificName: string
    family: string
    protectionLevel: string
  }

  const treeTablesPage = reactive<treeTablesPage>({
    attachmentName: '',
    scientificName: '',
    family: '',
    protectionLevel: '',
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

  // 查询按钮
  const treeSelectList = async () => {
    forestManagerpageSelectTree({
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      ...treeTablesPage,
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

  // 新增按钮
  const treeAddButton = () => {
    treeTable.open = true
    treeTable.title = '新增班级'
    Object.assign(treeTable.treeTable, {
      attachmentName: '',
      scientificName: '',
      family: undefined,
      protectionLevel: undefined,
      height: undefined,
      diameter: undefined,
      lifespan: undefined,
      growthEnvironment: '',
      uses: '',
    })
  }

  // 重置
  const cleanTable = () => {
    Object.assign(treeTablesPage, {
      attachmentName: '',
      scientificName: '',
      family: undefined,
      protectionLevel: undefined,
    })
    treeSelectList()
  }

  // 触发删除
  const triggerDelete = (record: treeTablesPage) => {
    deleteMode.value = 'single'
    currentDeleteId.value = record.id
    tipVisible.value = true
  }

  // 执行删除
  const executeDelete = async () => {
    try {
      if (deleteMode.value === 'single') {
        await forestManagerDeleteTree(currentDeleteId.value!)
        message.success('删除成功')
      } else {
        await forestManagerdeletesTree(selectedRowKeys.value)
        message.success(`已删除 ${selectedRowKeys.value.length} 项`)
      }
      await treeSelectList()
      selectedRowKeys.value = []
    } catch (error) {
      message.error('删除失败')
    } finally {
      tipVisible.value = false
    }
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
    treeSelectList()
  }

  // 提交表单
  const onFinish = () => {
    if (treeTable.title == '新增班级') {
      treeAdd(treeTable.treeTable).then(() => {
        message.success('新增成功')
        treeTable.open = false
        treeSelectList()
      })
    } else if (treeTable.title == '修改班级') {
      treeUpdate(treeTable.treeTable.id!, treeTable.treeTable).then(() => {
        message.success('修改成功')
        treeTable.open = false
        treeSelectList()
      })
    }
  }

  // 查询单个树种
  const forestManagerSelectByIds = (id: number) => {
    return forestManagerSelectById(id).then((res) => {
      treeTable.treeTable = {
        id: res.data?.data.id,
        attachmentName: res.data?.data.attachmentName,
        scientificName: res.data?.data.scientificName,
        family: res.data?.data.family,
        protectionLevel: res.data?.data.protectionLevel,
        height: res.data.data?.height,
        diameter: res.data.data?.diameter,
        lifespan: res.data.data?.lifespan,
        growthEnvironment: res.data.data?.growthEnvironment,
        uses: res.data.data?.uses,
      }
      console.log(treeTable.treeTable)
    })
  }

  // 打开编辑弹窗
  const editItem = async (record: treeTablesPage) => {
    treeTable.title = '修改班级'
    if (record.id != null) {
      await forestManagerSelectByIds(record.id)
    }
    treeTable.open = true
  }

  const treeCancelButton = () => {
    treeTable.open = false
  }

  // 表格数据
  const data = ref<treeTable[]>([])
  // 表单数据
  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '树种名称', dataIndex: 'attachmentName', key: 'attachmentName' },
    { title: '学名', dataIndex: 'scientificName', key: 'scientificName' },
    { title: '所属科', dataIndex: 'family', key: 'family' },
    { title: '保护级别', dataIndex: 'protectionLevel', key: 'protectionLevel' },
    { title: '高度(m)', dataIndex: 'height', key: 'height' },
    { title: '直径(cm)', dataIndex: 'diameter', key: 'diameter' },
    { title: '寿命(年)', dataIndex: 'lifespan', key: 'lifespan' },
    { title: '生长环境', dataIndex: 'growthEnvironment', key: 'growthEnvironment' },
    { title: '用途', dataIndex: 'uses', key: 'uses' },
    { title: '操作', key: 'action' },
  ]

  const rules = {
    attachmentName: [
      { required: true, message: '请输入树种名称' },
      { max: 50, message: '名称不能超过50个字符' },
    ],
    scientificName: [{ required: true, message: '请输入学名' }],
    family: [{ required: true, message: '请输入所属科' }],
    protectionLevel: [{ required: true, message: '请输入保护等级' }],
    height: [
      { type: 'number', message: '高度必须为数字' },
      { required: true, message: '请输入高度' },
    ],
    diameter: [
      { type: 'number', message: '直径必须为数字' },
      { required: true, message: '请输入直径' },
    ],
    lifespan: [
      { type: 'number', message: '寿命必须为数字' },
      { required: true, message: '请输入寿命' },
    ],
  }

  return {
    treeAddButton,
    treeSelectList,
    triggerBatchDelete,
    cleanTable,
    tipVisible,
    deleteMode,
    currentDeleteId,
    selectedRowKeys,
    columns,
    data,
    onSelectChange,
    pagination,
    handleTableChange,
    editItem,
    triggerDelete,
    executeDelete,
    treeTablesPage,
    treeTable,
    onFinish,
    treeCancelButton,
    rules,
  }
})
