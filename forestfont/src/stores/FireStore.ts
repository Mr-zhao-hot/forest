import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  FireSelect,
  FirePageSelect,
  FireDelete,
  FireDeletes,
  upload,
  FireAdd,
  FireUpdate
} from "@/api/FireApi.ts"
import type { UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue'
import { alarmLevelDict, fireTypeDict, statusDict } from '@/utils/dict.ts'


/**
 * 火灾报警系统状态管理
 * 包含火灾数据的分页查询、增删改查、图片上传等功能
 */
export const useFireStore = defineStore('useFireStore', () => {
  // ==================== 接口定义 ====================

  /**
   * 分页查询参数接口
   */
  interface firePageInterface {
    longitude: number | undefined      // 经度
    latitude: number | undefined       // 纬度
    azimuth: number | undefined        // 方位角(0-360度)
    alarmType: number | undefined      // 火灾类型
    temperature: number | undefined    // 环境温度(℃)
    smokeDensity: number | undefined   // 烟雾浓度(%)
    status: number | undefined         // 状态
    createName: string                 // 创建者/上报人
  }

  /**
   * 火灾报警数据表单接口
   */
  interface fireTableInterface {
    id?: number | undefined            // 记录ID
    deviceId: string                   // 设备号
    longitude: number | undefined      // 经度
    latitude: number | undefined       // 纬度
    altitude: number | undefined       // 海拔高度(m)
    azimuth: number | undefined        // 方位角(0-360度)
    alarmLevel: number | undefined     // 报警等级(1-5,1最低)
    alarmType: number | undefined      // 火灾类型
    temperature: number | undefined    // 环境温度(℃)
    smokeDensity: number | undefined   // 烟雾浓度(%)
    imageUrl: string                   // 图片URL
    status: number | undefined         // 状态
    createName: string                 // 创建者/上报人
    createTime: string                 // 创建时间
    updateTime: string                 // 更新时间
  }

  /**
   * 表单弹窗状态接口
   */
  interface fireInterface {
    open: boolean                      // 是否打开弹窗
    title: string                      // 弹窗标题(新增/修改)
    fireTable: fireTableInterface      // 表单数据
  }

  // ==================== 状态定义 ====================

  // 分页配置
  const pagination = reactive({
    current: 1,                        // 当前页码
    pageSize: 20,                      // 每页条数
    total: 0,                          // 总条数
    showSizeChanger: true,             // 显示每页条数切换器
    showQuickJumper: true,             // 显示快速跳转
    showTotal: (total: number) => `共 ${total} 条数据`, // 显示总数
    pageSizeOptions: ['10', '20', '30', '100'], // 可选每页条数
  })

  // 分页查询参数
  const firePageTable = reactive<firePageInterface>({
    longitude: undefined,
    latitude: undefined,
    azimuth: undefined,
    alarmType: undefined,
    temperature: undefined,
    smokeDensity: undefined,
    status: undefined,
    createName: '',
  })

  // 表单弹窗状态
  const fireTable = reactive<fireInterface>({
    open: false,
    title: '',
    fireTable: {
      id: undefined,
      deviceId: "",
      longitude: undefined,
      latitude: undefined,
      azimuth: undefined,
      alarmType: undefined,
      alarmLevel: undefined,
      altitude: undefined,
      imageUrl: '',
      temperature: undefined,
      smokeDensity: undefined,
      status: undefined,
      createName: '',
      createTime: '',
      updateTime: ''
    }
  })



  // 表格数据
  const data = ref<any[]>([])

  // 删除确认框状态
  const tipVisible = ref(false)
  const deleteMode = ref<'single' | 'batch'>('single') // 删除模式(单个/批量)
  const currentDeleteId = ref<number | null>()        // 当前要删除的ID

  // 表格选择状态
  const selectedRowKeys = ref<(string | number)[]>([])

  // 图片预览状态
  const previewVisible = ref(false)
  const previewImage = ref('')
  const previewTitle = ref('')

  // 上传文件列表
  const fileList = ref<UploadProps['fileList']>([])

  // ==================== 工具函数 ====================

  /**
   * 处理图片URL
   * @param url 图片路径
   * @returns 完整的图片URL
   */
  const processImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.DEV
      ? 'http://127.0.0.1:8080'
      : import.meta.env.VITE_API_BASE_URL;
    return `${baseUrl}/${url.replace(/^static\//, '')}`;
  };

  /**
   * 获取文件Base64编码
   * @param file 文件对象
   * @returns Promise<string>
   */
  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  // ==================== 主要方法 ====================

  /**
   * 获取火灾报警数据列表
   */
  const FireSelectList = async () => {
    try {
      // 1. 构造请求参数
      const params = {
        pageSize: pagination.pageSize,
        pageNumber: pagination.current,
        ...firePageTable,
      };

      // 2. 发起请求
      const response = await FirePageSelect(params);

      // 3. 处理响应数据
      if (!response.data) {
        throw new Error('响应数据为空');
      }

      // 4. 处理列表数据
      data.value = Array.isArray(response.data.data?.list)
        ? response.data.data.list.map((item: any, index: number) => ({
          ...item,
          key: item.id || item.classId || index, // 更健壮的key生成逻辑
          imageUrl: item.imageUrl ? processImageUrl(item.imageUrl) : null,
        }))
        : [];

      // 5. 更新分页信息
      pagination.total = response.data.data?.total || 0;

      return data.value;

    } catch (error) {
      console.error('获取数据失败:', error);
      message.error('获取数据失败，请稍后重试');
      data.value = [];
      pagination.total = 0;
      throw error;
    }
  };

  /**
   * 打开新增表单弹窗
   */
  const treeAddButton = () => {
    fireTable.open = true
    fireTable.title = '新增班级'
    Object.assign(fireTable.fireTable, {
      id: undefined,
      deviceId: "",
      longitude: undefined,
      latitude: undefined,
      azimuth: undefined,
      alarmType: undefined,
      alarmLevel: undefined,
      altitude: undefined,
      imageUrl: '',
      temperature: undefined,
      smokeDensity: undefined,
      status: undefined,
      createName: '',
      createTime: '',
      updateTime: ''
    })
    fileList.value = []
  }

  /**
   * 清空查询条件并刷新列表
   */
  const cleanTable = () => {
    Object.assign(firePageTable, {
      longitude: undefined,
      latitude: undefined,
      azimuth: undefined,
      alarmType: undefined,
      temperature: undefined,
      smokeDensity: undefined,
      status: undefined,
      createName: '',
    })
    FireSelectList()
  }

  /**
   * 触发单个删除
   * @param record 要删除的记录
   */
  const triggerDelete = (record: any) => {
    deleteMode.value = 'single'
    currentDeleteId.value = record.id
    tipVisible.value = true
  }

  /**
   * 执行删除操作(单个/批量)
   */
  const executeDelete = async () => {
    try {
      if (deleteMode.value === 'single') {
        await FireDelete(currentDeleteId.value!)
        message.success('删除成功')
      } else {
        await FireDeletes(selectedRowKeys.value)
        message.success(`已删除 ${selectedRowKeys.value.length} 项`)
      }
      await FireSelectList()
      selectedRowKeys.value = []
    } catch (error) {
      message.error('删除失败')
    } finally {
      tipVisible.value = false
    }
  }

  /**
   * 触发批量删除
   */
  const triggerBatchDelete = () => {
    if (selectedRowKeys.value.length === 0) {
      message.warning('请至少选择一项')
      return
    }
    deleteMode.value = 'batch'
    tipVisible.value = true
  }

  /**
   * 表格选择项变化回调
   * @param keys 选中的key数组
   */
  const onSelectChange = (keys: (string | number)[]) => {
    selectedRowKeys.value = keys
  }

  /**
   * 表格分页变化回调
   * @param pag 分页参数 {current, pageSize}
   */
  const handleTableChange = (pag: { current: number; pageSize: number }) => {
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
    FireSelectList()
  }

  /**
   * 根据ID获取详情
   * @param id 记录ID
   */
  const forestManagerSelectByIds = async (id: number) => {
    try {
      const res = await FireSelect(id);

      if (!res.data?.data) {
        throw new Error('未获取到有效数据');
      }

      const responseData = res.data.data;
      const fullImgUrl = processImageUrl(responseData.imageUrl);

      // 更新表单数据
      fireTable.fireTable = {
        id: responseData.id,
        deviceId: responseData.deviceId || '',
        longitude: responseData.longitude,
        latitude: responseData.latitude,
        azimuth: responseData.azimuth,
        alarmType: responseData.alarmType,
        alarmLevel: responseData.alarmLevel,
        altitude: responseData.altitude,
        imageUrl: fullImgUrl,
        temperature: responseData.temperature,
        smokeDensity: responseData.smokeDensity,
        status: responseData.status,
        createName: responseData.createName || '',
        createTime: responseData.createTime,
        updateTime: responseData.updateTime
      };

      // 更新文件列表
      fileList.value = responseData.imageUrl
        ? [{
          uid: `existing-${responseData.id}`,
          name: '已上传图片.png',
          status: 'done',
          url: fullImgUrl
        }]
        : [];

    } catch (error) {
      console.error('获取详情失败:', error);
      message.error('获取详情失败，请稍后重试');
      fileList.value = [];
      throw error;
    }
  };

  /**
   * 打开编辑表单弹窗
   * @param record 要编辑的记录
   */
  const editItem = async (record: any) => {
    fireTable.title = '修改班级'
    if (record.id != null) {
      await forestManagerSelectByIds(record.id)
    }
    fireTable.open = true
  }

  /**
   * 关闭表单弹窗
   */
  const CancelButton = () => {
    fireTable.open = false
    fileList.value = []
  }

  /**
   * 图片预览处理
   * @param file 文件对象
   */
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
  }

  /**
   * 文件列表变化回调
   */
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    fileList.value = newFileList
  }

  /**
   * 上传前校验
   * @param file 文件对象
   * @returns 是否允许上传
   */
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('只能上传图片文件!')
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('图片大小不能超过5MB!')
    }
    return isImage && isLt5M
  }

  /**
   * 处理上传和表单提交
   */
  const handleUpload = async () => {
    try {
      // 上传图片
      if (fileList.value.length > 0 && fileList.value[0].originFileObj) {
        const uploadResponse = await upload(fileList.value[0].originFileObj)
        if (uploadResponse.data) {
          fireTable.fireTable.imageUrl = uploadResponse.data.data
          message.success('图片上传成功')
        }
      }

      // 提交表单
      if (fireTable.title === '新增班级') {
        await FireAdd(fireTable.fireTable)
        message.success('新增成功')
      } else {
        if (!fireTable.fireTable.id) {
          message.error('缺少ID，无法修改')
          return
        }
        await FireUpdate(fireTable.fireTable.id, fireTable.fireTable)
        message.success('修改成功')
      }

      fireTable.open = false
      await FireSelectList()
      fileList.value = []
    } catch (error) {
      message.error('操作失败')
      console.error('提交错误:', error)
    }
  }

  /**
   * 表单提交完成回调
   */
  const onFinish = async () => {
    await handleUpload()
  }

  // 火灾类型字典
  const fireTypeOptions = ref([...fireTypeDict]);
  const alarmTypeOptions = ref([...alarmLevelDict]);
  const statusTypeOptions = ref([...statusDict]);
// 获取火灾类型标签
  const getFireTypeLabel = (value: number) => {
    const found = fireTypeOptions.value.find(item => item.value === value);
    return found ? found.label : '未知类型';
  }
  const getSmokeDensityLabel = (value: number) => {
    const found = alarmTypeOptions.value.find(item => item.value === value);
    return found ? found.label : '未知类型';
  }
  const getStatusLabel = (value: number) => {
    const found = statusTypeOptions.value.find(item => item.value === value);
    return found ? found.label : '未知类型';
  }


  // ==================== 表格列定义 ====================
  const columns = [
    { title: '设备号', dataIndex: 'deviceId', key: 'deviceId' },
    { title: '经度', dataIndex: 'longitude', key: 'longitude' },
    { title: '纬度', dataIndex: 'latitude', key: 'latitude' },
    { title: '方位角(0-360度)', dataIndex: 'azimuth', key: 'azimuth' },
    { title: '火灾类型', dataIndex: 'alarmType', key: 'alarmType' },
    { title: '报警等级(1-5,1最低)', dataIndex: 'alarmLevel', key: 'alarmLevel' },
    { title: '海拔高度(m)', dataIndex: 'altitude', key: 'altitude' },
    { title: '图片', dataIndex: 'imageUrl', key: 'imageUrl' },
    { title: '环境温度℃', dataIndex: 'temperature', key: 'temperature' },
    { title: '烟雾浓度%', dataIndex: 'smokeDensity', key: 'smokeDensity' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '备注', dataIndex: 'createName', key: 'createName' },
    { title: '操作', key: 'action' },
  ]

  // ==================== 暴露状态和方法 ====================
  return {
    // 状态
    pagination,
    firePageTable,
    fireTable,
    data,
    tipVisible,
    deleteMode,
    currentDeleteId,
    selectedRowKeys,
    previewVisible,
    previewImage,
    previewTitle,
    fileList,
    columns,

    // 方法
    FireSelectList,
    treeAddButton,
    cleanTable,
    triggerDelete,
    executeDelete,
    triggerBatchDelete,
    onSelectChange,
    handleTableChange,
    editItem,
    CancelButton,
    handlePreview,
    handleChange,
    beforeUpload,
    onFinish,
    fireTypeOptions,
    getFireTypeLabel,
    alarmTypeOptions,
    statusTypeOptions,
    getSmokeDensityLabel,
    getStatusLabel
  }
})
