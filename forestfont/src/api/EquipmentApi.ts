import httpInstance from '@/utils/http.ts'

// 查询单个设备列表
export function equipmentSelectById(id:number){
  return httpInstance({
    url:`/equipment/select/${id}`,
    method:"GET"
  })
}

// 新增设备接口
export function equipmentAdd(data:any){
  return httpInstance({
    url:"/equipment/add",
    method:"POST",
    data:data
  })
}

// 删除设备接口
export function equipmentDelete(id:number){
  return httpInstance({
    url:`/equipment/delete/${id}`,
    method:"post",
  })
}

// 批量删除设备接口
export function equipmentDeletes(ids:[number]){
  return httpInstance({
    url:"/equipment/deletes",
    method:"post",
    data:ids
  })
}

// 分页查询接口
export function selectPageList(data:any){
  return httpInstance({
    url:"/equipment/selectPageList",
    method:"POST",
    data:data
  })
}

// 修改接口
export function equipmentUpdate(id:number,data:any){
  return httpInstance({
    url:`/equipment/update/${id}`,
    method:"POST",
    data:data
  })
}
