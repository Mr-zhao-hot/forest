import CommonInstance from '@/utils/CommonInstance.ts'

export function Ai(content: any) {
  return CommonInstance({
    url: '/api/chat',
    method: 'POST',
    data: content,
  })
}

export function AiFire(content: any) {
  return CommonInstance({
    url:"/api/chatFire",
    method:"POST",
    data: content,
  })
}

// 操作小车
export function AiControllerCar(content: any) {
  return CommonInstance({
    url:"/ControllerCar",
    method:"POST",
    data: content,
  })
}
