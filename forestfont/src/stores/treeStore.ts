import {defineStore} from "pinia";
import {reactive , ref} from "vue";

export const treeStore = defineStore('treeStore', () => {
  // 搜素框表
  interface tree{
    treeName: string,
    scientificName: string,
    affiliation:number|undefined,
    protect:number|undefined,
  }

  const tree = reactive<tree>({
    treeName: "",
    scientificName: "",
    affiliation: undefined,
    protect:undefined,
  })

  // 表单数据
  interface treeTable{
    id:number|undefined,
    treeName: string,
    scientificName: string,
    affiliation:number|undefined,
    protect:number|undefined,
    height:number|undefined,
    width:number|undefined,
    life:number|undefined,
    environment:string,
    use:string,
  }

  // 分页配置
  const pagination = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: ['10', '20', '30', '100'],
  });

  // ========== 删除功能 ==========
  const tipVisible = ref(false); // 删除确认框可见性
  const deleteMode = ref<'single' | 'batch'>('single'); // 删除模式
  const currentDeleteId = ref<number | null>(); // 当前删除ID
  const selectedRowKeys = ref<(string | number)[]>([]); // 多选ID

  // 新增按钮
  const treeAddButton =() =>{

  }

  // 查询按钮
  const treeSelectList =() =>{}

  // 批量删除
  const triggerBatchDelete = () =>{}
  // 重置
  const cleanTable = () =>{

  }
  // 打开编辑弹窗
  const editItem = async () => {

  };
  // 触发删除
  const triggerDelete = () => {
    deleteMode.value = 'single';
    // currentDeleteId.value = record.classId;
    tipVisible.value = true;
  };

  // 执行删除
  const executeDelete = async () => {

  };


  // 多选变化
  const onSelectChange = (keys: (string | number)[]) => {
    selectedRowKeys.value = keys;
  };

  // 分页变化处理
  const handleTableChange = (pag: { current: number, pageSize: number }) => {
    pagination.current = pag.current;
    pagination.pageSize = pag.pageSize;
    // todo 查询列表
  };

  // 表格数据
  const data = ref<treeTable[]>([]);
  // 表单数据
  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '树种名称', dataIndex: 'treeName', key: 'treeName' },
    { title: '学名', dataIndex: 'scientificName', key: 'scientificName' },
    { title: '所属科', dataIndex: 'affiliation', key: 'affiliation' },
    { title: "保护级别", dataIndex: 'protect', key: 'protect' },
    { title: "高度(m)", dataIndex: 'height', key: 'height' },
    { title: "直径(cm)", dataIndex: 'width', key: 'width' },
    { title: "寿命(年)", dataIndex: 'life', key: 'life' },
    { title: "生长环境", dataIndex: 'environment', key: 'environment' },
    { title: "用途", dataIndex: 'use', key: 'use' },
    { title: '操作', key: 'action' }
  ];
  return {
    tree,
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
    executeDelete
  }
})
