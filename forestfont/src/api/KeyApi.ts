import httpInstance from '@/utils/http.ts'

// 查询单个秘钥
export function keySelectById(id: number) {
  return httpInstance({
    url:`/key/select/${id}`,
    method:"get",
  })
}

// 新增秘钥
export function KeyAdd(data: any) {
  return httpInstance({
    url:"/key/add",
    method:"post",
    data:data
  })
}

// 删除秘钥
export function KeyDelete(id: number) {
  return httpInstance({
    url:`/key/delete/${id}`,
    method:"POST"
  })
}

// 批量删除秘钥
export function KeyDeletes(ids:[number]) {
  return httpInstance({
    url:"/key/deletes",
    method:"post",
    data:ids
  })
}

// 修改接口
export function KeyUpdate(id:number,data:any){
  return httpInstance({
    url:`/key/update/${id}`,
    method:"post",
    data:data
  })
}

// 分页查询接口
export function KeySelectPage(data:any) {
  return httpInstance({
    url:"/key/selectPage",
    method:"post",
    data:data
  })
}
