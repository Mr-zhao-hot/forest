import AiInstance from '@/utils/AiHttp.ts'

export function Ai(content:any){
    return AiInstance({
      url:"/api/chat",
      method:"POST",
      data:content
    })
}
