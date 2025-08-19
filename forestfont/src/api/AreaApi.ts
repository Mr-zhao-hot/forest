import httpInstance from '@/utils/http.ts'

// 单个查询
export function selectById(id: number) {
  return httpInstance({
    url:`/Area/select/${id}`,
    method:"GET",
  })
}

// 分页查询
export function selectPage(data:any){
  return httpInstance({
    url:"/Area/select/page",
    method:"POST",
    data:data
  })
}

// 新增接口
export function add(data:any){
  return httpInstance({
    url:"/Area/add",
    method:"POST",
    data:data
  })
}

// 单个删除
export function deleteById(id:number) {
  return httpInstance({
    url:`/Area/delete/${id}`,
    method:"POST",
  })
}

// 批量删除
export function deletes(ids:number[]) {
  return httpInstance({
    url:"/Area/deletes",
    method:"POST",
    data:ids
  })
}

// 修改接口
export function update(id:number, data:any) {
  return httpInstance({
    url:`/Area/update/${id}`,
    method:"POST",
    data:data
  })
}

