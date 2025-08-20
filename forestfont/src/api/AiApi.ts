import CommonInstance from '@/utils/CommonInstance.ts'

export function Ai(content: any) {
  return CommonInstance({
    url: '/api/chat',
    method: 'POST',
    data: content,
  })
}

