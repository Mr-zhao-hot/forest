// 查询全部角色接口
import httpInstance from "@/utils/http.ts";


// 查全部角色接口
export function RoleSelectAll() {
    return httpInstance({
        url:"/role/selects",
        method:"GET",
    })
}
