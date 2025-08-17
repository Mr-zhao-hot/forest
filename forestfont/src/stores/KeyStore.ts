import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  keySelectById,
  KeyAdd,
  KeyDelete,
  KeyDeletes,
  KeyUpdate,
  KeySelectPage,
} from '@/api/KeyApi.ts'
import { message } from 'ant-design-vue'

export const KeyStore = defineStore('KeyStore', () => {
  // 分页查询表单
  interface keyInterface {
    id?: number | undefined
    keyName: string
    keyPassword: string
    keyCreateName: string
  }

  const keyTable = reactive<keyInterface>({
    keyName: '',
    keyPassword: '',
    keyCreateName: '',
  })

  // 新增秘钥接口
  interface addKeyInterface{
    open: boolean,
    title: string,
    addKeyTables:{
      id?: number | undefined
      keyName: string,
      keyPassword: string,
      keyCreateName: string,
      createdAt:string,
      updatedAt:string,
    }
  }

  const addKeyTable = reactive<addKeyInterface>({
    open: false,
    title: '',
    addKeyTables:{
      id:undefined,
      keyName: '',
      keyPassword: '',
      keyCreateName: '',
      createdAt: '',
      updatedAt: '',
    }
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
  const selectedRowKeys = ref<(number)[]>([]) // 多选ID

  // 表格数据
  const data = ref<keyInterface[]>([])

  // 表单数据
  const columns = [
    { title: '秘钥名', dataIndex: 'keyName', key: 'keyName' },
    { title: '秘钥密码', dataIndex: 'keyPassword', key: 'keyPassword' },
    { title: '创建者', dataIndex: 'keyCreateName', key: 'keyCreateName' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '修改时间', dataIndex: 'updatedAt', key: 'updatedAt' },
    { title: '操作', key: 'action' },
  ]

  // 查询按钮
  const KeySelectList = async () =>{
    KeySelectPage({
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      ...keyTable
    }).then((res) => {
      data.value = Array.isArray(res.data?.data.list)
        ? res.data.data.list.map((item: any, index: number) => ({
          ...item,
          key: item.classId || index
        })) : [];
      pagination.total = res.data?.total || 0;
    });
  }

  // 多选变化
  const onSelectChange = (keys: (number)[]) => {
    selectedRowKeys.value = keys
  }

  // 重置
  const cleanTable = () => {
    Object.assign(keyTable, {
      keyName: '',
      keyPassword: '',
      keyCreateName: ''
    });
    KeySelectList();
  }

  // 批量删除
  const triggerBatchDelete = () => {
    if (selectedRowKeys.value.length === 0) {
      message.warning('请至少选择一项');
      return;
    }
    deleteMode.value = 'batch';
    tipVisible.value = true;
  }

  // 分页变化处理
  const handleTableChange = (pag: { current: number; pageSize: number }) => {
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
    KeySelectList()
  }

  // 打开编辑弹窗
  const editItem = async (record: keyInterface) => {
    addKeyTable.title = "修改秘钥";
    addKeyTable.open = true;
    if (record.id != null) {
      await keySelectByIds(record.id);
    }
  }

  const treeCancelButton = () => {
    addKeyTable.open = false;
  };

  // 触发删除
  const triggerDelete = (record: keyInterface) => {
    deleteMode.value = 'single'
    currentDeleteId.value = record.id;
    tipVisible.value = true
  }

  // 新增按钮
  const treeAddButton = () => {
    addKeyTable.open = true;
    addKeyTable.title = "新增秘钥";
    addKeyTable.addKeyTables = {
      id: undefined,
      keyName: '',
      keyPassword: '',
      keyCreateName: '',
      createdAt: '',
      updatedAt: '',
    };
  }
  const CancelButton = () => {
    addKeyTable.open = false;
  };


  // 查询单个树种
  const keySelectByIds = async (id: number) => {
    try {
      const res = await keySelectById(id);
      if (res.data) {
        addKeyTable.addKeyTables = {
          id: res.data?.data.id,
          keyName: res.data?.data.keyName,
          keyPassword: res.data?.data.keyPassword,
          keyCreateName: res.data?.data.keyCreateName,
          createdAt: res.data?.data.createdAt,
          updatedAt: res.data?.data.updatedAt,
        };
      }
      console.log(addKeyTable.addKeyTables);
    } catch (error:unknown) {
      message.error('获取秘钥详情失败'+error.message);
    }
  }

  // 执行删除
  const executeDelete = async () => {
    try {
      if (deleteMode.value === 'single') {
        await KeyDelete(currentDeleteId.value!);
        message.success('删除成功');
        currentDeleteId.value = null; // 添加这行
      } else {
        await KeyDeletes(selectedRowKeys.value!);
        message.success(`已删除 ${selectedRowKeys.value.length} 项`);
      }
      await KeySelectList();
      selectedRowKeys.value = [];
    } catch (error) {
      message.error('删除失败');
    } finally {
      tipVisible.value = false;
    }
  }
  const rules = {
    keyName: [
      { required: true, message: '请输入秘钥名称' },
      { max: 50, message: '秘钥名称不能超过50个字符' }
    ],
    keyCreateName: [
      { required: true, message: '请输入创建者名称' },
      { max: 20, message: '创建者名称不能超过20个字符' }
    ]
  }
  // 提交表单
  const onFinish = () => {
    if (addKeyTable.title === '新增秘钥') {
      KeyAdd(addKeyTable.addKeyTables).then(() => {
        message.success("新增成功");
        addKeyTable.open = false;
        KeySelectList();
      });
    } else if (addKeyTable.title === '修改秘钥') {
      KeyUpdate(
        addKeyTable.addKeyTables.id!,
        addKeyTable.addKeyTables
      ).then(() => {
        message.success("修改成功");
        addKeyTable.open = false;
        KeySelectList();
      });
    }
  };



  // 高德地图Api
  const GDApi = ref<string>();
  const GDApiSelect =() =>{
    keySelectById(3).then((res) =>{
      GDApi.value =  res.data?.data.keyPassword
    })
  }

  // 高德天气api
  const WDapi = ref<string>();
  const WDapiSelect =() =>{
    keySelectById(3).then((res) =>{
      WDapi.value =  res.data?.data.keyPassword
    })
  }



  return {
    tipVisible,
    deleteMode,
    currentDeleteId,
    selectedRowKeys,
    KeySelectList,
    keyTable,
    onSelectChange,
    cleanTable,
    triggerBatchDelete,
    treeAddButton,
    columns,
    data,
    pagination,
    handleTableChange,
    editItem,
    triggerDelete,
    treeCancelButton,
    CancelButton,
    addKeyTable,
    executeDelete,
    keySelectByIds,
    onFinish,
    rules,
    GDApiSelect,
    GDApi,
    WDapiSelect,
    WDapi
  }
})
