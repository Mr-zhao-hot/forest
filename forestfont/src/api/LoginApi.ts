import httpInstance from '@/utils/http.ts'

// 登录接口
export function StudentLogin(data: any) {
  return httpInstance({
    url: '/user/systemlogin',
    method: 'POST',
    data: data,
  })
}

// 注册接口
export function StudentRegister(data: any) {
  return httpInstance({
    url: '/register',
    method: 'POST',
    data: data,
  })
}
