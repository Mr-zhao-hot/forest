import httpInstance from '@/utils/http.ts'

// 单个查询
export function FireSelect(id: number) {
  return httpInstance({
    url: `/fire/select/${id}`,
    method: 'get',
  })
}

// 分页查询
export function FirePageSelect(data: any) {
  return httpInstance({
    url: '/fire/selectPage',
    method: 'post',
    data: data,
  })
}
// 删除
export function FireDelete(id: number) {
  return httpInstance({
    url: `/fire/delete/${id}`,
    method: 'POST',
  })
}
// 批量删
export function FireDeletes(ids: [number]) {
  return httpInstance({
    url: '/fire/deletes',
    method: 'POST',
    data: ids,
  })
}
// 上传图片
export function upload(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return httpInstance({
    url: '/fire/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
}
// 新增
export function FireAdd(data: any) {
  return httpInstance({
    url: '/fire/add',
    method: 'post',
    data: data,
  })
}
// 修改
export function FireUpdate(id: number, data: any) {
  return httpInstance({
    url: `/fire/update/${id}`,
    method: 'POST',
    data: data,
  })
}

// 数据大屏数据
export function getScreen(){
  return httpInstance({
    url:"/fire/dataSelect",
    method:"POST"
  })
}
