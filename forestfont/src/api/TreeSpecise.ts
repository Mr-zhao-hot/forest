import httpInstance from "@/utils/http.ts";
import type {UnwrapRef} from "vue";
// 查询单个树种
export function forestManagerSelectById(id:number){
  return httpInstance({
    url:`/forestManager/selectById/${id}`,
    method:"GET"
  })
}

// 查询全部树种
export function forestManagerSelect(){
  return httpInstance({
    url:"/forestManager/selects",
    method:"GET"
  })
}

// 新增树种
export function treeAdd(data:any){
  return httpInstance({
    url:"/forestManager/addTree",
    method:'POST',
    data:data
  })
}

// 修改树种
export function treeUpdate(id:number,data:any){
  return httpInstance({
    url:`/forestManager/updateTree/${id}`,
    method:"POST",
    data:data
  })
}

// 删除树种
export function forestManagerDeleteTree(id:number){
  return httpInstance({
    url:`/forestManager/deleteTree/${id}`,
    method:"POST",
  })
}

// 批量删除树种
export function forestManagerdeletesTree (id:[number]){
  return httpInstance({
    url:"/forestManager/deletesTree",
    method:"POST",
    data:id
  })
}

// 分页查询树种
export function forestManagerpageSelectTree(data:any){
  return httpInstance({
    url:"/forestManager/pageSelectTree",
    method:"POST",
    data:data
  })
}
